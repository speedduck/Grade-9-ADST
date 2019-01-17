$(function(){
	alert("This is a multiuser chat test.\nInput your message and send for users to see.");
	// Create variable for client name
	var client = 'client: ';
	// Create websocket connection.
	var socket = new WebSocket('ws://sean.hulka.ca/ws');
	
	// Connection opened
	socket.addEventListener('open', function (event) {
		socket.send(client + 'Hello Server!');
	});

	// Listen for messages
	socket.addEventListener('message', function (event) {
		console.log('Message from server ', event.data);
	});
});
