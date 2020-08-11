

var search_bar = document.getElementByID('book_search_bar');

search_bar.addEventListener("click")


function makeJSON() {
	var dict = {"one" : [15, 4.5],
	        "two" : [34, 3.3],
	        "three" : [67, 5.0],
	        "four" : [32, 4.1]};

	console.log("Hey");

	var dictstring = JSON.stringify(dict);


}

