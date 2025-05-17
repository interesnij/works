from django.urls import re_path, include
from django.contrib.auth import views as auth_views
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    re_path(r'^admin/', admin.site.urls),

    re_path(r'^$', include ('main.urls')),
    re_path(r'^gallery/', include ('gallery.urls')),
    re_path(r'^aframe/', include('aframe.urls')),
    re_path(r'^parallax/', include('parallax.urls')),
    re_path(r'^tattoo/', include('tattoo.urls')),
    re_path(r'^studio/', include('studio.urls')),
    re_path(r'^panorama/', include('panorama.urls')),
    re_path(r'^story/', include('story.urls')),
    re_path(r'^digital/', include('digital.urls')),
    re_path(r'^sites/', include('sites.urls')),
    re_path(r'^music/', include('music.urls')),
    re_path(r'^estate/', include('estate.urls')),
    re_path(r'^grenada/', include('grenada.urls')),
    re_path(r'^lusion/', include('lusion.urls')),
    re_path(r'^job/', include('job.urls')),
    re_path(r'^verity/', include('verity.urls')),
    re_path(r'basic/', include('basic.urls')),
    re_path(r'kanal/', include('kanal.urls')),
    re_path(r'mowellens/', include('mowellens.urls')),
    re_path(r'manship/', include('manship.urls')),
    re_path(r'monday/', include('monday.urls')),

]  +static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
