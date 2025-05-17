from manship.views import *
from django.urls import re_path

urlpatterns=[
	re_path(r'^$', ManshipView.as_view(), name="manship"),
	re_path(r'^brunch/$', BrunchManshipView.as_view(), name="manship_brunch"),
	re_path(r'^lunch/$', LunchManshipView.as_view(), name="manship_lunch"),
	re_path(r'^dinner/$', DinnerManshipView.as_view(), name="manship_dinner"),
	re_path(r'^drink/$', DrinkManshipView.as_view(), name="manship_drink"),
	re_path(r'^about/$', AboutManshipView.as_view(), name="manship_about"),
	re_path(r'^story/$', StoryManshipView.as_view(), name="manship_story"),
	re_path(r'^people/$', PeopleManshipView.as_view(), name="manship_people"),
	re_path(r'^kitchen/$', KitchenManshipView.as_view(), name="manship_kitchen"),
	re_path(r'^bar/$', BarManshipView.as_view(), name="manship_bar"),
	re_path(r'^source/$', SourceManshipView.as_view(), name="manship_source"),
	re_path(r'^news/$', NewsManshipView.as_view(), name="manship_news"),
	re_path(r'^new/$', NewManshipView.as_view(), name="manship_new"),
	re_path(r'^events/$', EventsManshipView.as_view(), name="manship_events"),
	re_path(r'^gallery/$', GalleryManshipView.as_view(), name="manship_gallery"),
	re_path(r'^awwards/$', AwwardsManshipView.as_view(), name="manship_awwards"),
	re_path(r'^private/$', PrivateManshipView.as_view(), name="manship_private"),
	re_path(r'^contacts/$', ContManshipView.as_view(), name="manship_contacts"),
]
