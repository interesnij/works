from music.views import MusicIndexView
from django.urls import re_path


urlpatterns=[
	re_path(r'^$', MusicIndexView.as_view(), name="music"),
]
