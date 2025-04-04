# Generated by Django 5.1.4 on 2025-01-23 10:33

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('courseId', models.CharField(max_length=10, unique=True)),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('offeredBy', models.CharField(max_length=100)),
                ('offeredTo', models.CharField(max_length=100)),
                ('duration', models.CharField(max_length=50)),
                ('schedule', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='EquipmentsModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('image', models.ImageField(blank=True, null=True, upload_to='equipment_images/')),
                ('quantity', models.IntegerField()),
                ('manufacturer', models.CharField(max_length=100)),
                ('model_name', models.CharField(max_length=100)),
                ('notes', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('event_date', models.DateField()),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Faculty',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('role', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254)),
                ('location', models.CharField(blank=True, max_length=255, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='faculty_images/')),
            ],
        ),
        migrations.CreateModel(
            name='FormDocument',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('file', models.FileField(upload_to='forms/')),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='EventImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='gallery/')),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='home.event')),
            ],
        ),
        migrations.CreateModel(
            name='UserSession',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('refresh_token', models.CharField(max_length=255, unique=True)),
                ('access_token', models.CharField(max_length=255, unique=True)),
                ('refresh_token_expires_at', models.DateTimeField()),
                ('access_token_expires_at', models.DateTimeField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
