#!/bin/bash

ffmpeg -f image2 -r 1/1 -i image01.png -vcodec mpeg4 -y movie1.mp4
ffmpeg -f image2 -r 1/5 -i image02.png -vcodec mpeg4 -y movie2.mp4
ffmpeg -f image2 -r 1/2 -i image03.png -vcodec mpeg4 -y movie3.mp4

