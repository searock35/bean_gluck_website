import sqlite3

conn = sqlite3.connect("./book_site")
c = conn.cursor()

selection="listingrequest"
selection2="book"

# c.execute(f'DELETE FROM text_trader_{selection} WHERE id IN (10, 12, 8)')
for row in c.execute("SELECT * FROM text_trader_" + selection):
    print(row)

# for row in c.execute("SELECT * FROM text_trader_" + selection2):
#     print(row)
 
# for row in c.execute("SELECT sql FROM sqlite_master WHERE tbl_name='text_trader_requestmessage' AND type='table'"):
#     print(row)

conn.commit()
conn.close()