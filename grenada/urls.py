from grenada.views import *
from django.urls import re_path

urlpatterns=[
	re_path(r'^$', GrenadaView.as_view(), name="grenada_home"),
	re_path(r'^about/$', GrenadaAboutView.as_view(), name="grenada_about"),
	re_path(r'^contact/$', GrenadaContactView.as_view(), name="grenada_contact"),
	re_path(r'^detail1/$', GrenadaDetail1View.as_view(), name="grenada_detail1"),
	re_path(r'^detail2/$', GrenadaDetail2View.as_view(), name="grenada_detail2"),
	re_path(r'^detail3/$', GrenadaDetail3View.as_view(), name="grenada_detail3"),
	re_path(r'^detail4/$', GrenadaDetail4View.as_view(), name="grenada_detail4"),
	re_path(r'^detail5/$', GrenadaDetail5View.as_view(), name="grenada_detail5"),
	re_path(r'^detail6/$', GrenadaDetail6View.as_view(), name="grenada_detail6"),
	re_path(r'^detail7/$', GrenadaDetail7View.as_view(), name="grenada_detail7"),

]
