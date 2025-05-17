from django.shortcuts import render
from django.views.generic.base import TemplateView


class DigitalView(TemplateView):
    template_name="digital.html"
