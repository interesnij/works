from django.shortcuts import render
from django.views.generic.base import TemplateView


class AframeView(TemplateView):
    template_name="aframe.html"
