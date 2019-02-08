$(function(){
	alert("This is the game client.\nUp to 10 players may join and move around on the map.\nUse arrow keys to move the character, spacebar to change skins, and chat to communicate with other players.");
	var socket;
	var playerSprites = ['bandit', 'skeleton', 'terranite', 'player-custom'];
	var currentSprite = 0;
	// Create variables for when certain keys are pressed
	var l = false, u = false, r = false, d = false, s = false;
	var username;
	var cmsg = $('#chat_message');

	$('#username_modal').modal({backdrop:'static', keyboard:false});

	$('#username_modal_ok').on('click', function (event) {
		// Create variable for client name
		var userElement = $('#username_text');
		username = userElement.val();
		if(!username){
			$('#username_message').html('<div class="alert alert-warning" role="alert">You must enter a username and username must contain only alphanumeric characters.</div>');
		}
		else if(username.match("^[A-z0-9]+$")){
			// Create websocket connection.
			socket = new WebSocket('ws://sean.hulka.ca/ws');
			$('#username_message').html('');
			$('#username_modal').modal('hide');

			// Connection opened
			socket.addEventListener('open', onConnection);

			// Listen for messages
			socket.addEventListener('message', onMessage);

			userElement.val('');
		}
		else{
			$('#username_message').html('<div class="alert alert-warning" role="alert">You must enter a username and username must contain only alphanumeric characters.</div>');
		}
	});

	function keepAlive(){
		socket.send('k');
	}

	function onConnection(event) {
		console.log('Connection open.\nLogin credentials sent.');
		socket.send('u' + username);
		username = '';
	}

	function onMessage(event) {
		var data = JSON.parse(event.data);
		switch(data.e){
			case 'v':
				var players = data.p;
				for(var i = 0; i < players.length; i++){
					var player = players[i];
					var element = $('#player' + player.i);
					if('r' in player){
						element.remove();
					}
					else{
						if(element.length == 0){
							element = $('<div class="sprite sprite-bandit" id="player' + player.i + '" style="width:64px; height:64px; position:absolute;"></div>')
							element.appendTo($('#map'));
						}
						var props = {};
						if('y' in player){
							props.top = player.y;
							props['z-index'] = player.y;
						}
						if('x' in player) props.left = player.x;
						if('w' in player) props['background-position-x'] = -64*(player.w)+'px';
						if('t' in player) props['background-position-y'] = -128*(player.t)+'px';
						element.css(props);
					}
//					element.removeClass('sprite-'+playerSprites[currentSprite]);
//					currentSprite = (player.cs)%playerSprites.length;
//					element.addClass('sprite-'+playerSprites[currentSprite]);
				}
				break;
			case 'c':
				console.log('Message from server ' + data.m);
				$('<div class="alert alert-info" role="alert">')
					.append($('<span>').text('[' + data.t + '] '))
					.append($('<span style="font-weight:bold;">').text(data.p + ': '))
					.append($('<span>').text(data.m))
					.appendTo(cmsg);
//				chatElement.text('[' + data.t + '] ' + data.p + ': ' + data.m).appendTo(cmsg);
				break;
			case 'e':
				$('#map').html('<div class="alert alert-primary" role="alert">' + data.m + '</div>');
				break;
		}
	}

	$('#chat_form').on('submit', function(e) {
		if(socket){
			e.preventDefault();
			socket.send('c' + $('#chat_text').val());
			$('#chat_text').val('');
		}
    });

	$('body').on('keyup', function(event) {
		if(socket){
			switch(event.which){
				case 37:
					socket.send('rl');
					l = false;
					break;
				case 38:
					socket.send('ru');
					u = false;
					break;
				case 39:
					socket.send('rr');
					r = false;
					break;
				case 40:
					socket.send('rd');
					d = false;
					break;
				case 83:
//					socket.send('rs');
					s = false;
					break;
			}
		}
	});

	$('body').on('keydown', function(event) {
		if(socket){
			switch(event.which){
//				case 32: // space for skin changing
//					socket.send('ps');
//					break;
				case 37: // left arrow for movement
					if(!l){
						socket.send('pl');
						l = true;
					}
					break;
				case 38: // up arrow for movement
					if(!u){
						socket.send('pu');
						u = true;
					}
					break;
				case 39: // right arrow for movement
					if(!r){
						socket.send('pr');
						r = true;
					}
					break;
				case 40: // down arrow for movement
					if(!d){
						socket.send('pd');
						d = true;
					}
					break;
				case 83: // s for sitting
					if(!s){
						socket.send('ps');
						s = true;
					}
					break;
			}
		}
	});

	function sizeChat() {
		var h = $('body').height()-300;
		if(h < 100) h = 100;
		$('#chat_area').height(h);
	}

	sizeChat();

	$(window).resize(function(){ sizeChat(); });

	window.onblur = function(){
		if(socket && socket.readystate == socket.OPEN){
			socket.send('rl');
			socket.send('ru');
			socket.send('rr');
			socket.send('rd');
			l = u = r = d = false;
		}
	};

	setInterval(keepAlive, 15000);
});
