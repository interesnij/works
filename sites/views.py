from django.views.generic.dates import ArchiveIndexView
from .models import Sites
from .forms import SitesForm
from django.shortcuts import redirect
from django.shortcuts import render



class SitesView(ArchiveIndexView):
	model=Sites
	date_field="posted"
	template_name="index.html"
	allow_empty=True
	form=None
	def get(self,request,*args,**kwargs):
		self.form=SitesForm()
		return super(SitesView,self).get(request,*args,**kwargs)
	def get_context_data(self,**kwargs):
		context=super(SitesView,self).get_context_data(**kwargs)
		context["form"]=self.form
		return context
	def post(self,request,*args,**kwargs):
		self.form=SitesForm(request.POST)
		if self.form.is_valid():
			self.form.save()
			return redirect('sites')
		else:
			return super(SitesView.self).get(request,*args,**kwargs)
