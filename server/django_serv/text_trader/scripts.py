# not really scripts, just pasteable data

from text_trader.models import Customer, Locality
from text_trader.serializers import RegisterCustomerSerializer, LocalitySerializer
from django.contrib.auth.models import User
from text_trader import models

loc_data = {'zip_code':'17055', 'state':'PA', 'city':'Mechanicsburg'}
new_data = {'zip_code':'17569', 'state':'PA', 'city':'Reinholds'}
user_data = {'user':{'username':'dude123', 'password':'coocie343', 'email':'jk12@gmail.com'},'first_name':'Cassandra', 'last_name':'Bean', 'school':'1', 'grad_year':'2020','locality':{'state':'PA', 'city':'Ephrata', 'zip_code':'17522'}, 'address':'1094 Jock Street', 'major':['1']}
new_user = RegisterCustomerSerializer(data=user_data)

{"book": "7","condition": "f","purchase_price": "41.51","rental_price": "10.00"}

from text_trader.serializers import BookSerializer
book_s = BookSerializer(data = {"authors":[{"first_name":"David", "middle_initial":"W", "last_name":"Opderbeck"}, {"first_name":"Fredrick", "middle_initial":"M", "last_name":"Cady"}], "title":"Law and Theology", "edition":"1", "isbn":"9781506434322"})