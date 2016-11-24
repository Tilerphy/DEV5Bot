var http = require("http");
var translate = function(message,to ,session){

	var data ="from=zh&to=en&query="+encodeURIComponent(message)+"&transtype=realtime&simple_means_flag=3";
	var opt = {
		method:"POST",
		host: "fanyi.baidu.com",
		path: "/v2transapi",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Content-Length": data.length,
			"Referer": "http://fanyi.baidu.com/?aldtype=16047"
		}
	};
	
	
	var req = http.request(opt, function(server){
		server.on("data", function(data){
			session.send(data.toString());
		});
	});
	req.write(data);
	req.end();
}


module.exports = translate;
