$(function(){
	alert("This is the game client.\nUp to 10 players may join and move around on the map.\nUse arrow keys to move the character, spacebar to change skins, and chat to communicate with other players.");
	var socket = new WebSocket('ws://sean.hulka.ca/ws');
	var playerSprites = ['bandit', 'skeleton', 'terranite', 'player-custom'];
	var currentSprite = 0;
	var l = false, u = false, r = false, d = false, s = false;

	function keepAlive(){
		socket.send('k');
	}

	// Connection opened
	socket.addEventListener('open', function (event) {
		console.log('Connection open.');
		socket.send('n');
	});

	// Listen for messages
	socket.addEventListener('message', function (event) {
		var data = JSON.parse(event.data);
		if(data.e =='v'){
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
//				element.removeClass('sprite-'+playerSprites[currentSprite]);
//				currentSprite = (player.cs)%playerSprites.length;
//				element.addClass('sprite-'+playerSprites[currentSprite]);
			}
		}
		else if(data.e == 'c'){
			console.log('Message from server ', event.data.m);
		}
	});
	
	$('body').on('keyup', function(event) {
		switch(event.which){
			case 32:
				socket.send('rs');
				s = false;
				break;
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
		}
	});

	$('body').on('keydown', function(event) {
		switch(event.which){
//			case 32: // space for skin changing
//				socket.send('ps');
//				break;
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
					break;
					s = true;
				}
		}
	});
	
	setInterval(keepAlive, 15000);
});
