import sqlite3

conn = sqlite3.connect("./book_site")
c = conn.cursor()

c.execute("DELETE FROM text_trader_listingrequest WHERE id = 2")
for row in c.execute("SELECT * FROM text_trader_listingrequest"):
    print(row)
conn.commit()
conn.close()
# for row in c.execute("SELECT sql FROM sqlite_master WHERE tbl_name='text_trader_listingrequest' AND type='table'"):
#     print(row)