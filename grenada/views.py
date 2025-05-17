from django.shortcuts import render
from django.views.generic.base import TemplateView


class GrenadaView(TemplateView):
    template_name="grenada_home.html"

class GrenadaAboutView(TemplateView):
    template_name="grenada_about.html"

class GrenadaDetail1View(TemplateView):
    template_name="grenada_detail1.html"

class GrenadaContactView(TemplateView):
    template_name="grenada_contact.html"

class GrenadaDetail2View(TemplateView):
    template_name="grenada_detail2.html"

class GrenadaDetail3View(TemplateView):
    template_name="grenada_detail3.html"

class GrenadaDetail4View(TemplateView):
    template_name="grenada_detail4.html"

class GrenadaDetail5View(TemplateView):
    template_name="grenada_detail5.html"

class GrenadaDetail6View(TemplateView):
    template_name="grenada_detail6.html"

class GrenadaDetail7View(TemplateView):
    template_name="grenada_detail7.html"
