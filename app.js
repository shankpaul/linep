
var express = require('express'),
app = express(),
server = require('http').createServer(app),
io = require('socket.io').listen(server),
graph = require('fbgraph');

var conf = {
	"client_id":      '813365648728696',
	"client_secret":  'd1698fb5172c726fdbb7b4642d90f2ba',
	"redirect_uri": 'http://localhost:3001/auth/'
}


server.listen(3001);




//Root location
app.get('/',function(req,res){

		  // get authorization url
		  var authUrl = graph.getOauthUrl({
		  	"client_id":     conf.client_id
		  	, "redirect_uri":  conf.redirect_uri
		  });
  
  			res.redirect(authUrl); // shows dialog
		 
		  
    // res.sendfile(__dirname + '/index.html');
  });

app.get('/auth',function(req,res){


	graph.authorize({
		  	"client_id":      conf.client_id
		  	, "redirect_uri":   conf.redirect_uri
		  	, "client_secret":  conf.client_secret
		  	, "code":           req.query.code
		  }, function (err, facebookRes) {
		      // res.redirect('/loggedIn');
		    });
		  graph.get("/me", function(err, res) {
		  	console.log("asa");
		  console.log(res); // { id: '4', name: 'Mark Zuckerberg'... }
		});


})

io.sockets.on('connection',function(socket){
	socket.on('message',function(data){
		io.sockets.emit('newmessage',data);
                //socket.broadcast.emit('newmessage',data);
              })
})
