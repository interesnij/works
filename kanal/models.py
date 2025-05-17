from django.db import models


class Kanal(models.Model):
	name=models.CharField(max_length=100, unique=True, verbose_name="Канал ютуба или группа")
	posted=models.DateTimeField(auto_now_add=True, db_index=True, verbose_name="Когда писал")
	email=models.CharField(max_length=50, unique=True, verbose_name="почта канала", blank=True, null=True )
	class Meta:
			ordering=["-posted"]
			verbose_name="Канал ютуба или группа"
			verbose_name_plural="Каналы ютуба или группы"

	def __str__(self):
		return self.name
