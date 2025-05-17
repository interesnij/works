from story.views import StoryView,StoryAboutView,StoryAddView,StoryDetailView
from django.urls import re_path

urlpatterns=[
	re_path(r'^$', StoryView.as_view(), name="story"),
	re_path(r'about', StoryAboutView.as_view(), name="story_about"),
	re_path(r'add', StoryAddView.as_view(), name="story_add"),
	re_path(r'detail', StoryDetailView.as_view(), name="story_detail"),
]
