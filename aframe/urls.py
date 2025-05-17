from aframe.views import AframeView
from django.urls import re_path


urlpatterns=[
	re_path(r'^$', AframeView.as_view(), name="aframe"),
]
