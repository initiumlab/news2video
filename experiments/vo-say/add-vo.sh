#!/bin/bash


say --input-file=vo.lrc --output-file=tts.m4a --voice=daniel --rate=150 --progress --file-format=m4af

ffmpeg -i output.mp4 -i tts.m4a -map 0:0 -map 1 -vcodec copy -acodec copy -y output-with-vo.mp4



