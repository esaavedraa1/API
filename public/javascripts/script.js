var aplicacion = angular.module('aplicacion', []);
aplicacion.controller('Clientes', function($scope, $http) {
    $scope._id = null;
    $scope.nombre = '';
    $scope.apellido = ''
    $scope.domicilio = '';
    $scope.telefono = '';
    $scope.email = '';
    $scope.clientes = [];
    $scope.cargarClientes = function(){
        $http({
            method: 'GET', url: '/listar'
        }).
        success(function(data) {
            if(typeof(data) == 'object'){
                $scope.clientes = data;
            }else{
                alert('Error al intentar recuperar los clientes.');
            }
        }).
        error(function() {
            alert('Error al intentar recuperar los clientes.');
        });
    };
    $scope.guardarCliente = function() {
        $http({
            method: 'POST',
            url: '/guardar',
            params: {
                nombre: $scope.nombre,
                apellido: $scope.apellido,
                domicilio: $scope.domicilio,
                telefono: $scope.telefono,
                email: $scope.email,
                _id: $scope._id
            }
        }).
        success(function(data) {
            if(typeof(data) == 'object'){
                $scope.limpiarDatos();
                $scope.cargarClientes();
            }else{
                alert('Error al intentar guardar el cliente.');
            }
        }).
        error(function() {
            alert('Error al intentar guardar el cliente.');
        });
    }
    $scope.recuperarCliente = function(indice) {
        $http({
            method: 'GET',
            url: '/recuperar',
            params: {
                _id: indice
            }
        }).
        success(function(data) {
            if(typeof(data) == 'object'){
                $scope._id = data._id;
                $scope.nombre = data.nombre;
                $scope.apellido = data.apellido;
                $scope.domicilio = data.domicilio;
                $scope.telefono = data.telefono;
                $scope.email = data.email;
            }else{
                alert('Error al intentar recuperar el cliente.');
            }
        }).
        error(function() {
            alert('Error al intentar recuperar el cliente.');
        });
    };
    $scope.eliminarCliente = function(indice) {
        $http({
            method: 'POST',
            url: '/eliminar',
            params: {
                _id: indice
            }
        }).
        success(function(data) {
            if(data == 'Ok'){
                $scope.limpiarDatos();
                $scope.cargarClientes();
            }else{
                alert('Error al intentar eliminar el cliente.');
            }
        }).
        error(function() {
            alert('Error al intentar eliminar el cliente.');
        });
    };
    $scope.limpiarDatos = function() {
        $scope._id = null;
        $scope.nombre = '';
        $scope.apellido = '';
        $scope.domicilio = '';
        $scope.telefono = '';
        $scope.email = '';
    };
});

//

aplicacion.controller('Sgt_monedas_tipo', function($scope, $http) {
    $scope._id = null;
    $scope.monet_id = '';
    $scope.monet_nombre = ''
    $scope.monet_codigo = '';
    $scope.monet_pais= '';
    $scope.sgt_monedas_tipo = [];
    $scope.cargarMonedas_Tipo = function(){
        $http({
            method: 'GET', url: '/Monedas_Tipo/listar'
        }).
        success(function(data) {
            if(typeof(data) == 'object'){
                $scope.clientes = data;
            }else{
                alert('Error al intentar recuperar las Monedas Tipo.');
            }
        }).
        error(function() {
            alert('Error al intentar recuperar las Monedas Tipo.');
        });
    };
    $scope.guardarMoneda_tipo = function() {
        $http({
            method: 'POST',
            url: '/Monedas_Tipo/guardar',
            params: {
                monet_id: $scope.monet_id,
                monet_nombre: $scope.monet_nombre,
                monet_codigo: $scope.monet_codigo,
                monet_pais: $scope.monet_pais,
                _id: $scope._id
            }
        }).
        success(function(data) {
            if(typeof(data) == 'object'){
                $scope.limpiarDatos();
                $scope.cargarMonedas_Tipo();
            }else{
                alert('Error al intentar guardar la Moneda Tipo.');
            }
        }).
        error(function() {
            alert('Error al intentar guardar la Moneda Tipo.');
        });
    }
    $scope.recuperarMoneda_tipo = function(indice) {
        $http({
            method: 'GET',
            url: '/Moneda_Tipo/recuperar',
            params: {
                _id: indice
            }
        }).
        success(function(data) {
            if(typeof(data) == 'object'){
                $scope._id = data._id;
                $scope.monet_id = data.monet_id;
                $scope.monet_nombre = data.monet_nombre;
                $scope.monet_codigo = data.monet_codigo;
                $scope.monet_pais = data.monet_pais;
            }else{
                alert('Error al intentar recuperar la moneda tipo.');
            }
        }).
        error(function() {
            alert('Error al intentar recuperar la moneda tipo.');
        });
    };
    $scope.eliminarCliente = function(indice) {
        $http({
            method: 'POST',
            url: '/Moneda_Tipo/eliminar',
            params: {
                _id: indice
            }
        }).
        success(function(data) {
            if(data == 'Ok'){
                $scope.limpiarDatos();
                $scope.cargarMonedas_Tipo();
            }else{
                alert('Error al intentar eliminar la Moneda Tipo.');
            }
        }).
        error(function() {
            alert('Error al intentar eliminar la Moneda Tipo.');
        });
    };
    $scope.limpiarDatos = function() {
        $scope._id = null;
        $scope.monet_id = '';
        $scope.monet_nombre = ''
        $scope.monet_codigo = '';
        $scope.monet_pais= '';
    };
});