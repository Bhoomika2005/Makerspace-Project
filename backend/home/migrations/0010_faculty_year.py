# Generated by Django 5.1.4 on 2025-03-10 09:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0009_project_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='faculty',
            name='year',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
