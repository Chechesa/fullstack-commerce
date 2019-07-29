import React, { Component } from "react";
import {
    Route,
    NavLink,
    Link,
    HashRouter
} from "react-router-dom";
import Home from "./Home";
import 'bootstrap/dist/css/bootstrap.min.css';

import Productos from "./Admin/Productos";
import Admin from "./Admin/Admin";
import ProductoDetalle from "./ProductoDetalle";
import Carrito from "./Carrito";
import Checkout from "./Checkout";
import Pedidos from "./Admin/Pedidos";
import Registro from "./Registro";

import Cookies from 'universal-cookie';
const cookies = new Cookies();
console.log(cookies.get('u'));
console.log(cookies.get('t'));

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            carrito: { total: 0,
                productos: []},
        };
    }

    componentDidMount() {
        if (localStorage.getItem('carrito') === null) {
            let carrito = { total: 0, productos: [] }
            localStorage.setItem('carrito', JSON.stringify(carrito));
            this.setState({carrito: carrito});
            // localStorage.carrito = { total: 0, productos: []}
        } else {
            this.setState({carrito: JSON.parse(localStorage.carrito)})
        }
    }

    render() {
        return(
            <HashRouter>
                <header>
                    <div className={'col'}><h1>Tienda de Rompecabezas 3D</h1></div>
                    <nav>
                        <ul>
                            <li><NavLink to={'/'}>Inicio</NavLink></li>
                            <li><NavLink to={'/carrito'}>Carrito{(this.state.carrito.productos.length <= 0 ? '' : ' ('+this.state.carrito.productos.length+')')}</NavLink></li>
                            <li><NavLink to={'/registro'}>Únete</NavLink></li>
                        </ul>
                    </nav>
                </header>

                <div className={"content container"}>
                    <div className={'row'}>
                        <div className={'col'}>
                            <Route exact path={"/"} component={Home}/>
                            <Route path={"/carrito"} component={Carrito}/>
                            <Route path={"/checkout"} component={Checkout}/>
                            <Route path={"/registro"} component={Registro}/>
                            <Route path={"/producto/:id"} component={ProductoDetalle}/>
                            <Route path={"/admin"} component={Admin}/>
                            <Route path={"/admin/pedidos"} component={Pedidos}/>
                            <Route path={"/admin/productos"} component={Productos}/>
                        </div>
                    </div>
                </div>

                <footer className={'text-center'}>
                    <p>© 2019 Curso Fullstack. Marco Camarena</p>
                    <p><Link to={'/admin'}>¿Quieres administrar?</Link></p>
                </footer>
            </HashRouter>
        );
    }
}

export default Main;