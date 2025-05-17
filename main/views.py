from django.shortcuts import render
from django.views.generic.base import TemplateView

class MainPageView(TemplateView):
	template_name="main/mainpage.html"

	def get(self,request,*args,**kwargs):

		return super(MainPageView,self).get(request,*args,**kwargs)

	def get_context_data(self,**kwargs):
		context=super(MainPageView,self).get_context_data(**kwargs)

		return context
	def post(self,request,*args,**kwargs):

		return super(MainPageView,self).get(request,*args,**kwargs)
