from django.db import models

# Create your models here.
class dev_data(models.Model):
    MAC = models.CharField(max_length=255)
    dev_float = models.CharField(max_length=255)
    uptime = models.CharField(max_length=255)
    fromip = models.CharField(max_length=255)
    def __str__(self):
        tpl = '<dev_data:[MAC={MAC},dev_float={dev_float},uptime={uptime}],fromip={fromip}>'
        return tpl.format(MAC=self.MAC,dev_float=self.dev_float,uptime=self.uptime,fromip=self.fromip)

