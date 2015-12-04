#!/bin/bash

ffmpeg -f image2 -r 1/5 -i image%02d.png -vcodec mpeg4 -y movie.mp4

