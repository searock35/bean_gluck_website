# Generated by Django 3.1.3 on 2021-01-03 01:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('text_trader', '0013_book_isbn13'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='isbn13',
            field=models.CharField(blank=True, error_messages={'unique': 'A book with this ISBN already exists.'}, max_length=13, null=True, unique=True),
        ),
    ]
