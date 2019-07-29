import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Checkout extends Component {
    constructor(props) {
        super(props);

        this.realizarPedido = this.realizarPedido.bind(this);

        this.state = {
            pedido: {
                usuario: '',
                email: '',
                productos: [{
                    sku: '',
                    nombre: '',
                    descripcion: '',
                    imagen: '',
                    precio: '',
                }],
                total: 0
            }
        }
    }

    realizarPedido() {
        let pedido = JSON.parse(localStorage.carrito);
        if (cookies.get('u') != 'undefined') {
            pedido.usuario = cookies.get('u');
        } else {
            pedido.usuario = '';
        }
        pedido.email = '';

        this.setState({pedido: pedido});

        let carrito = JSON.parse(localStorage.carrito);
        carrito.total = 0;
        carrito.productos = [];
        localStorage.carrito = JSON.stringify(carrito);

        if (pedido.productos.length > 0) {
        axios.post('http://localhost:4000/pedidos/agregar', pedido)
            .then(res => {
                console.log(res.data);
            })
        }
    }

    render() {
        return (
            <div>
                <h2>Tu pedido se ha realizado</h2>
                <div>
                    <p className={'text-center'}><img src={'/img/thank-you.gif'} style={{maxWidth: '100%'}} alt={'Gracias'} /></p>
                    <p>Se han enviado los detalles de tu pedido a tu correo electrónico <em>«esto aún no lo hace el sistema»</em></p>
                    <p>Recuerda realizar tu depósito en banco Citibanamex a la cuenta 1234 587893152</p>
                    <p>La cantidad que debes depositar es de: <strong>$ {this.state.pedido.total.toFixed(2)}</strong></p>
                    <p>Recuerda que tienes 10 días para realizar tu depósito, de lo contrario, tu pedido se cancelará.</p>
                </div>


            </div>
        );
    }

    componentDidMount() {
        this.realizarPedido();
    }

}

export default Checkout;