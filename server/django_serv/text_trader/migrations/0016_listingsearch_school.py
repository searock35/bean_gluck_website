# Generated by Django 3.1.3 on 2021-01-03 06:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('text_trader', '0015_auto_20210103_0022'),
    ]

    operations = [
        migrations.AddField(
            model_name='listingsearch',
            name='school',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='text_trader.school'),
        ),
    ]