from django.shortcuts import render
from django.views.generic.base import TemplateView


class ParallaxView(TemplateView):
    template_name="parallax.html"
