# not really scripts, just pasteable data

from text_trader.models import UserCustomer, Locality
from text_trader.serializers import RegisterCustomerSerializer, LocalitySerializer

loc_data = {'zip_code':'17055', 'state':'PA', 'city':'Mechanicsburg'}
new_data = {'zip_code':'17569', 'state':'PA', 'city':'Reinholds'}
user_data = {'user':{'username':'dude123', 'password':'coocie343', 'email':'jk12@gmail.com'},'first_name':'Cassandra', 'last_name':'Bean', 'school':'1', 'grad_year':'2020','locality':{'state':'PA', 'city':'Ephrata', 'zip_code':'17522'}, 'address':'1094 Jock Street', 'major':['1']}
new_user = RegisterCustomerSerializer(data=user_data)

{"book": "7","condition": "f","purchase_price": "41.51","rental_price": "10.00"}