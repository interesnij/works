from django import forms
from .models import Sites

class SitesForm(forms.ModelForm):
	class Meta:
		model=Sites
		fields='__all__'
