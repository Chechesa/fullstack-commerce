import React, { Component } from "react";
import axios from 'axios';
import {
    HashRouter,
    Link
} from "react-router-dom";
import ProductoRow from "./ProductoRow";

class Productos extends Component {
    constructor(props) {
        super(props);

        this.onChangeProductoSKU = this.onChangeProductoSKU.bind(this);
        this.onChangeProductoNombre = this.onChangeProductoNombre.bind(this);
        this.onChangeProductoDescripcion = this.onChangeProductoDescripcion.bind(this);
        this.onChangeProductoImagen = this.onChangeProductoImagen.bind(this);
        this.onChangeProductoPrecio = this.onChangeProductoPrecio.bind(this);
        this.onChangeProductoExistencia = this.onChangeProductoExistencia.bind(this);

        this.agregarProducto = this.agregarProducto.bind(this);

        this.state = {
            data: [],
            sku: '',
            nombre: '',
            descripcion: '',
            imagen: '',
            precio: '',
            existencia: '',
        };
    }



    onChangeProductoSKU(e) {
        this.setState({
                sku: e.target.value
        });
    }

    onChangeProductoNombre(e) {
        this.setState({
                nombre: e.target.value
        });
    }

    onChangeProductoDescripcion(e) {
        this.setState({
                descripcion: e.target.value
        });
    }

    onChangeProductoImagen(e) {
        this.setState({
                imagen: e.target.value
        });
    }

    onChangeProductoPrecio(e) {
        this.setState({
            precio: e.target.value
        });
    }

    onChangeProductoExistencia(e) {
        this.setState({
                existencia: e.target.value
        });
    }


    agregarProducto(e) {
        e.preventDefault();

        // console.log(this.state);
        const obj = {
            sku: this.state.sku,
            nombre: this.state.nombre,
            descripcion: this.state.descripcion,
            imagen: this.state.imagen,
            existencia: this.state.existencia
        };
        // const obj = {};

        axios.post('http://localhost:4000/productos/agregar', obj)
            .then(res => {
                console.log(res.data);
                this.setState({
                    sku: '',
                    nombre: '',
                    descripcion: '',
                    imagen: '',
                    precio: '',
                    existencia: ''
                })
                window.location.reload()
            });
    }

    render() {
        // const { data } = this.state;
        return(
            <HashRouter>
                <div>
                    <h2>Productos</h2>
                </div>
                <div>
                    <p>Listado</p>
                    <div>
                        <table className={'table'}>
                            <tbody>
                        {this.state.data.length <= 0
                        ? <tr><td>Aún no hay productos para mostrar</td></tr>
                        : this.state.data.map((producto, i) => (
                            <ProductoRow producto={producto} key={i} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <h3>Añadir producto</h3>
                    <div><form onSubmit={this.agregarProducto}>

                        <div>
                            <div className={'form-group'}>
                                <input
                                    type={'text'}
                                    name={'sku'}
                                    placeholder={'SKU'}
                                    className={'form-control'}
                                    value={this.state.sku}
                                    onChange={this.onChangeProductoSKU}
                                    required/>
                            </div>
                            <div className={'form-group'}>
                                <input type={'text'}
                                       name={'nombre'}
                                       placeholder={'Nombre'}
                                       className={'form-control'}
                                       value={this.state.nombre}
                                       onChange={this.onChangeProductoNombre}
                                       required/>
                            </div>
                            <div className={'form-group'}>
                                <textarea
                                    name={'descripcion'}
                                    placeholder={'Descripción'}
                                    className={'form-control'}
                                    value={this.state.descripcion}
                                    onChange={this.onChangeProductoDescripcion}
                                    required></textarea>
                            </div>
                            <div className={'form-group'}>
                                <input
                                    type={'text'}
                                    name={'imagen'}
                                    placeholder={'URL de la imagen (http://)'}
                                    className={'form-control'}
                                    value={this.state.imagen}
                                    onChange={this.onChangeProductoImagen}
                                    required/>
                            </div>
                            <div className={'form-group'}>
                                <input
                                    type={'number'}
                                    name={'precio'}
                                    placeholder={'Precio al público'}
                                    className={'form-control'}
                                    value={this.state.precio}
                                    onChange={this.onChangeProductoPrecio}
                                    required/>
                            </div>
                            <div className={'form-group'}>
                                <input
                                    type={'number'}
                                    name={'existencia'}
                                    placeholder={'Cantidad en existencia'}
                                    className={'form-control'}
                                    value={this.state.existencia}
                                    onChange={this.onChangeProductoExistencia}
                                    required/>
                            </div>
                        </div>
                        <button className={'btn btn-primary'}>Agregar producto</button>

                    </form></div>
                </div>
            </HashRouter>
        );
    }

    componentDidMount() {
        this.getDataFromDb()
    }

    getDataFromDb = () => {
        axios.get('http://localhost:4000/productos')
            .then(response => {
                this.setState({ data: response.data });
            })
            .catch(function (err) {
                console.log(err);
            });
    }

}

export default Productos;