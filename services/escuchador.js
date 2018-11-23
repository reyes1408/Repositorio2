var express = require('express');
var hex2ascii = require('hex2ascii')
var app = express();

const net = require('net');
const server = require('http').Server(app);
const os = require('os');

var x = os.networkInterfaces();
var addresses = [];
for (var z in x){
	for(var z2 in x[z]){
		var address = x [z][z2];
		if(address.family == 'IPv4' && !address.internal){
			addresses.push(address.address);
		}
	}
}	

var Host = addresses[0];

var PORT = 3000;

server.listen(PORT,function() {
	console.log("Servidor correcto." + PORT + "" + Host);
});

var m = net.createServer(function (sock){
	sock.on ('data', function(data){
		var str = data.toString('hex');
		var msj = hex2ascii(str);
		console.log(data);
	})
});

m.listen(PORT, Host);
