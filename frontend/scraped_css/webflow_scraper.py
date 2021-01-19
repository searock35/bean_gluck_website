from bs4 import BeautifulSoup as Soup

with open('original.html', 'r') as f:

    contents = f.read()

    soup = Soup(contents, 'lxml')

    root = soup.code

    with open('index.css', 'w') as css:
        css.write(root.text)

    # print ([e.text for e in root.descendants if e.name is not None])