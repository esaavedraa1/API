
/**
 * Module dependencies.
 */

var express = require('express');
//var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Conexión a Mongoose.
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/SGTDB', function(error){
   if(error){
      throw error; 
   }else{
      console.log('Conectado a MongoDB');
   }
});



var Sgt_moneda_tipoSchema = mongoose.Schema({
	monet_id: Number,
	monet_nombre: String,
	monet_codigo: String,
	monet_pais: String,
});
var Sgt_moneda_tipo = mongoose.model('Sgt_moneda_tipo', Sgt_moneda_tipoSchema);

app.get('/Monedas_Tipo', function(req, res){
	res.sendfile('./public/index2.html');
});

app.get('/Monedas_Tipo/listar', function(req, res){
	Sgt_moneda_tipo.find({}, function(error, sgt_monedas_tipo){
		if(error){
			res.send('Error.');
		}else{
			res.send(sgt_monedas_tipo);
		}
	})
});

app.get('/Monedas_Tipo/recuperar', function(req, res){
	Sgt_moneda_tipo.findById(req.query._id, function(error, sgt_monedas_tipo){
		if(error){
			res.send('Error.');
			console.log("Error en la recuperacion")
		}else{
			res.send(sgt_monedas_tipo);
			console.log(sgt_monedas_tipo)
		}
	});
});

app.post('/Monedas_Tipo/guardar', function(req, res){
	if(req.query._id == null){
		//Inserta
		var sgt_moneda_tipo = new Sgt_moneda_tipo({
			monet_id: req.query.monet_id,
			monet_nombre: req.query.monet_nombre,
			monet_codigo: req.query.monet_codigo,
			monet_pais: req.query.monet_pais
		});
		sgt_moneda_tipo.save(function(error, documento){
			if(error){
				res.send('Error.');
			}else{
				res.send(documento);
			}
		});
	}else{
		//Modifica
		Sgt_moneda_tipo.findById(req.query._id, function(error, documento){
			if(error){
				res.send('Error.');
			}else{
				var sgt_moneda_tipo = documento;
					sgt_moneda_tipo.monet_id = req.query.monet_id,
					sgt_moneda_tipo.monet_nombre= req.query.monet_nombre,
					sgt_moneda_tipo.monet_codigo= req.query.monet_codigo,
					sgt_moneda_tipo.monet_pais = req.query.monet_pais
				cliente.save(function(error, documento){
					if(error){
						res.send('Error.');
					}else{
						res.send(documento);
					}
				});
			}
		});
	}
});

app.post('/Monedas_Tipo/eliminar', function(req, res){
	Sgt_moneda_tipo.remove({_id: req.query._id}, function(error){
		if(error){
			res.send('Error.');

		}else{
			res.send('Ok');
		}
	});
});





//Documentos
var ClienteSchema = mongoose.Schema({
	nombre: String,
    apellido: String,
    domicilio: String,
    telefono: String,
    email: String
});
var Cliente = mongoose.model('Cliente', ClienteSchema);

app.get('/', function(req, res){
	res.sendfile('./public/index.html');
});

app.get('/listar', function(req, res){
	Cliente.find({}, function(error, clientes){
      	if(error){
      		res.send('Error.');
      	}else{
        	res.send(clientes);        	
      	}
   })
});

app.get('/recuperar', function(req, res){
	Cliente.findById(req.query._id, function(error, documento){
      	if(error){
         	res.send('Error.');
      	}else{
         	res.send(documento);
      	}
   });
});

app.post('/guardar', function(req, res){
	if(req.query._id == null){
		//Inserta
		var cliente = new Cliente({
		   nombre: req.query.nombre,
		   apellido: req.query.apellido,
		   domicilio: req.query.domicilio,
		   telefono: req.query.telefono,
		   email: req.query.email
		});
		cliente.save(function(error, documento){
			if(error){
			 	res.send('Error.');
			}else{
			 	res.send(documento);
			}
	   	});
	}else{
		//Modifica
		Cliente.findById(req.query._id, function(error, documento){
		  	if(error){
				res.send('Error.');
		  	}else{
				var cliente = documento;
				cliente.nombre = req.query.nombre,
			   	cliente.apellido = req.query.apellido,
			   	cliente.domicilio = req.query.domicilio,
			   	cliente.telefono = req.query.telefono,
			   	cliente.email = req.query.email
				cliente.save(function(error, documento){
			    	if(error){
			       		res.send('Error.');
			    	}else{ 
			       		res.send(documento);
			    	}
			 	});
			}
		});
	}
});

app.post('/eliminar', function(req, res){
	Cliente.remove({_id: req.query._id}, function(error){
		if(error){
			res.send('Error.');
		}else{
			res.send('Ok');
		}
   });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
