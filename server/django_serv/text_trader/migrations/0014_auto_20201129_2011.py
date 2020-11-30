# Generated by Django 3.1.3 on 2020-11-30 01:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('text_trader', '0013_auto_20201129_1953'),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30)),
                ('department', models.CharField(max_length=5)),
                ('level', models.CharField(max_length=4)),
                ('major', models.ManyToManyField(to='text_trader.Major')),
            ],
        ),
        migrations.AddField(
            model_name='book',
            name='course',
            field=models.ManyToManyField(to='text_trader.Course'),
        ),
    ]