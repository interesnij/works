from digital.views import DigitalView
from django.urls import re_path

urlpatterns=[
	re_path(r'^$', DigitalView.as_view(), name="digital"),

]
