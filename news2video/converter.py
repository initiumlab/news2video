import requests
from readability.readability import Document
import pandas as pd
import bs4
from bs4 import Tag, BeautifulSoup
import hashlib
import os
from os import path
import sh
import multiprocessing
import docopt


class Extractor(object):
    """
    Extract text/ images sequences from a web page's main body
    """
    def __init__(self, base_url):
        self.cur_text = ''
        self.result = []
        self.base_url = base_url

    def get_abs_url(self, url):
        if url.startswith('http://') or url.startswith('https://'):
            return url
        else:
            return '%s/%s' % (self.base_url, url)

    def recursive_extract_text_image(self, obj):
        # reference:
        # http://stackoverflow.com/questions/20590624/python-beautifulsoup-div-text-and-img-attributes-in-correct-order
        for child in obj.children:
            if isinstance(child, Tag):
                #result.append(child.get('alt', ''))
                self.recursive_extract_text_image(child)
                if child.name == 'img':
                    self.result.append(('text', self.cur_text))
                    self.cur_text = ''
                    self.result.append(('image',
                                        self.get_abs_url(child['src'])
                    ))
            else:
                if len(child.strip()) > 0:
                    self.cur_text += ' ' + child.strip() + ' '

    def html_to_asset_list(self, html):
        """
        :param html: The html content in str
        :return: The extracted list of text/ image sequence
        """
        bs_obj = BeautifulSoup(html, 'html.parser')
        self.result = []
        self.cur_text = ''
        self.recursive_extract_text_image(bs_obj)
        self.result.append(('text', self.cur_text))
        return self.result


global_pool = None

class Converter(object):
    def __init__(self, num_pools=4):
        global global_pool
        global_pool = multiprocessing.Pool(num_pools)

    def execute(self, command):
        return os.system(command)

    def execute_all(self, commands):
        global global_pool
        return global_pool.map(self.execute, commands)

    def string2hash(self, s):
        m = hashlib.sha256()
        m.update(s.encode('utf-8'))
        return m.hexdigest()[:16]

    def get_audio_length(self, local_src):
        filename = local_src + '.wav'
        # Caveats: can only deal with < 60s audios
        # | grep Duration | cut -f1 -d, | cut -f4 -d:
        seconds = sh.soxi('-D', filename)
        return seconds.strip()

    def get_screen_play(self, url):
        """Download webpage and analyze basic sequence

        :param url:
        :return:
        """
        res = requests.get(url)
        html = res.content.decode('utf-8')
        # Analyze basic sequence
        readable_article = Document(html).summary()
        self.readable_article = readable_article
        readable_title = Document(html).title()
        self.readable_title = readable_title

        base_url = path.dirname(res.request.url)

        result = Extractor(base_url).html_to_asset_list(readable_article)
        #print(result)
        df_screenplay = pd.DataFrame(result, columns=['type', 'content'])
        df_screenplay['local_src'] = df_screenplay['content'].apply(lambda x: self.string2hash(x))
        image_selector = (df_screenplay['type'] == 'image')
        df_screenplay.loc[image_selector, 'filename'] = df_screenplay.loc[
            image_selector, 'content'].apply(lambda x: path.basename(x))
        df_screenplay.loc[image_selector, 'extname'] = df_screenplay.loc[
            image_selector, 'filename'].apply(lambda x: path.splitext(x)[1])
        df_screenplay = df_screenplay.fillna('')
        df_screenplay['download_name'] = df_screenplay['local_src'] + df_screenplay['extname']
        df_screenplay['converted_name'] = df_screenplay['local_src'] + '.png'

        self.df_screenplay = df_screenplay
        return df_screenplay

    def get_png_images(self, screen_size):
        """Download images and convert to .png
        :return:
        """
        commands = []
        for (i, r) in self.df_screenplay.iterrows():
            if r['type'] == 'image':
                commands.append('wget {content} -O {download_name}'.format(**r))
        self.execute_all(commands)
        commands = []
        for (i, r) in self.df_screenplay.iterrows():
            if r['type'] == 'image':
                commands.append('convert {download_name} -geometry {screen_size} {converted_name}'.format(screen_size=screen_size, **r))
        self.execute_all(commands)

    def text_to_speech(self, rate, voice):
        """ Generate audio via say (m4a) and convert to (wav)

        :return:
        """
        commands = []
        for (i, r) in self.df_screenplay.iterrows():
            if r['type'] == 'text':
                #commands.append('say --output-file={local_src}.m4a --voice=daniel --rate=220 --progress --file-format=m4af "{content}"'.format(**r))
                #commands.append('say --output-file={local_src}.m4a -v Ting-Ting --rate=300 --progress --file-format=m4af "{content}"'.format(**r))
                commands.append('say --output-file={local_src}.m4a -v {voice} --rate={rate} --progress --file-format=m4af "{content}"'.format(rate=rate, voice=voice, **r))
        self.execute_all(commands)
        # Convert to .wav
        commands = []
        for (i, r) in self.df_screenplay.iterrows():
            if r['type'] == 'text':
                commands.append('avconv -i {local_src}.m4a -y {local_src}.wav'.format(**r))
        self.execute_all(commands)
        # Analyze audio duration
        text_selector = (self.df_screenplay['type'] == 'text')
        self.df_screenplay.loc[text_selector, 'duration'] = self.df_screenplay.loc[text_selector, 'local_src'].apply(self.get_audio_length)

    def organise_scenes(self):
        """ Organise scenes
        From:

        :return:
        """
        scenes = []
        df_sp_orged = self.df_screenplay.reset_index()
        # Group the sequence
        df_sp_orged['group'] = df_sp_orged['index'].apply(lambda x: int((x + 1) / 2))
        for (gname, group) in df_sp_orged.groupby('group'):
            if len(group[group['type'] == 'image']) == 0:
                fn_image = 'default-image.png'
            else:
                fn_image = group[group['type'] == 'image']['converted_name'].values[0]

            if len(group[group['type'] == 'text']) == 0:
                duration = 1.53
                fn_audio = 'default-audio.mp4'
            else:
                duration = group[group['type'] == 'text']['duration'].values[0]
                fn_audio = group[group['type'] == 'text']['local_src'].values[0] + '.m4a'
            scenes.append(('%04d' % gname, fn_image, duration, fn_audio))
        df_scenes = pd.DataFrame(scenes, columns=['group', 'fn_image', 'duration', 'fn_audio'])

        df_scenes['fn_video_only'] = 'group' + df_scenes['group'] + '.mp4'
        df_scenes['fn_video'] = 'group' + df_scenes['group'] + '-a.mp4'
        # Following was used to solve non integer fps problem the conflicts with stanrdard
        # Now we already use output parameter to work around.
        #df_scenes['duration'] = df_scenes['duration'].apply(lambda x: int(np.ceil(float(x))))
        df_scenes['fn_image_resized'] = 'resized-' + df_scenes['fn_image']
        df_scenes['fn_audio_only'] = 'group' + df_scenes['group'] + '-audio.m4a'
        # To avoid too short clips
        df_scenes = df_scenes[df_scenes['duration'].apply(lambda x: float(x) > 0.1)]

        self.df_sp_orged = df_sp_orged
        self.df_scenes = df_scenes

    def prepare_default_assets(self):
        os.system('cp -f default/* .')

    def images_to_videos(self):
        commands = []
        for (i, r) in self.df_scenes.iterrows():
            commands.append('convert {fn_image} {fn_image_resized}'.format(**r))
        self.execute_all(commands)
        commands = []
        for (i, r) in self.df_scenes.iterrows():
            commands.append('ffmpeg -f image2 -r 1/{duration} -i {fn_image_resized} -qscale:v 1 -copyts -vcodec mpeg4 -y -r 25 {fn_video_only}'.format(**r))
        self.execute_all(commands)

    def videos_add_audio(self):
        commands = []
        for (i, r) in self.df_scenes.iterrows():
            commands.append('cp {fn_audio} {fn_audio_only}'.format(**r))
        self.execute_all(commands)
        commands = []
        for (i, r) in self.df_scenes.iterrows():
            commands.append('ffmpeg -i {fn_video_only} -i {fn_audio} -qscale:v 1 -copyts -vcodec copy -acodec copy -y {fn_video}'.format(**r))
            #commands.append('ffmpeg -i {fn_video_only} -i {fn_audio} -map 0:0 -map 1 -vcodec copy -acodec copy -y {fn_video}'.format(**r))
        self.execute_all(commands)

    def assemble_output(self, fn_output):
        open('playlist.txt', 'w').write('\n'.join(list(self.df_scenes['fn_video'].apply(lambda x: "file '%s'" % x))))
        os.system('ffmpeg -f concat -i playlist.txt -c:v libx264 -c:a copy -y %s' % fn_output)
        # ffmpeg -i output.mp4 -map 0 -c:v libx264 -c:a copy output-h264.mp4

    def convert(self, url, fn_output, rate=220, voice='Ting-Ting', screen_size='600x400!'):
        self.get_screen_play(url)
        self.get_png_images(screen_size)
        self.text_to_speech(rate, voice)
        self.organise_scenes()
        self.prepare_default_assets()
        self.images_to_videos()
        self.videos_add_audio()
        self.assemble_output(fn_output)

    def convert_digest(self, url, fn_output):
        # url = 'https://theinitium.com/article/20151127-mainland-government-officials-suicide-map/'

        #c.convert(url, 'out.mp4')
        self.get_screen_play(url)

        os.system(
            'say --output-file=title.m4a -v Ting-Ting --rate=220 --progress --file-format=m4af "%s"' % self.readable_title
        )
        os.system(
            'avconv -i title.m4a -y title.wav'
        )
        length = self.get_audio_length('title')

        length = self.get_audio_length('title')

        screen_size='600x400!'
        self.get_png_images(screen_size)

        df_images = self.df_screenplay[self.df_screenplay['type'] == 'image']
        os.system('rm -f image*.png')
        order=1
        for (i, r) in df_images.iterrows():
            os.system('cp %s image%02d.png' % (r['converted_name'], order))
            order += 1

        per_image_length = 1.0 * float(length) / len(df_images)
        os.system('ffmpeg -f image2 -r 1/{length} -i image%02d.png -copyts -vcodec mpeg4 -r 25 -y movie.mp4'.format(length=per_image_length))
        os.system('ffmpeg -i movie.mp4 -i title.m4a -copyts  -vcodec copy -acodec copy -y _output.mp4')

        open('subtitle.srt', 'w').write(
            '''[00:00.00] %s
            ''' % self.readable_title
        )
        os.system('ffmpeg -i subtitle.srt -y subtitle.ass')
        os.system('ffmpeg -i _output.mp4 -vf ass=subtitle.ass -copyts -c:v libx264 -c:a copy -y %s' % fn_output)

def main():
    import sys
    url = sys.argv[1]
    fn_output = sys.argv[2]
    if len(sys.argv) > 3:
        rate = sys.argv[3]
    else:
        rate = 220
    if len(sys.argv) > 4:
        voice = sys.argv[4]
    else:
        voice = 'Ting-Ting'
    if len(sys.argv) > 5:
        screen_size = sys.argv[5]
    else:
        screen_size='600x400!'
    #Converter().convert(url, fn_output, rate, voice, screen_size)
    Converter().convert_digest(url, fn_output)


if __name__ == '__main__':
    main()
