from django.views.generic.base import TemplateView


class MondayView(TemplateView):
    template_name = 'monday.html'
