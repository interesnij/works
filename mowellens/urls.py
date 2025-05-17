from mowellens.views import *
from django.urls import re_path


urlpatterns=[
	re_path(r'^$', MowellensView.as_view(), name="mowellens"),
	re_path(r'^contact/$', ContactMowellensView.as_view(), name="mowellens_contact"),
	re_path(r'^goods/$', GoodsMowellensView.as_view(), name="mowellens_goods"),
	re_path(r'^good_detail/$', DetailMowellensView.as_view(), name="mowellens_detail"),
	re_path(r'^facts/$', FactMowellensView.as_view(), name="mowellens_fact"),
	re_path(r'^firm/$', FirmMowellensView.as_view(), name="mowellens_firm"),
	re_path(r'^blog/$', BlogMowellensView.as_view(), name="mowellens_blog"),
	re_path(r'^blog_detail/$', BlogDetailMowellensView.as_view(), name="mowellens_blog_detail"),
	re_path(r'^terms/$', TermsMowellensView.as_view(), name="mowellens_terms"),
	re_path(r'^shipping/$', ShippingMowellensView.as_view(), name="mowellens_shipping"),
	re_path(r'^policy/$', PolicyMowellensView.as_view(), name="mowellens_policy"),
	re_path(r'^cart/$', CartMowellensView.as_view(), name="mowellens_cart"),
	re_path(r'^checout/$', ChecoutMowellensView.as_view(), name="mowellens_checout"),
]
