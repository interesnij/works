from django.views.generic.base import ContextMixin
from django.conf import settings
from django.http import JsonResponse



class CategoryListMixin(ContextMixin):

	def get(self,request,*args,**kwargs):


		return super(CategoryListMixin,self).get(request,*args,**kwargs)





	def get_context_data(self,**kwargs):
		context=super(CategoryListMixin,self).get_context_data(**kwargs)
		context["current_url"]=self.request.path
		return context

class PageNumberMixin(CategoryListMixin):
	def get_context_data(self,**kwargs):
		context=super(PageNumberMixin,self).get_context_data(**kwargs)
		try:
			context["pn"]=self.request.GET["page"]
		except KeyError:
			context["pn"]="1"
		return context

class AjaxableResponseMixin(object):
    """
    Mixin to add AJAX support to a form.
    Must be used with an object-based FormView (e.g. CreateView)
    """
    def form_invalid(self, form):
        response = super(AjaxableResponseMixin, self).form_invalid(form)
        if self.request.is_ajax():
            return JsonResponse(form.errors, status=400)
        else:
            return response

    def form_valid(self, form):
        # We make sure to call the parent's form_valid() method because
        # it might do some processing (in the case of CreateView, it will
        # call form.save() for example).
        response = super(AjaxableResponseMixin, self).form_valid(form)
        if self.request.is_ajax():
            data = {
                'pk': self.object.pk,
            }
            return JsonResponse(data)
        else:
            return response
