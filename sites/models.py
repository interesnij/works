from django.db import models

class Sites(models.Model):
	name=models.CharField(max_length=100, unique=True, verbose_name="Сайт")
	posted=models.DateTimeField(auto_now_add=True, db_index=True, verbose_name="Опубликовано")
	content=models.TextField(verbose_name="Описание", blank=True, null=True )
	class Meta:
			ordering=["-posted"]
			verbose_name="Сайт"
			verbose_name_plural="Сайты"

	def __str__(self):
		return self.name
