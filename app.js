
var express = require('express'),
app = express(),
server = require('http').createServer(app),
io = require('socket.io').listen(server),
FB = require('fb');

var conf = {
	"client_id":      '813365648728696',
	"client_secret":  'd1698fb5172c726fdbb7b4642d90f2ba',
	"scope":          'email',
	"redirect_uri": 'http://localhost:3001/auth'
}

FB.options({
    appId:          '813365648728696',
    appSecret:      'd1698fb5172c726fdbb7b4642d90f2ba',
    redirectUri:    'http://localhost:3001/auth'
});

server.listen(3001);




//Root location
app.get('/',function(req,res){
 
      res.redirect(FB.getLoginUrl({ scope: 'user_about_me' }));       
   
   		// res.sendfile(__dirname + '/index.html');
  });

app.get('/auth',function(req,res){

   var code            = req.query.code;
   console.log(code);

})

io.sockets.on('connection',function(socket){
	socket.on('message',function(data){
		io.sockets.emit('newmessage',data);
                //socket.broadcast.emit('newmessage',data);
              })
})
