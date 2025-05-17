from tattoo.views import *
from django.urls import re_path


urlpatterns=[
	re_path(r'^$', TattooView.as_view(), name="tattoo"),
	re_path(r'^contacts/$', ConView.as_view(), name="tattoo_contacts"),
	re_path(r'^example/$', ExampleView.as_view(), name="tattoo_example"),
	re_path(r'^example_detail/$', ExampleDetailView.as_view(), name="tattoo_example_detail"),
	re_path(r'^about/$', AbView.as_view(), name="tattoo_about"),
	re_path(r'^news/$', NewsView.as_view(), name="tattoo_news"),
	re_path(r'^news_detail/$', NewsDetailView.as_view(), name="tattoo_news_detail"),
	re_path(r'^goods_index/$', GoodsIndexView.as_view(), name="goods_index"),
	re_path(r'^goods_detail/$', GoodsDetailView.as_view(), name="goods_detail"),
]
