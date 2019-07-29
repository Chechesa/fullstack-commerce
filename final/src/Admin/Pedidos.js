import React, { Component } from 'react';
import axios from 'axios';
import PedidoRow from "./PedidoRow";

class Pedidos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    render() {
        return (
            <div>
                <h2>Pedidos</h2>
                {this.state.data.length <= 0 ?
                    <div>No se han realizado pedidos todavía</div>
                    : this.state.data.map((pedido, i) => (
                        <PedidoRow pedido={pedido} key={i} />
                    ))
                }
            </div>
        )
    }

    componentDidMount() {
        axios.get('http://localhost:4000/pedidos')
            .then(res => {
                this.setState({ data: res.data });
            })
            .catch(err => {
                console.log(err);
            })
    }

}

export default Pedidos;