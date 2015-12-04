#!/bin/bash


say --input-file=vo.lrc --output-file=tts.mp4 --voice=daniel --rate=150 --progress --file-format=mp4f

ffmpeg -i output.mp4 -i tts.mp4 -map 0:0 -map 1 -vcodec copy -acodec copy -y output-with-vo.mp4



