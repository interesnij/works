from django.shortcuts import render
from django.views.generic.base import TemplateView


class PanoramaView(TemplateView):
    template_name="panorama.html"
