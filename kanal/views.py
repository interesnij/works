from django.shortcuts import render
from django.views.generic.base import TemplateView


class KanalView(TemplateView):
    template_name="kanal.html"
