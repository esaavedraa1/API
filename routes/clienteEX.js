/**
 * Created by Core i3 on 05-12-2016.
 */
var express = require('express');
var Cliente = require('./cliente.js')
var app = express();
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