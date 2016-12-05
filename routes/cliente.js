/**
 * Created by Core i3 on 05-12-2016.
 */
var mongoose = require('mongoose');

var ClienteSchema = mongoose.Schema({
    nombre: String,
    apellido: String,
    domicilio: String,
    telefono: String,
    email: String
});
module.exports = mongoose.model('Cliente', ClienteSchema);

