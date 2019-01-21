$(function(){
	alert("This is a multiuser chat test.\nInput your message and send for users to see.");
	// Create variable for client name
	var user = '';
	// Create websocket connection.
	var socket = new WebSocket('ws://sean.hulka.ca/ws');
	
	$('#username_modal').modal({backdrop:'static', keyboard:false});
	
	$('#username_modal_ok').on('click', function (event) {
		var text = $('#username_text').val();
		if(!text){
			$('#username_message').html('<div class="alert alert-warning" role="alert">You must enter a username and username must contain only alphanumeric characters.</div>');
		}
		else if(text.match("^[A-z0-9]+$")){
			user = text;
			$('#username_message').html('');
			$('#username_modal').modal('hide');
		}
		else {
			$('#username_message').html('<div class="alert alert-warning" role="alert">You must enter a username and username must contain only alphanumeric characters.</div>');
		}
	});
	
	// Connection opened
	socket.addEventListener('open', function (event) {
		
	});

	$('#chat_form').on('submit', function(e) {
		e.preventDefault();
		socket.send(user + ': ' + $('#chat_text').val());
		$('#chat_text').val('');
    });

	// Listen for messages
	socket.addEventListener('message', function (event) {
		console.log('Message from server ', event.data);
//		$('#chat_message').append('<div class="alert alert-info" role="alert">' + event.data + '</div>');
		$('<div class="alert alert-info" role="alert">').text(event.data).appendTo('#chat_message');
	});
});
