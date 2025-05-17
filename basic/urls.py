from basic.views import *
from django.urls import re_path


urlpatterns=[
	re_path(r'^$', BasicView.as_view(), name="basic"),
	re_path(r'^servises/$', BasicServView.as_view(), name="basic_services"),
	re_path(r'^servis1/$', BasicServ1View.as_view(), name="basic_service1"),
	re_path(r'^servis2/$', BasicServ2View.as_view(), name="basic_service2"),
	re_path(r'^servis3/$', BasicServ3View.as_view(), name="basic_service3"),
	re_path(r'^servis4/$', BasicServ4View.as_view(), name="basic_service4"),
	re_path(r'^work1/$', BasicWork1View.as_view(), name="basic_work1"),
	re_path(r'^works/$', BasicWorksView.as_view(), name="basic_works"),
	re_path(r'^about/$', BasicAboutView.as_view(), name="basic_about"),
	re_path(r'^news/$', BasicNewsView.as_view(), name="basic_news"),
	re_path(r'^new1/$', BasicNew1View.as_view(), name="basic_new1"),
	re_path(r'^careers/$', BasicCarView.as_view(), name="basic_careers"),
	re_path(r'^contacts/$', BasicConView.as_view(), name="basic_contacts"),
]
