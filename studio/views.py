from django.shortcuts import render
from django.views.generic.base import TemplateView


class StudioView(TemplateView):
    template_name="studio.html"

class Proect1View(TemplateView):
    template_name="proect1.html"

class Proect2View(TemplateView):
    template_name="proect2.html"

class BlogIndexView(TemplateView):
    template_name="studio_blog.html"

class BlogDetailView(TemplateView):
    template_name="studio_blog_detail.html"

class BlogDetail2View(TemplateView):
    template_name="studio_blog_detail2.html"
