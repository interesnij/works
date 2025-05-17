from django.urls import re_path
from lusion.views import LusionView, AboutLusionView, Work1LusionView

urlpatterns=[
	re_path(r'^$', LusionView.as_view(), name="lusion"),
	re_path(r'^about/$', AboutLusionView.as_view(), name="lusion_about"),
	re_path(r'^work/kaos-logo-generator/$', Work1LusionView.as_view(), name="lusion_work1"),

]
