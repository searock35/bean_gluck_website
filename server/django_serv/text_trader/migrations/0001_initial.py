# Generated by Django 3.1.3 on 2020-12-06 02:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=25)),
                ('middle_initial', models.CharField(blank=True, max_length=1, null=True)),
                ('last_name', models.CharField(max_length=25)),
                ('creator', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(help_text="Enter the book's title", max_length=50)),
                ('isbn', models.CharField(blank=True, help_text='Enter the 13 number ISBN, if applicable', max_length=13, null=True, unique=True)),
                ('is_custom', models.BooleanField(default=False)),
                ('edition', models.PositiveSmallIntegerField(help_text='Enter edition number', null=True)),
                ('description', models.CharField(max_length=200, null=True)),
                ('authors', models.ManyToManyField(to='text_trader.Author')),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30)),
                ('department', models.CharField(max_length=5)),
                ('level', models.CharField(max_length=4)),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='auth.user')),
                ('date_created', models.DateField(auto_now=True)),
                ('grad_year', models.IntegerField(blank=True, null=True)),
                ('address', models.CharField(blank=True, max_length=45, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('condition', models.CharField(choices=[('f', 'Like New'), ('nf', 'Near Fine'), ('vg', 'Very Good'), ('g', 'Good'), ('fr', 'Fair'), ('p', 'Poor')], max_length=2)),
                ('purchase_price', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('rental_price', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('negotiable', models.BooleanField(default=False)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='text_trader.book')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='listings', to='text_trader.customer')),
            ],
        ),
        migrations.CreateModel(
            name='ListingRequest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rental_asking_price', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('purchase_asking_price', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('listing', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='text_trader.listing')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='listingRequests', to='text_trader.customer')),
            ],
        ),
        migrations.CreateModel(
            name='Locality',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city', models.CharField(max_length=20)),
                ('state', models.CharField(max_length=2)),
                ('zip_code', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Major',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('major_name', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='SchoolLocation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=25)),
                ('description', models.CharField(max_length=150, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transaction_price', models.FloatField(null=True)),
                ('date_time', models.DateTimeField(null=True)),
                ('listing_request', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='text_trader.listingrequest')),
                ('school_location', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='text_trader.schoollocation')),
            ],
        ),
        migrations.CreateModel(
            name='School',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Enter school name here', max_length=40, unique=True)),
                ('primary_color', models.CharField(default='#ff6347', max_length=7)),
                ('secondary_color', models.CharField(default='#ff6347', max_length=7)),
                ('date_added', models.DateField(auto_now_add=True)),
                ('address', models.CharField(max_length=75)),
                ('locality', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='text_trader.locality')),
            ],
        ),
        migrations.AddField(
            model_name='customer',
            name='locality',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='text_trader.locality'),
        ),
        migrations.AddField(
            model_name='customer',
            name='major',
            field=models.ManyToManyField(to='text_trader.Major'),
        ),
        migrations.AddField(
            model_name='customer',
            name='school',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='text_trader.school'),
        ),
        migrations.CreateModel(
            name='CourseBook',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.PositiveIntegerField()),
                ('semeseter', models.CharField(choices=[('s', 'Spring'), ('m', 'Summer'), ('f', 'Fall')], max_length=1)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='text_trader.book')),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='text_trader.course')),
            ],
        ),
        migrations.AddField(
            model_name='course',
            name='major',
            field=models.ManyToManyField(to='text_trader.Major'),
        ),
        migrations.AddField(
            model_name='course',
            name='school',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='text_trader.school'),
        ),
        migrations.AddField(
            model_name='book',
            name='course',
            field=models.ManyToManyField(through='text_trader.CourseBook', to='text_trader.Course'),
        ),
        migrations.AddField(
            model_name='book',
            name='creator',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]
