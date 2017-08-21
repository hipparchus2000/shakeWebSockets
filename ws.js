var sys = require("sys");
const si = require('systeminformation');

var clients = [];

'use strict';

var ws=require("nodejs-websocket");

ws.createServer(function (websocket) {
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
}).listen(13003); 

setInterval(intervalFunc, 5000);

function intervalFunc() {
	
	// callback style
	//si.cpu(function(data) {
	//	console.log('CPU-Information:');
	//	console.log(data);
	//})
	console.log("starting interval func");
	// promises style - new in version 3
	si.currentLoad()
		.then(data => function(data) {
			console.log(data);
			for(var i = 0; i < clients.length; i++) {
				clients[i].write("sysinfo~"+data.currentload);
			}			
		})
		.catch(error => console.error(error));
}


