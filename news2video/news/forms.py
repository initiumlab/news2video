from django import forms


class NewsForm(forms.Form):
    url = forms.URLField(label='URL', max_length=256)
    # format = forms.CharField(label='Format', max_length=256)
    # quality = forms.CharField(label='Quality', max_length=256)
    # = forms.CharField(label='Gender', max_length=256)
    # speed = forms.CharField(label='Speed', max_length=256)
    length = forms.CharField(label='Length', max_length=256)
    voice = forms.CharField(label='Voice', max_length=256)
    rate = forms.IntegerField(label='Rate')
