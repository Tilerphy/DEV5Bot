var http = require("http");
var config = require("./config.js.my");
var talk = function(message, userid,session){

	var  dataRaw = {
		"key": config.tulingKey,
   		"userid": userid,//parseInt(Math.random()*1000),
		"info":message
	};
	var data = JSON.stringify(dataRaw);
	console.log(data);
	var opt = {
		host: "www.tuling123.com",
		path: "/openapi/api",
		method: "POST",
		headers:{
			"Content-Type": "application/json; charset=UTF-8",
			"Content-Length":Buffer.byteLength(data, "utf8")
		}
	};

	var req = http.request(opt, function(server){
		server.on("data", function(res){			
					var tmp = JSON.parse(res.toString());
				session.send(tmp.text + (tmp.url ? (" Here: "+tmp.url):""));
		});
	});
	req.on('error', function(m){console.log(m)});
	req.write(data);
	req.end();
}

module.exports = talk;
