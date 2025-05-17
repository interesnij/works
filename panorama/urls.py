from panorama.views import PanoramaView
from django.urls import re_path


urlpatterns=[
	re_path(r'^$', PanoramaView.as_view(), name="panorama"),
]
