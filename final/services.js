var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var bcrypt = require('bcryptjs');

// Conectamos a Mongo
mongoose.connect('mongodb://localhost/tienda');
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use(cors());

var productoSchema = mongoose.Schema({
    sku: String,
    nombre: String,
    descripcion: String,
    imagen: String,
    precio: Number,
    existencia: Number
});
var Producto = mongoose.model("Producto", productoSchema);

var usuarioSchema = mongoose.Schema({
    usuario: String,
    email: String,
    password: String,
    token: String
})
var Usuario = mongoose.model('Usuario', usuarioSchema);

var pedidoSchema = mongoose.Schema({
    usuario: String,
    email: String,
    productos: [{
            sku: String,
            nombre: String,
            descripcion: String,
            imagen: String,
            precio: Number,
        }],
    total: Number
})
var Pedido = mongoose.model('Pedido', pedidoSchema);

app.get('/productos', function (req,res) {
    Producto.find(function (err,response) {
        if (err) {
            console.log(err);
        } else {
            res.json(response)
        }
    })
})

app.get('/productos/ver/:id', function (req,res) {
    Producto.findById(req.params.id, function (err, producto) {
        if (!producto) {
            res.status(404).send('no se han encontrado datos');
        } else {
            res.json(producto);
        }
    })
})

app.post('/productos/agregar', function (req, res) {
    let producto = new Producto(req.body);
    producto.save()
        .then(producto => {
            res.status(200).json({'producto': 'producto guardado exitosamente'})
        })
        .catch(err => {
            res.status(400).send('error al guardar en la base de datos');
        });


    /*
    var data = req.body;
    if (!data.sku || !data.nombre || !data.descripcion) {
        res.json({
            mensaje: 'No se enviaron los datos requeridos',
            type: 'error'
        });
    } else {
        var nuevoProducto = new Producto({
            sku: data.sku,
            nombre: data.nombre,
            descripcion: data.descripcion
        });
        console.log(nuevoProducto);

        // Guardamos en Mongo
        nuevoProducto.save(function (err, Producto) {
            if (err) {
                res.json({
                    mensaje: 'Error al guardar',
                    type: 'Error'
                });
            } else {
                res.json({
                    mensaje: 'Producto registrado',
                    type: 'success',
                    producto: data
                })
            }

        })
    }*/
})

app.post('/productos/actualizar/:id', function (req, res) {
    Producto.findById(req.params.id, function (err, producto) {
        if (!producto) {
            res.status(404).send('no se han encontrado datos');
        } else {
            producto.existencia = req.body.existencia;

            producto.save()
                .then(producto => {
                    res.json('actualización completa');
                })
                .catch(err => {
                    res.status(400).send('error al actualizar la base de datos');
                });
        }
    })
});

app.get('/productos/borrar/:id', function (req, res) {
    Producto.findByIdAndRemove({_id: req.params.id}, function (err, producto) {
        if (err) res.json(err);
        else res.json('registro borrado exitosamente');
    });
});


app.get('/pedidos', function (req,res) {
    Pedido.find(function (err,response) {
        if (err) {
            console.log(err);
        } else {
            res.json(response)
        }
    })
})

app.get('/pedidos/ver/:id', function (req,res) {
    Pedido.findById(req.params.id, function (err, pedido) {
        if (!pedido) {
            res.status(404).send('no se han encontrado datos');
        } else {
            res.json(pedido);
        }
    })
})

app.post('/pedidos/agregar', function (req, res) {
    let pedido = new Pedido(req.body);
    pedido.save()
        .then(pedido => {
            res.status(200).json({'pedido': 'pedido guardado exitosamente'})
        })
        .catch(err => {
            res.status(400).send('error al guardar en la base de datos');
        });
})

app.get('/usuarios', function (req,res) {
    Usuario.find(function (err,response) {
        if (err) {
            console.log(err);
        } else {
            res.json(response)
        }
    })
})

// Cambiar por post y crear token
app.post('/usuario/validar', function (req,res) {
    var obj = {
        usuario: req.body.usuario
    }

    Usuario.findOne(obj, function (err, usuario) {
        if (!usuario) {
            res.status(404).send('error de acceso');
        } else {
            if (bcrypt.compareSync(req.body.password, usuario.password)) {
                let r = new Usuario(usuario);
                r.token = req.body.token;
                r.save()
                    .then(usu => {
                        console.log('sesión iniciada en el usuario ' + usu.usuario + ' con el id ' + usu._id);
                        let u = {
                            usuario: usu.usuario,
                            email: usu.email,
                            token: usu.token
                        }
                        res.json(u);
                    })
                    .catch(err => {
                        res.status(404).send('error de acceso');
                    })
            } else{
                res.status(404).send('error de acceso');
            }
        }
    })
        .catch(err => {
            res.status(404).send('error de acceso');
        })
})

app.post('/usuarios/agregar', function (req, res) {
    let usuario = new Usuario(req.body);
    usuario.save()
        .then(usuario => {
            res.status(200).json({'usuario': 'usuario guardado exitosamente'})
        })
        .catch(err => {
            res.status(400).send('error al guardar en la base de datos');
        });
})

// Puerto 4000 para evitar conflictos
var servidor = app.listen(4000, function () {
    console.log('Servicios activos...')
});
