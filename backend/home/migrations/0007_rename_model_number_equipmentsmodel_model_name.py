# Generated by Django 4.2.6 on 2025-01-11 16:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0006_equipmentsmodel'),
    ]

    operations = [
        migrations.RenameField(
            model_name='equipmentsmodel',
            old_name='model_number',
            new_name='model_name',
        ),
    ]
