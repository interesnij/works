from django.urls import re_path

from monday.views import MondayView

urlpatterns = [
    re_path(r'^$', MondayView.as_view(), name='monday'),
]
