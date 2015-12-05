from django.db import models
from mezzanine.core.models import Displayable


class News(Displayable):
    url = models.URLField(verbose_name="Url", max_length=256)


class NewsItem(Displayable):
    news = models.ForeignKey(News, null=False)
