import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CatalogoRow extends  Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div key={this.props.producto._id} className={'col col-3'}>
                <div><Link to={'/producto/'+this.props.producto._id}><img src={this.props.producto.imagen} style={{width: '100%'}} /></Link></div>
                <div>$ {(isNaN(this.props.producto.precio) ? 0 : this.props.producto.precio).toFixed(2)}</div>
                <div><Link to={'/producto/'+this.props.producto._id}>{this.props.producto.nombre}</Link></div>
            </div>
        )
    }
}

export default CatalogoRow;