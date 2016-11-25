var https = require("https");
var fs = require("fs");
var config = require("./config.js.my");
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
                        server.on("data", function(tokenRaw){
				
				fs.writeFileSync("./token.my", tokenRaw.toString());		
			});
                }
        });

        request.write(data);
        request.end();
}

