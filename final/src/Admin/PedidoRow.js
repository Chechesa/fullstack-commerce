import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PedidoRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div key={this.props.pedido._id}>
                <div><strong>ID:</strong> {this.props.pedido._id}</div>
                <div><strong>Usuario:</strong> {this.props.pedido.usuario}</div>
                <div><strong>E-mail del usuario:</strong> {this.props.pedido.email}</div>
                <div><strong>Total:</strong> {this.props.pedido.total}</div>
                {this.props.pedido.productos.map((p, i) => (
                    <div><strong>Producto {i+1}:</strong> <Link to={'/producto/'+p._id} target={'_blank'}>{p.nombre}</Link></div>
                ))}
                <hr />
            </div>
        )
    }
}

export default PedidoRow;