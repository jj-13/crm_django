# Generated by Django 4.2.7 on 2024-03-04 14:53

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0004_alter_post_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='slug',
            field=models.SlugField(default=uuid.UUID('dd5db7ba-9729-410f-82ea-145f1f9aa380'), unique=True),
        ),
    ]
