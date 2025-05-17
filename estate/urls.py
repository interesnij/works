from .views import *
from django.urls import re_path

urlpatterns=[
	re_path(r'^$', EstetaView.as_view(), name="esteta_home"),
	re_path(r'^esteta_proect/$', EstetaProectView.as_view(), name="esteta_proect"),
	re_path(r'^esteta_proect_detail/$', EstetaProectDetailView.as_view(), name="esteta_proect_detail"),
	re_path(r'^esteta_brand/$', EstetaBrandView.as_view(), name="esteta_brand"),
	re_path(r'^esteta_product/$', EstetaProductView.as_view(), name="esteta_product"),
	re_path(r'^esteta_product_detail/$', EstetaProductDetailView.as_view(), name="esteta_product_detail"),
    re_path(r'^esteta_design/$', EstetaDesignView.as_view(), name="esteta_design"),
	re_path(r'^esteta_design_detail/$', EstetaDesignDetailView.as_view(), name="esteta_design_detail"),
	re_path(r'^esteta_collect/$', EstetaCollectView.as_view(), name="esteta_collect"),
	re_path(r'^esteta_collect_detail/$', EstetaCollectDetailView.as_view(), name="esteta_collect_detail"),
	re_path(r'^esteta_pdf/$', EstetaPdfView.as_view(), name="esteta_pdf"),
]
