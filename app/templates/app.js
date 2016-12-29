var express=require('express');
var helmet=require('helmet');
var bodyParser=require('body-parser');

var app=express();

app.set('view engine','ejs');

app.use('/bower_components',express.static('bower_components'));
app.use('/public',express.static('public'));
app.use('/images',express.static('public/assets/images'));
app.use('/dist',express.static('dist'));

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/views/*', function(req,res){

	res.render(req.params[0]);
});

app.get('/*', function(req,res){
	res.render('index');
});



app.listen(3000,function(){
	console.log('Servidor conectado en el puerto 3000');
});