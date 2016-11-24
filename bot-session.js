var https = require("https");
var replyer = function(access_token, req){
	return {

		send: 
			function(m){
				if(req.type != "message"){
					return;
				}
				
				console.log(m);		
           			var actId= req.id;
				var host =req.serviceUrl.split("//")[1].replace("/","");
		
				var data = {
					
					from:req.recipient,
					type:"message",
					conversation:req.conversation,
					replyToId: actId,
					text: m,
					id: actId
				};
				var path = "/v3/conversations/"+encodeURIComponent(req.conversation.id)+"/activities/"+encodeURIComponent(actId);
				var dataRaw = JSON.stringify(data);
				var opt = {
				headers: {
					"Content-Type":"application/json; charset=UTF-8",
					"Authorization":"Bearer "+access_token,
					"Content-Length": Buffer.byteLength(dataRaw, "utf8")
					},
					method:"POST",
					host: host,
					path: path,
				};

				var request = https.request(opt, function(server){
					console.log(server.statusCode);
					server.on("data", function(res){
						console.log(res.toString());
					});		
				});
				
				request.write(dataRaw);
				request.end();
			}
	};

}

module.exports.createReplyer = replyer;
