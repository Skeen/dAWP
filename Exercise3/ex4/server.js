var http = require("http");
var WebSocketServer = require("websocket").server;
	
var port = 8080;

var server = http.createServer(function(req, res)
{
	console.log("Received request for:", req.url);
	res.writeHead(404);
	res.end();
});
server.listen(port);

var peers = []

var wsServer = new WebSocketServer({ httpServer: server });
wsServer.on("request", function(request) 
{
	var connection = request.accept(null, request.origin);
    peers.push(connection);
	
	connection.on("message", function(msg)
    {
		console.log("Received message", msg);
        if(msg.type !== "utf8")
        {
            var data = {
                sender:  'SERVER',
                message: 'Please send messages in utf8 encoding'
            };
            connection.send(JSON.stringify(data));
        }
        else
        {
            var parsed = JSON.parse(msg.utf8Data);
            if(parsed.sender == "Anonymous")
            {
                var data = {
                    sender:  'SERVER',
                    message: 'Greetings Anonymous, please enter a username, before chatting'
                };
                connection.send(JSON.stringify(data));
            }
            else
            {
                peers.forEach(function(peer)
                {
                    peer.send(msg.utf8Data);
                });
            }
        }
	});
});
