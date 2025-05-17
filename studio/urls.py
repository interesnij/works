from studio.views import StudioView, Proect1View, Proect2View, BlogIndexView, BlogDetailView, BlogDetail2View
from django.urls import re_path

urlpatterns=[
	re_path(r'^$', StudioView.as_view(), name="studio"),
	re_path(r'^proect1/$', Proect1View.as_view(), name="proect1"),
	re_path(r'^proect2/$', Proect2View.as_view(), name="proect2"),
	re_path(r'^blog_index/$', BlogIndexView.as_view(), name="blog_studio"),
	re_path(r'^blog_detail/$', BlogDetailView.as_view(), name="blog_studio_detail"),
	re_path(r'^blog_detail2/$', BlogDetail2View.as_view(), name="blog_studio_detail2"),
]
