



function makeJSON() {
	var dict = {"one" : [15, 4.5],
	        "two" : [34, 3.3],
	        "three" : [67, 5.0],
	        "four" : [32, 4.1]};

	var dictstring = JSON.stringify(dict);
	
	
}

function search_onclick() {
	var search_bar = document.getElementById("book_search_bar");
	var input = search_bar.getElementsByTagName("input");
	input[0].value = '';
}