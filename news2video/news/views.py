# -*- coding: utf-8 -*-

# Create your views here.
import json
import hashlib
from datetime import datetime
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import HttpResponse
from django.http import HttpResponseNotFound
from mezzanine.conf import settings

from .converter import Converter
from .forms import NewsForm


def index(request):
    return render(request, 'news/index.html',)


def convert(request):
    form = NewsForm(request.POST or None)
    output_name = datetime.now().strftime('%Y%m%d%H%M%S') + '.mp4'
    if form.is_valid():
        # Convert to video
        fn_output = settings.MEDIA_ROOT + '/' + output_name
        if form['length'].data == 'digest':
            Converter().convert_digest(form['url'].data, fn_output)
        else:
            v = form['voice'].data or 'Ting-Ting'
            r = form['rate'].data or '220'
            Converter().convert(form['url'].data, fn_output, voice=v, rate=r)
    else:
        pass

    if request.is_ajax:
        return HttpResponse(json.dumps({'video_url': settings.MEDIA_URL + output_name}),
                            status=200, content_type='application/json')
