var config = require("./config.js.my");
var botSession = require("./bot-session");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var https = require("https");
var fs = require("fs");
run();
function run(){
	
	
	var server = https.createServer(
	{
		key: fs.readFileSync("./server-key.pem"),
		cert: fs.readFileSync("./server-cert.pem")	
	}, app);
	app.use(bodyParser());
	app.get("/testget", function(req, res){
 	console.log(req);
	res.write("hey");

	res.end();
	});

	app.post("/testpost", function(req,res){
		
		sendBack(req.body);
		
		res.writeHead(200);
		res.end();
		
	});


	server.listen(7890);

	function sendBack(req){
		if(req.type != "message"){
			return;
		}
		else{
			var tokenJson = JSON.parse(fs.readFileSync("./token.my"));
			var session = botSession.createReplyer(tokenJson.access_token, req);
			require("./talk")(req.text,req.from.id, session);
		}
		
	}
}


