# Generated by Django 5.1.4 on 2025-01-06 16:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0005_rename_course_id_course_courseid_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='EquipmentsModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('image', models.ImageField(blank=True, null=True, upload_to='equipment_images/')),
                ('quantity', models.IntegerField()),
                ('manufacturer', models.CharField(max_length=100)),
                ('model_number', models.CharField(max_length=100)),
                ('notes', models.TextField(blank=True)),
            ],
        ),
    ]
