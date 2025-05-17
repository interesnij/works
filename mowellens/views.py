from django.shortcuts import render
from django.views.generic.base import TemplateView


class MowellensView(TemplateView):
    template_name="first/mowellens.html"

class ContactMowellensView(TemplateView):
    template_name="mowellens_contact.html"

class GoodsMowellensView(TemplateView):
    template_name="mowellens_goods2.html"

class DetailMowellensView(TemplateView):
    template_name="mowellens_detail.html"

class FactMowellensView(TemplateView):
    template_name="mowellens_facts.html"

class FirmMowellensView(TemplateView):
    template_name="mowellens_firm.html"

class BlogMowellensView(TemplateView):
    template_name="mowellens_blog.html"

class BlogDetailMowellensView(TemplateView):
    template_name="mowellens_blog_detail.html"

class TermsMowellensView(TemplateView):
    template_name="mowellens_terms.html"

class ShippingMowellensView(TemplateView):
    template_name="mowellens_shipping.html"

class PolicyMowellensView(TemplateView):
    template_name="mowellens_policy.html"

class CartMowellensView(TemplateView):
    template_name="mowellens_cart.html"

class ChecoutMowellensView(TemplateView):
    template_name="mowellens_checout.html"
