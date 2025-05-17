from django.shortcuts import render
from django.views.generic.base import TemplateView


class MusicIndexView(TemplateView):
    template_name="music.html"
