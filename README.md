# DEV5Bot
Skype bot

# Register a Bot

Register here: https://dev.botframework.com/ 

# Clone the codes

# config.js.my
add a file named config.js.my to the same folder of index.js
```
var config = {
 client_id:<client_id>,
 client_secret:<client_secret>
}

module.exports = config;


```
# Run

`node index.js` or `nodejs index.js`

# Shell

`start.sh` is the script to start the web server.

`access_update.sh` is the script to update the Bot Framework access_token. The access_token json response is saved into `./token.my`.

