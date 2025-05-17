from verity.views import VerityView
from django.urls import re_path

urlpatterns=[
	re_path(r'^$', VerityView.as_view(), name="verity"),
]
