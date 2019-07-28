var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

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
    productos: [Object],
    total: Number
})

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

})

app.get('/productos/borrar/:id', function (req, res) {
    Producto.findByIdAndRemove({_id: req.params.id}, function (err, producto) {
        if (err) res.json(err);
        else res.json('registro borrado exitosamente');
    });
})


// Puerto 8085 para evitar conflictos
var servidor = app.listen(4000, function () {
    console.log('Servicios activos...')
})
