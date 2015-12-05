# -*- encoding: utf-8 -*-

from django.conf.urls import patterns, url

urlpatterns = patterns(
    'news.views',
    url(r'^$', 'index', name='news-index'),
    url(r'^convert/$', 'convert', name='news-convert'),)
