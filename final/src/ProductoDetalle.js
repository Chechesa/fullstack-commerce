import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ProductoDetalle extends Component {
    constructor(props) {
        super(props);

        this.agregarAlCarrito = this.agregarAlCarrito.bind(this);

        this.state = { producto: {}}
    }

    componentDidMount() {
        axios.get('http://localhost:4000/productos/ver/'+this.props.match.params.id)
            .then((res) => {
                this.setState({producto: res.data})
            })
    }

    agregarAlCarrito() {
        console.log(localStorage.carrito);
        let carrito = JSON.parse(localStorage.carrito);
        carrito.productos.push(this.state.producto);
        let total = 0;
        carrito.productos.forEach(function (p) {
            total += (isNaN(p.precio) ? 0 : p.precio);
        });
        carrito.total = total;

        localStorage.carrito = JSON.stringify(carrito);
        console.log(localStorage.getItem('carrito'))


    }

    render() {
        const producto = this.state.producto;
        return (
            <div>
                <div className={'row'}>
                    <div className={'col col-6'}><img src={producto.imagen} alt={'Foto del producto'} style={{width: '100%'}} /></div>
                    <div className={'col col-6'}>
                        <h2>{producto.nombre}</h2>
                        <div>$ {(isNaN(producto.precio) ? 0 : producto.precio).toFixed(2)}</div>
                        <div style={{whiteSpace: 'pre-wrap'}}>{producto.descripcion}</div>
                        <Link to={'/carrito'} onClick={this.agregarAlCarrito} className={'btn btn-primary'}>Añadir al carrito</Link>

                    </div>
                </div>
            </div>
        );
    }
}

export default ProductoDetalle