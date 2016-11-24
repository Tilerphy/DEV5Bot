var config = require("./config.js.my");
var botSession = require("./bot-session");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var https = require("https");
var fs = require("fs");
login();
function login(){
	var data = "grant_type=client_credentials&client_id="+config.client_id
	+"&client_secret="+config.client_secret
	+"&scope=https%3A%2F%2Fgraph.microsoft.com%2F.default";
	var opt = {
		method:"POST",
		host: "login.microsoftonline.com",
		path: "/common/oauth2/v2.0/token",
		headers:{
			"Content-Type":"application/x-www-form-urlencoded",
			"Content-Length":data.length
		}
	};

	var request =  https.request(opt, function(server){
		if(server.statusCode == 200){
			console.log("Login.");
			server.on("data", run);	
		}
	});

	request.write(data);
	request.end();
}

function run(token){
	
	var access_token = JSON.parse(token.toString()).access_token;
	console.log("access_token", access_token);

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

			var session = botSession.createReplyer(access_token, req);
			require("./talk")(req.text,req.from.id, session);
		}
		
	}
}


