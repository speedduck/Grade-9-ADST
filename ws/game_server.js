#!/usr/bin/node
//#!/usr/bin/env node

var players = new Array(10);

function movePlayers(){
	var updatedPlayers = [];
	for(var i = 0; i < players.length; i++) if(players[i]){
		var updatedPlayer = {i:i};
		var playerChanged = false;
		if(players[i].remove){
			players[i] = null;
			console.log('Player #' + i + ' removed.');
			playerChanged = true;
			updatedPlayer.r = 1;
		}
		else{
			still = true;
			if(players[i].l){
				playerChanged = true;
				still = false;
				players[i].x -= 4;
				updatedPlayer.x = players[i].x;
				updatedPlayer.t = players[i].t = 1;
			}
			if(players[i].r){
				playerChanged = true;
				still = false;
				players[i].x += 4;
				updatedPlayer.x = players[i].x;
				updatedPlayer.t = players[i].t = 3;
			}
			if(players[i].u){
				playerChanged = true;
				still = false;
				players[i].y -= 4;
				updatedPlayer.y = players[i].y;
				updatedPlayer.t = players[i].t = 2;
			}
			if(players[i].d){
				playerChanged = true;
				still = false;
				players[i].y += 4;
				updatedPlayer.y = players[i].y;
				updatedPlayer.t = players[i].t = 0;
			}
			if(!still){
				playerChanged = true;
				updatedPlayer.w = players[i].w = players[i].w % 6 + 1;
				players[i].sit = false;
				players[i].sitting = false;
			}
			else{
				if(!players[i].still){ // Player went from walking to still
					playerChanged = true;
					updatedPlayer.w = players[i].w = 0;
				}
				if(players[i].sit && !players[i].sitting){
					playerChanged = true;
					players[i].sitting = true;
					updatedPlayer.w = players[i].w = 7;
				}
				else if(!players[i].sit && players[i].sitting){
					playerChanged = true;
					players[i].sitting = false;
					updatedPlayer.w = players[i].w = 0;
				}
			}
			players[i].still = still;
			if(players[i].n){
				players[i].n = false;
				playerChanged = true;
				updatedPlayer.x = players[i].x;
				updatedPlayer.y = players[i].y;
				updatedPlayer.w = players[i].w;
				updatedPlayer.t = players[i].t;
				updatedPlayer.cs = players[i].cs;
			}
		}
		if(playerChanged) updatedPlayers.push(updatedPlayer);
	}
	return updatedPlayers;
}

/*function removeClients(){
	for(var i = 0; i < players.length; i++){
		if(players[i] && 'remove' in players[i] && players[i].remove){
			players[i] = null;
			console.log('Player #' + i + ' removed.');
		}
	}
}*/

function setupNewClient(client){
	var playerslist = [];
	for(var i = 0; i < players.length; i++){
		if(players[i]){
			playerslist.push({i:i, x:players[i].x, y:players[i].y, w:players[i].w, t:players[i].t, cs:players[i].cs})
		}
	}
	client.send(JSON.stringify({e:'v', p:playerslist}));
}

function gameLoop(event){
//	removeClients();
	var updatedPlayers = movePlayers();
	if(updatedPlayers.length > 0){
		for(var i = 0; i < players.length; i++){
			if(players[i]){
				players[i].client.send(JSON.stringify({e:'v', p:updatedPlayers}));
			}
		}
	}
}

console.log("Server started");
var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({port: 8010});
wss.on('connection', function(ws) {
	for(var i = 0; i < players.length; i++){
		if(!players[i]){
			players[i] = {
					client:ws,
					x:(64*i), y:(64*i),
					still:true,
					sit:false, sitting:false,
					l:false, u:false, r:false, d:false,
					w:0, t:0, // w is used for the walk animation and t is the rotation of the player.
					cs:0, // cs is used to determine which sprite is being used for the player.
					n:true, remove:false // n signifies that the player is new
				};
			ws.playerIndex = i;
			setupNewClient(players[i].client);
			console.log('Player #' + i + ' has joined the server.');
			i = 10;
		}
	}
	if(!('playerIndex' in ws)){
		ws.send(JSON.stringify({e:'o', m:'Sorry, The server is full.'}));
		ws.close();
	}
	ws.on('message', function(message) {
		console.log('Received from client: %s', message);
		switch(message.charAt(0)){
			case 'p':
				var k = message.charAt(1);
				console.log(k);
				if('playerIndex' in ws){
					switch(k){
						case 's':
							players[ws.playerIndex].sit = !players[ws.playerIndex].sit;
							break;
						case 'l': case 'r': case 'u': case 'd':
							players[ws.playerIndex][k] = true;
							break;
					}
				}
				break;
			case 'r':
				var k = message.charAt(1);
				console.log(k);
				if('playerIndex' in ws){
					switch(k){
//						case 's':
//							break;
						case 'l': case 'r': case 'u': case 'd':
							players[ws.playerIndex][k] = false;
							break;
					}
				}
				break;
			case 'c':
				console.log('Received from client: %s', new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + ': ' + message.substr(1));
				if('playerIndex' in ws) wss.clients.forEach(function each(client) {
					client.send({e:'c', m:(new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + ': ' + message.substr(1))});
				});
				break;
		}
//		wss.clients.forEach(function each(client) {
//			client.send(new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + ': ' + message);
//		});
	});
	ws.on('close', function() {
		if('playerIndex' in ws){
			players[ws.playerIndex].remove = true;
			console.log('Player #' + ws.playerIndex + ' disconnected.');
		}
	});
});

setInterval(gameLoop, 125);
