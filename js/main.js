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
			$(this).append('<td>'+value+'</td>');
		}
	});

	$("#btnStart").click(function() {
		window.alert("Full game coming soon!")
	});

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






