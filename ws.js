var sys = require("sys");
const si = require('systeminformation');

var clients = [];

'use strict';

const https = require('https');
const fs = require('fs');

const WebSocket = require('ws');

const server = https.createServer({
  cert: fs.readFileSync('/etc/letsencrypt/live/www.talkisbetter.com/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/www.talkisbetter.com/privkey.pem')
});

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection (ws) {
	clients.push(ws);
	ws.on('message', function message (msg) {
		console.log(msg);
	});
	ws.on('close',function close() {
		sys.debug("close");
		for(var i = 0; i < clients.length; i++) {
			if(clients[i] == websocket) {
				clients.splice(i);
				break;
			}
		}
	});
});

server.listen(function listening () {
	const ws = new WebSocket(`wss://localhost:8080`, {
		rejectUnauthorized: false
	});

	ws.on('open', function open () {
		ws.send('All glory to WebSockets!');
	});

});


/* ws.createServer(function (websocket) {
websocket.addListener("connect", 
	function (resource) { 
		sys.debug("connect: " + resource);
		clients.push(websocket);
		// setTimeout(websocket.end, 10 * 1000); 
	}).addListener("data", function (data) { 
		sys.debug(data);
		
		for(var i = 0; i < clients.length; i++) {
			clients[i].write("Hello");
		}
	}).addListener("close", function () { 
		sys.debug("close");
		for(var i = 0; i < clients.length; i++) {
			if(clients[i] == websocket) {
				clients.splice(i);
				break;
			}
		}
	});
}).listen(58951); */

function intervalFunc() {
	
	// callback style
	//si.cpu(function(data) {
	//	console.log('CPU-Information:');
	//	console.log(data);
	//})

	// promises style - new in version 3
	//si.currentLoad()
	//	.then(data => function(data) {
	//		for(var i = 0; i < clients.length; i++) {
	//			clients[i].send("sysinfo~"+data.currentload);
	//		}			
	//	})
	//	.catch(error => console.error(error));
}

setInterval(intervalFunc, 5000);
