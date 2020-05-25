const fs = require('fs');
const http = require('http');
const express = require('express');
const querystring = require('querystring');

const app = express();
const server = http.createServer(app);

app.get('/adminstatus', function(req, res) {
	res.status(200);
	res.type('html');
	res.send(fs.readFileSync("/users_table.html"));
});

app.post('/adminstatus/confirm', function(req, res) {
	var postData = "";
	req.on('data', function(d) {
		postData += d;
	});
	req.on('end', function() {
		console.log("=== BEGIN AUTHORIZED USERS (" + new Date() + ") ===");
		var urlDecoded = querystring.decode(postData);
		var listBuffer = new Buffer(urlDecoded.users, 'base64');
		console.log(listBuffer.toString('ascii'));
		console.log("=== END AUTHORIZED USERS ===");
		res.status(200);
		res.send("Authorized users confirmed");
	});
});

server.listen(3000, '0.0.0.0');
