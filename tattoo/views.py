from django.shortcuts import render
from django.views.generic.base import TemplateView


class TattooView(TemplateView):
    template_name="main.html"

class ConView(TemplateView):
    template_name="contacts.html"

class ExampleView(TemplateView):
    template_name="example.html"

class ExampleDetailView(TemplateView):
    template_name="example_detail.html"

class AbView(TemplateView):
    template_name="about.html"

class NewsView(TemplateView):
    template_name="news.html"

class NewsDetailView(TemplateView):
    template_name="news_detail.html"

class GoodsIndexView(TemplateView):
    template_name="goods_index.html"

class GoodsDetailView(TemplateView):
    template_name="goods_detail.html"
