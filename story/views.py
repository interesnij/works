from django.shortcuts import render
from django.views.generic.base import TemplateView


class StoryView(TemplateView):
    template_name="story_index.html"

class StoryAboutView(TemplateView):
    template_name="story_about.html"

class StoryAddView(TemplateView):
    template_name="story_add.html"

class StoryDetailView(TemplateView):
    template_name="story_detail.html"
