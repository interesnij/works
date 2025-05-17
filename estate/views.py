from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.views.generic.base import ContextMixin


class PathMixin(ContextMixin):

	def get_context_data(self,**kwargs):
		context=super(PathMixin,self).get_context_data(**kwargs)
		context["current_url"]=self.request.path
		return context

class EstetaView(TemplateView, PathMixin):
    template_name="esteta_home.html"

class EstetaProectView(TemplateView, PathMixin):
    template_name="esteta_proect.html"

class EstetaProectDetailView(TemplateView, PathMixin):
    template_name="esteta_proect_detail.html"

class EstetaBrandView(TemplateView, PathMixin):
    template_name="esteta_brand.html"

class EstetaProductView(TemplateView, PathMixin):
    template_name="esteta_product.html"

class EstetaProductDetailView(TemplateView, PathMixin):
    template_name="esteta_product_detail.html"

class EstetaDesignView(TemplateView, PathMixin):
    template_name="esteta_design.html"

class EstetaCollectView(TemplateView, PathMixin):
    template_name="esteta_collect.html"

class EstetaCollectDetailView(TemplateView, PathMixin):
    template_name="esteta_collect_detail.html"

class EstetaDesignDetailView(TemplateView, PathMixin):
    template_name="esteta_design_detail.html"

class EstetaPdfView(TemplateView, PathMixin):
    template_name="esteta_pdf.html"
