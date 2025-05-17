from django.shortcuts import render
from django.views.generic.base import TemplateView


class JobView(TemplateView):
    template_name="job1.html"
