# Generated by Django 3.1.3 on 2020-12-06 18:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('text_trader', '0004_auto_20201206_1307'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='subtitle',
            field=models.CharField(blank=True, help_text='Enter a subtitle, if applicable', max_length=100, null=True),
        ),
    ]