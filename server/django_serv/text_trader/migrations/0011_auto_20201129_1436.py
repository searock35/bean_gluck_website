# Generated by Django 3.1.3 on 2020-11-29 19:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('text_trader', '0010_auto_20201126_2238'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usercustomer',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='usercustomer',
            name='last_name',
        ),
        migrations.AlterField(
            model_name='usercustomer',
            name='address',
            field=models.CharField(blank=True, max_length=45, null=True),
        ),
    ]