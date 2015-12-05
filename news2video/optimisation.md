
## Benchmark

```
%time python converter.py 'http://project.initiumlab.com/news2video/case1/index.html' output.mp4
```

## Start 

```
python converter.py  output.mp4  4.41s user 1.02s system 57% cpu 9.460 total
```

## Use multiprocessing

test using 4 processes

```
python converter.py  output.mp4  4.73s user 1.09s system 120% cpu 4.823 total
```

