# Generated by Django 3.1.3 on 2020-12-29 02:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('text_trader', '0010_auto_20201228_2044'),
    ]

    operations = [
        migrations.RenameField(
            model_name='requestmessage',
            old_name='message',
            new_name='content',
        ),
    ]
