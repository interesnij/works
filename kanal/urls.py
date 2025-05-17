from .views import KanalView
from django.urls import re_path

urlpatterns=[
	re_path(r'^$', KanalView.as_view(), name="kanal"),
]
