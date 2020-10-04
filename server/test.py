from http.server import HTTPServer, BaseHTTPRequestHandler
import pymongo

class Serv(BaseHTTPRequestHandler):

    # def _set_headers(self):
    #     self.send_response(200)
    #     self.send_header('Content-type', 'application/json')
    #     self.end_headers()

    def _send_cors_headers(self):
        self.send_header('Content-type', 'text/html')
        self.send_header("Access-Control-Allow-Origin", "http://localhost:3000")
        self.send_header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "x-api-key,Content-Type")

    def do_GET(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()
        self.wfile.write(bytes("<div>This is a website return</div>", 'utf-8'))
        print(self.client_address)
        # print(self.path)
        # if self.path == '/':
        #     self.path = '/website_portion/index.html'
        # #elif self.path == '/index2.html':
        #     #self.path = '/website_portion/index2.html'
        #     #this is an example of how we get other pages to work
        # try:
        #     file_to_open = open(self.path[1:]).read()
        #     self.send_response(200)
        # except:
        #     file_to_open = "Uh oh, file not found!"
        #     self.send_response(404)
        # self.end_headers()
        # self.wfile.write(bytes(file_to_open, 'utf-8'))

    def do_POST(self):
        # print("in post")
        # print(self.headers)
        content_len = int(self.headers.getheader('content-length', 0))
        post_body = self.rfile.read(content_len)
        test_data = simplejson.loads(post_body)
        # print(test_data)
        

# needed for mongo connection
client = pymongo.MongoClient("mongodb+srv://searock35:TurfM3l@nun562@cluster0.emqsa.mongodb.net/<dbname>?retryWrites=true&w=majority")
db = client.test
collection = db.posts

httpd = HTTPServer(('localhost', 8080), Serv)
httpd.serve_forever()
