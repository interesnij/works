from django.shortcuts import render
from django.views.generic.base import TemplateView


class VerityView(TemplateView):
    template_name="verity.html"
