# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sites', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='News',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, auto_created=True, verbose_name='ID')),
                ('keywords_string', models.CharField(blank=True, max_length=500, editable=False)),
                ('title', models.CharField(max_length=500, verbose_name='Title')),
                ('slug', models.CharField(blank=True, max_length=2000, help_text='Leave blank to have the URL auto-generated from the title.', null=True, verbose_name='URL')),
                ('_meta_title', models.CharField(blank=True, max_length=500, help_text='Optional title to be used in the HTML title tag. If left blank, the main title field will be used.', null=True, verbose_name='Title')),
                ('description', models.TextField(blank=True, verbose_name='Description')),
                ('gen_description', models.BooleanField(help_text='If checked, the description will be automatically generated from content. Uncheck if you want to manually set a custom description.', default=True, verbose_name='Generate description')),
                ('created', models.DateTimeField(null=True, editable=False)),
                ('updated', models.DateTimeField(null=True, editable=False)),
                ('status', models.IntegerField(help_text='With Draft chosen, will only be shown for admin users on the site.', default=2, choices=[(1, 'Draft'), (2, 'Published')], verbose_name='Status')),
                ('publish_date', models.DateTimeField(blank=True, db_index=True, help_text="With Published chosen, won't be shown until this time", null=True, verbose_name='Published from')),
                ('expiry_date', models.DateTimeField(blank=True, help_text="With Published chosen, won't be shown after this time", null=True, verbose_name='Expires on')),
                ('short_url', models.URLField(blank=True, null=True)),
                ('in_sitemap', models.BooleanField(default=True, verbose_name='Show in sitemap')),
                ('url', models.URLField(max_length=256, verbose_name='Url')),
                ('site', models.ForeignKey(to='sites.Site', editable=False)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='NewsItem',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, auto_created=True, verbose_name='ID')),
                ('keywords_string', models.CharField(blank=True, max_length=500, editable=False)),
                ('title', models.CharField(max_length=500, verbose_name='Title')),
                ('slug', models.CharField(blank=True, max_length=2000, help_text='Leave blank to have the URL auto-generated from the title.', null=True, verbose_name='URL')),
                ('_meta_title', models.CharField(blank=True, max_length=500, help_text='Optional title to be used in the HTML title tag. If left blank, the main title field will be used.', null=True, verbose_name='Title')),
                ('description', models.TextField(blank=True, verbose_name='Description')),
                ('gen_description', models.BooleanField(help_text='If checked, the description will be automatically generated from content. Uncheck if you want to manually set a custom description.', default=True, verbose_name='Generate description')),
                ('created', models.DateTimeField(null=True, editable=False)),
                ('updated', models.DateTimeField(null=True, editable=False)),
                ('status', models.IntegerField(help_text='With Draft chosen, will only be shown for admin users on the site.', default=2, choices=[(1, 'Draft'), (2, 'Published')], verbose_name='Status')),
                ('publish_date', models.DateTimeField(blank=True, db_index=True, help_text="With Published chosen, won't be shown until this time", null=True, verbose_name='Published from')),
                ('expiry_date', models.DateTimeField(blank=True, help_text="With Published chosen, won't be shown after this time", null=True, verbose_name='Expires on')),
                ('short_url', models.URLField(blank=True, null=True)),
                ('in_sitemap', models.BooleanField(default=True, verbose_name='Show in sitemap')),
                ('news', models.ForeignKey(to='news.News')),
                ('site', models.ForeignKey(to='sites.Site', editable=False)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
