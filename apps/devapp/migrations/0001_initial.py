# Generated by Django 2.0.3 on 2018-03-30 06:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='dev_data',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('MAC', models.CharField(max_length=255)),
                ('dev_float', models.CharField(max_length=255)),
                ('uptime', models.CharField(max_length=255)),
            ],
        ),
    ]
