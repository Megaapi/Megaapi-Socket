const app = require('express')();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const axios = require("axios");
const send = require("./modules/request");
// io.origins((origin, callback) => {
//     if(origin == "https://seu.site.com.br"){
//         return callback(null, true);
//     }
// });
const ngrok = require('ngrok');
const porta = 3000;
async function ativarNgrok() {
    const url = await ngrok.connect(porta);
    return console.log(url);
}
ativarNgrok();

app.use(bodyParser.json({
  extended: true,
  limit: '100000kb',
}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '100000kb',
}));

app.io = io;

app.io.on('connection', socket => {
    console.log(`Socket conectado ${socket.id}`);
    socket.on('sendMsg', data => {
      console.log(data);
      socket.broadcast.emit('receivedMsg', data);
    });
  });

  app.post("/webhook", function(req, res) {

    var json = req.body;
    //console.log(json);

    send.sendPost(json)

    // app.io.emit('webhook', json);
    return res.send('Enviado com sucesso');

  });

// app.post('/webhook', function (req, res) {
//     var json = req.body;
//     console.log(json);

//     var data = JSON.stringify(json);

//     var xhr = new XMLHttpRequest();
//     xhr.withCredentials = true;
    
//     xhr.addEventListener("readystatechange", function() {
//       if(this.readyState === 4) {
//         console.log(this.responseText);
//       }
//     });
    
//     xhr.open("POST", "https://seusite.com.br/auto_responder/index.php");
//     xhr.setRequestHeader("Content-Type", "application/json");
    
//     xhr.send(data);


//     app.io.emit('webhook', json);
//     return res.send('Ok');
// });



server.listen(porta);
