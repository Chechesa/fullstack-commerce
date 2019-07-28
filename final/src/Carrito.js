import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductoRow from "./Admin/ProductoRow";

class Carrito extends Component {
    constructor(props) {
        super(props)

        this.realizarPedido = this.realizarPedido.bind(this);
        this.vaciarCarrito = this.vaciarCarrito.bind(this);

        this.state = {
            carrito: { total: 0,
            productos: []},
        };
    }

    componentDidMount() {
        this.setState({ carrito: JSON.parse(localStorage.getItem('carrito')) })
    }

    vaciarCarrito() {
        let carrito = JSON.parse(localStorage.carrito);
        carrito.total = 0;
        carrito.productos = [];
        localStorage.carrito = JSON.stringify(carrito);
        window.location.reload();
    }

    realizarPedido() {

    }

    render() {
        return (
            <div id={'carrito'}>
                <h2>Carrito</h2>
                {this.state.carrito.productos.length <= 0 ? '' :
                    <div>
                        <div className={'text-right'}><Link to={'/'}>Continuar comprando</Link> <button onClick={this.realizarPedido}>Realizar pedido</button></div>
                    </div>
                }
                {this.state.carrito.productos.length <= 0
                    ? <div>El carrito está vacío</div>
                    : this.state.carrito.productos.map((producto, i) => (
                        <div producto={producto} key={i}>
                            <div><strong>{producto.nombre}</strong></div>
                        <div>
                        <div className={'col'}></div>
                    <div className={'col text-right'}>$ {(isNaN(producto.precio) ? 0 : producto.precio).toFixed(2)}</div>
                    </div>
                        </div>
                    ))}
                    <hr />
                <div><Link onClick={this.vaciarCarrito}>Vaciar carrito</Link></div>
                <div className={'col text-right'}><strong>Total: $ {this.state.carrito.total.toFixed(2)}</strong></div>
            </div>
        );
    }
}

export default Carrito;