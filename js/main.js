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

}