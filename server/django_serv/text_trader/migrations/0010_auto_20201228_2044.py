# Generated by Django 3.1.3 on 2020-12-29 01:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('text_trader', '0009_auto_20201228_2018'),
    ]

    operations = [
        migrations.RenameField(
            model_name='requestmessage',
            old_name='customer',
            new_name='owner',
        ),
    ]