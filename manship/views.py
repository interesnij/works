from django.shortcuts import render
from django.views.generic.base import TemplateView


class ManshipView(TemplateView):
    template_name="manship.html"

class BrunchManshipView(TemplateView):
    template_name="manship_brunch.html"

class LunchManshipView(TemplateView):
    template_name="manship_lunch.html"

class DinnerManshipView(TemplateView):
    template_name="manship_dinner.html"

class DrinkManshipView(TemplateView):
    template_name="manship_drink.html"

class AboutManshipView(TemplateView):
    template_name="manship_about.html"

class StoryManshipView(TemplateView):
    template_name="manship_story.html"

class PeopleManshipView(TemplateView):
    template_name="manship_people.html"

class KitchenManshipView(TemplateView):
    template_name="manship_kitchen.html"

class BarManshipView(TemplateView):
    template_name="manship_bar.html"

class SourceManshipView(TemplateView):
    template_name="manship_source.html"

class NewsManshipView(TemplateView):
    template_name="manship_news.html"

class EventsManshipView(TemplateView):
    template_name="manship_events.html"

class GalleryManshipView(TemplateView):
    template_name="manship_gallery.html"

class AwwardsManshipView(TemplateView):
    template_name="manship_awwards.html"

class NewManshipView(TemplateView):
    template_name="manship_new.html"

class PrivateManshipView(TemplateView):
    template_name="manship_private.html"

class ContManshipView(TemplateView):
    template_name="manship_contacts.html"
