# Generated by Django 3.1.3 on 2020-12-29 01:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('text_trader', '0008_listing_school'),
    ]

    operations = [
        migrations.AddField(
            model_name='requestmessage',
            name='customer',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='text_trader.customer'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='book',
            name='isbn',
            field=models.CharField(blank=True, error_messages={'unique': 'A book with this ISBN already exists.'}, help_text='Enter the 13 number ISBN, if applicable', max_length=13, null=True, unique=True),
        ),
        migrations.CreateModel(
            name='ListingSearch',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='text_trader.book')),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='text_trader.customer')),
            ],
        ),
    ]
