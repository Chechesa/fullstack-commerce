import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ProductoRow extends Component {
    constructor(props) {
        super(props);
        this.borrarProducto = this.borrarProducto.bind(this);
        this.actualizarProducto = this.actualizarProducto.bind(this);

        this.onChangeProductoExistencia = this.onChangeProductoExistencia.bind(this);

        this.state = {
            existencia: this.props.producto.existencia
        }
    }

    onChangeProductoExistencia(e) {
        this.setState({
            existencia: e.target.value

        });
    }


    borrarProducto() {
        axios.get('http://localhost:4000/productos/borrar/'+this.props.producto._id)
            .then(() => {
                console.log('Borrado');
                window.location.reload()
            })
            .catch(err => console.log(err));
    }

    actualizarProducto() {
        const obj = this.props.producto;
        obj.existencia = this.state.existencia
        axios.post('http://localhost:4000/productos/actualizar/'+this.props.producto._id, obj)
            .then(res => {
                console.log(res.data);
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <tr key={this.props.producto._id}>
                <td>{this.props.producto.sku}<br/>{this.props.producto.nombre}</td>
                <td>{this.props.producto.descripcion}</td>
                <td>{this.props.producto.imagen}</td>
                <td>
                    <input type={'hidden'} name={'_id'} value={this.props.producto._id} />
                    <input name={'existencia'}
                           value={this.state.existencia}
                           onChange={this.onChangeProductoExistencia}
                    />
                    <button onClick={this.actualizarProducto} className={'btn btn-primary'}>Actualizar</button>

                </td>
                <td><button onClick={this.borrarProducto} className={'btn btn-danger'}>Borrar</button></td>
            </tr>
        );
    }

}

export default ProductoRow;