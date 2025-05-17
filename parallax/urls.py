from parallax.views import ParallaxView
from django.urls import re_path

urlpatterns=[
	re_path(r'^$', ParallaxView.as_view(), name="parallax"),
]
