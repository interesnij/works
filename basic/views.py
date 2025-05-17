from django.shortcuts import render
from django.views.generic.base import TemplateView


class BasicView(TemplateView):
    template_name="home/basic.html"

class BasicServView(TemplateView):
    template_name="serv/basic_services.html"

class BasicServ1View(TemplateView):
    template_name="serv/basic_service1.html"

class BasicServ2View(TemplateView):
    template_name="serv/basic_service2.html"

class BasicServ3View(TemplateView):
    template_name="serv/basic_service3.html"

class BasicServ4View(TemplateView):
    template_name="serv/basic_service4.html"

class BasicWorksView(TemplateView):
    template_name="work/basic_works.html"

class BasicWork1View(TemplateView):
    template_name="work/basic_work1.html"

class BasicNewsView(TemplateView):
    template_name="news/basic_news.html"

class BasicNew1View(TemplateView):
    template_name="news/basic_new1.html"

class BasicAboutView(TemplateView):
    template_name="news/basic_about.html"

class BasicConView(TemplateView):
    template_name="contact/basic_contacts.html"

class BasicCarView(TemplateView):
    template_name="car/basic_carrers.html"
