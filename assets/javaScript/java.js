//Ensure your app is fully mobile responsive.
//Allow users to request additional gifs to be added to the page.
//Each request should ADD 10 gifs to the page, NOT overwrite the existing gifs.
//List additional metadata (title, tags, etc) for each gif in a clean and readable format.
//Integrate this search with additional APIs such as OMDB, or Bands in Town. Be creative and build something you are proud to showcase in your portfolio
//Allow users to add their favorite gifs to a favorites section.
//This should persist even when they select or add a new topic.

$(document).ready(function(){
$("#addComics").on("click",function(event){
	event.preventDefault(); 
	addComic()
});
//things that i like
var comics = ['Stiven-Universe','Rick-and-Morty','Bobs-Burger','Gravity-falls','Star-vs-Evil','Strager-Things','Soth-Park','Futurama','Trending','Eric-Cartman',];
renderButtons();

function renderButtons(){
	$("#buttonsArea").empty();
	
	$(comics).each(function( index ){
	
	$("#buttonsArea").append('<button class="btn btn-primary comicsButton">'+comics[index]+'</button>')
});
$(".comicsButton").on("click",renderImages)
}

function renderImages(){
	$("#imagesArea").empty();
	queryURL = 'https://api.giphy.com/v1/gifs/search?q='+encodeURI($(this).text())+'&limit=25&api_key=7zYdNBBmdin9mhgnZd7lFBRyEW170apG';
	$.ajax({
    method: "GET",
    url: queryURL,
    }).done( function( response ){
    	$(response.data).each( function( index ){
    		var imageBlock = $("<div class=\"imagesBlock\"><img class=\"still\" src=\""+response.data[index].images.fixed_height_still.url+"\" data-still=\""+response.data[index].images.fixed_height_still.url+"\" data-animated=\""+response.data[index].images.fixed_height.url+"\"/><p>Rating: "+response.data[index].rating+"</p></div>");
    		$("#imagesArea").append(imageBlock);
    		$(imageBlock).on("click",toggleState)
    	})		
    }) // end ajax done callback
}

function toggleState() {
	var thisGif = $(this).children('img');

	if (thisGif.hasClass('animated')) {
		thisGif.toggleClass('animated');
		thisGif.attr("src",thisGif.attr('data-still'))
	}
	else {
		thisGif.toggleClass('animated');
		thisGif.attr("src",thisGif.attr('data-animated'))
	}
}

function addComic() {
	if ($("#addComicText").val() != '') {
		comics.push($("#addComicText").val());
		renderButtons()
	}
		
}
});
