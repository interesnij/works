from job.views import JobView
from django.urls import re_path

urlpatterns=[
	re_path(r'^$', JobView.as_view(), name="job"),
]
