from .views import SitesView
from django.urls import re_path

urlpatterns=[
	re_path(r'^$', SitesView.as_view(), name="sites"),
]
