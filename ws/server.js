console.log("Server started");
var Msg = '';
var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({port: 8010});
    wss.on('connection', function(ws) {
        ws.on('message', function(message) {
            console.log('Received from client: %s', message);
            wss.clients.forEach(function each(client) {
     		client.send(message);
	    });
	});
    });
