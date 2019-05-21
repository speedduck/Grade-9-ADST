$(function(){
	alert("This is the game client.\nUp to 10 players may join and move around on the map.\nUse arrow keys to move the character, spacebar to change skins, and chat to communicate with other players.");
	var socket;
	var playerIndex = -1;
	var playerX, playerY, mapOffsetX, mapOffsetY, mySprite, myWidth, myHeight;
	var mapWrapper = $('#map-wrapper');
	var viewport = $('#viewport');
	var viewportWidth = viewport.width();
	var viewportHeight = viewport.height();
	var playerSprites = ['bandit', 'skeleton', 'terranite', 'player-custom'];
	var currentSprite = 0;
	// Create variables for when certain keys are pressed
	var moving = {l:false, u:false, r:false, d:false};
	var s = false;
	var sit = false;
	var username;
	var cmsg = $('#chat_message');
	var emsg = $('#error_message');

	$('#username_modal').modal({backdrop:'static', keyboard:false});

	$('#username_modal_ok').on('click', function (event){
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
		// Log connection
		console.log('Connection open.\nLogin credentials sent.');
		
		// Send server username
		socket.send('u' + username);
		
		// Create playername div and append to map
/*		var player = $('#player' + playerIndex);
		var playernameEl = $('<div class="playername-wrapper">').append('<span class="playername">').text(username);
		playernameEl.appendTo(player);*/
		
		// Empty client username variable
		username = '';
		
		// Check if device is mobile
		if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))){
			// Mobile - Show buttons
			$('.mv-btn').show();
			$('#mb-sit-toggle').show();
		}
		else{
			// Not Mobile - Hide buttons
			$('.mv-btn').hide();
			$('#mb-sit-toggle').hide();
		}
	}

	function onMessage(event) {
		var data = JSON.parse(event.data);
		switch(data.e){
			case 'i':
				// Player init
				playerIndex = data.i;
			case 'v':
				// View update
				var players = data.p;
				for(var i = 0; i < players.length; i++){
					var player = players[i];
					var element = $('#player' + player.i);
					if('r' in player){
						element.remove();
					}
					else{
						if(element.length == 0){
							element = $('<div class="sprite sprite-bandit" id="player' + player.i + '" style="width:' + player.pw + 'px; height:' + player.ph + 'px; position:absolute;"></div>');
							element.appendTo($('#map'));
							var playernameEl = $('<div class="playername-wrapper">').append($('<span class="playername">').text(player.un));
							playernameEl.appendTo(element);
						}
						var props = {};
						if('y' in player){
							props.top = player.y;
							props['z-index'] = player.y;
						}
						if('x' in player) props.left = player.x;
						if('w' in player) props['background-position-x'] = -element.width()*(player.w)+'px';
						if('t' in player) props['background-position-y'] = -(element.height()*2)*(player.t)+'px';
						if('pw' in player) props['width'] = player.pw + 'px';
						if('ph' in player) props['height'] = player.ph + 'px';
						if('sit' in player){
							sit = player.sit;
							var sitBtn = $('#mb-sit-toggle');
							var sitBtnText = sitBtn.text();
							if((sit == true) && (sitBtnText == 'Sit')){
								sitBtn.text('Stand');
							}
							else if ((sit == false) && (sitBtnText == 'Stand')){
								sitBtn.text('Sit');
							}
						}
						element.css(props);
					}
					if(player.i == playerIndex){
						// This is me
						if(!mySprite){
							mySprite = $('#player' + playerIndex);
							myWidth = mySprite.width();
							myHeight = mySprite.height();
						}
						var moved = false;
						if('x' in player){
							playerX = player.x;
							moved = true;
						}
						if('y' in player){
							playerY = player.y;
							moved = true;
						}
						if(moved) centerPlayer();
					}
//					element.removeClass('sprite-'+playerSprites[currentSprite]);
//					currentSprite = (player.cs)%playerSprites.length;
//					element.addClass('sprite-'+playerSprites[currentSprite]);
				}
				break;
			case 'm':
				// Map update
				var mapInfo = data.p;
				var tileInfo = data.t;
				var mapString = mapInfo.m;
				var mapWidth = mapInfo.w;
				var mapHeight = mapInfo.h;
				var tileSet = tileInfo.i;
				var tileWidth = tileInfo.w;
				var tileHeight = tileInfo.h;
				mapWrapper.css({width:mapWidth*tileWidth + 'px', height:mapHeight*tileHeight + 'px'});
				for(var i = 0; i < mapString.length; i++){
					var offset = -tileWidth * (mapString.charCodeAt(i)-tileWidth);
					var tile = $('<div class="tile" id="tile' + i + '" style="width:' + tileWidth + 'px; height:' + tileHeight + 'px; background:no-repeat url(/grade-9/img/' + tileSet + '.png); background-position-x:' + offset + 'px"></div>');
					tile.appendTo($('#map'));
				}
				break;
			case 'c':
				// Chat message
				console.log('Message from server ' + data.m);
				$('<div class="alert alert-info" role="alert">')
					.append($('<span>').text('[' + data.t + '] '))
					.append($('<span style="font-weight:bold;">').text(data.p + ': '))
					.append($('<span>').text(data.m))
					.appendTo(cmsg);
//				chatElement.text('[' + data.t + '] ' + data.p + ': ' + data.m).appendTo(cmsg);
				break;
			case 'e':
				// Error
				$('<div class="alert alert-warning" role="alert">')
					.append($('<span>').text(data.m))
					.appendTo(emsg);
				$('#error_modal').modal('show');
				break;
		}
	}

	function centerPlayer(){
		mapOffsetY = viewportHeight/2 - playerY - myHeight/2;
		mapOffsetX = viewportWidth/2 - playerX - myWidth/2;
		mapWrapper.css({top:mapOffsetY + 'px', left:mapOffsetX + 'px'});
	}

	function move(direction, press){
		if(!press || !moving[direction]) {
			moving[direction] = press;
			socket.send((press?'p':'r') + direction);
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
					move('l', false);
					break;
				case 38:
					move('u', false);
					break;
				case 39:
					move('r', false);
					break;
				case 40:
					move('d', false);
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
					move('l', true);
					break;
				case 38: // up arrow for movement
					move('u', true);
					break;
				case 39: // right arrow for movement
					move('r', true);
					break;
				case 40: // down arrow for movement
					move('d', true);
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

	$('body').on('click', '.mv-btn', function(event) {
		if(socket){
			var el = $(this);
			var directions = el.data('direction');
			if (el.hasClass('btn-secondary')){
				for(var i = 0; i < directions.length; i++){
					move(directions[i], false);
				}
				el.removeClass('btn-secondary');
				el.addClass('btn-primary');
			}
			else{
				var nm = {u:false, d:false, r:false, l:false};
				for(var i = 0; i < directions.length; i++) nm[directions[i]] = true;
				for(var direction in moving) if(nm[direction] != moving[direction]) move(direction, nm[direction]);
				$('.mv-btn').removeClass('btn-secondary').addClass('btn-primary');
				el.removeClass('btn-primary');
				el.addClass('btn-secondary');
			}
		}
	}).on('click', '#mb-sit-toggle', function(event) {
		if(socket){
			socket.send('ps');
			socket.send('rs');
		}
	}).on('click', '#mb-btn-toggle', function(event) {
		// Toggle button state
		$('.mv-btn').toggle();
		$('#mb-sit-toggle').toggle();
	})

	function sizeChat() {
		var h = $('body').height()-300;
		if(h < 100) h = 100;
		$('#chat_area').height(h);
	}

	sizeChat();

	$(window).resize(function(){
		viewportWidth = viewport.width();
		viewportHeight = viewport.height();
		sizeChat();
		centerPlayer();
	});

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
