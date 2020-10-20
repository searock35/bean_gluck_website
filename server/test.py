from http.server import HTTPServer, BaseHTTPRequestHandler
import pymongo
import urllib
import pprint
from bson.json_util import dumps, CANONICAL_JSON_OPTIONS

user = urllib.parse.quote_plus('searock35')
password = urllib.parse.quote_plus('uGZpUZonZHWSS7ig')

# needed for mongo connection
client_string = "mongodb+srv://" + user + ":" + password + "@cluster0.emqsa.mongodb.net/test?retryWrites=true&w=majority"

class Serv(BaseHTTPRequestHandler):

    def _send_cors_headers(self):
        self.send_header('Content-type', 'application/json')
        self.send_header("Access-Control-Allow-Origin", "http://localhost:3000")
        self.send_header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "x-api-key,Content-Type")

    def do_GET_SEARCH(self, split_path):
        client = pymongo.MongoClient(client_string)
        db = client.test
        books = db.books

        search_string = split_path[1].split('=')[1]
        print("finding books for", search_string)
        results = books.find({ "title": {"$regex": search_string, '$options': 'i'}})
        
        json_out = dumps(results, json_options=CANONICAL_JSON_OPTIONS)
        print(json_out)

        # all_books = []
        # n = 12
        # if(len(result) < n):
        #     n = len(result)
        # for i in range(n):
        #     all_books.append(result[i])
        
        # print(all_books)
            


        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()
        self.wfile.write(bytes(json_out, 'utf-8'))
    
    def do_GET(self):

        components = self.path.split('/')[1:]
        for i in range(len(components)):
            components[i] = components[i].split('?')
        
        print(components)

        if(components[0][0] == 'search'):
            self.do_GET_SEARCH(components[0])

        else:
            self.send_error(404, "Page not found")

        pass

    def do_POST(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()
        pass

httpd = HTTPServer(('localhost', 8080), Serv)
httpd.serve_forever()

# print(client_string)
# client = pymongo.MongoClient(client_string)

# db = client.test

# posts = db.posts

# post = {"title":"Corey's python insertion",
#         "description":"Python post!"
#         }

# post_id = posts.insert_one(post).inserted_id
# print(post_id)

