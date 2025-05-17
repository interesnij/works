from gallery.views import GalleryView
from django.urls import re_path


urlpatterns=[
	re_path(r'^$', GalleryView.as_view(), name="gallery"),
]
