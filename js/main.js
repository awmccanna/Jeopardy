$(document).ready(loaded);

function log(message)
{
	console.log(message);
}

function loaded()
{
	log("Page loaded");
	$(".col").html("Jeopardy!");
	$('.row').each(function(index) {
		var value = (index * 200) + 200;
		for(var i = 0; i<6; i++)
		{
			$(this).append('<td id="c'+i+'" class="cell">'+value+'</td>');
		}
	});




	$("#btnStart").click(getCategories);

	$("#btnRandom").click(getRandomQuestion);



}

function getRandomQuestion()
{
	$("p").html("");

	$.ajax({
		url:"http://jService.io/api/random",
		dataType:"json",
		success: function(results){
			log(results);
			$("#pCategory").html(results[0].category.title);
			$("#pQuestion").html(results[0].question);
			$("#btnAnswer").click(function() {
				$("#pAnswer").html(results[0].answer);
			});
		}
	});

}


function getCategories()
{
	log("Getting 6 categories");
	$.ajax({
		url:"http://jService.io/api/categories",
		dataType:"json",
		type:"get",
		data: {
			count: 6,
			offset: Math.floor(Math.random()*Math.random()*1000)//Attempting to get a random set of questions
		},
		success: function(results){
			getCategoryQuestions(results);
		},
		error: function(xhr, textStatus, errorThrown){
			log(textStatus);
			log(errorThrown);
			log(xhr);
		}
	});
}

function getCategoryQuestions(categories)
{
	log("Getting questions");
	categories.forEach(function(item, index){
		$.ajax({
			url:"http://jService.io/api/category",
			dataType:"json",
			type:"get",
			data: {
				id: item.id
			},
			success: function(result) {
				populateBoard(result, index);
			},
			error: function(xhr, textStatus, errorThrown){
				log(textStatus);
				log(errorThrown);
				log(xhr);
			}
		});
	});

	$(".cell").click(function ()
	{

		$("#questionArea").html("Question goes here!");
		$(this).html("");
		//This next think kind of works, but seems to take multiple button clicks and just acts weird in general, revisit later
		//$(this).contents().wrap("<div class='temporary'>").fadeOut('fast').text("Question goes here!").delay(1000).fadeIn('fast');

	});
}


/*

 */
function populateBoard(category, number)
{
	//log(category);
	var table = document.getElementById("jBoard");
	var rows = table.getElementsByTagName("tr");
	log(category);
	log(rows[1].children[number]);
	rows[0].children[number].innerHTML = category.title;
	//rows[1].children[number].innerHTML = category.clues[0].question;

}







































