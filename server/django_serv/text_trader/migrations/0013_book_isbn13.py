# Generated by Django 3.1.3 on 2021-01-03 00:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('text_trader', '0012_remove_requestmessage_is_seller'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='isbn13',
            field=models.CharField(blank=True, error_messages={'unique': 'A book with this ISBN already exists.'}, max_length=10, null=True, unique=True),
        ),
    ]
