from django.shortcuts import render
from django.views.generic.base import TemplateView


class LusionView(TemplateView):
    template_name="lusion.html"

class AboutLusionView(TemplateView):
    template_name="lusion_about.html"

class Work1LusionView(TemplateView):
    template_name="lusion_work1.html"
