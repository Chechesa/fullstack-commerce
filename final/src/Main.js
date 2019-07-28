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
                <header className={'col'}>
                    <div><h1>Tienda de Rompecabezas</h1></div>
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
                            <Route path={"/admin"} component={Admin}/>
                            <Route path={"/carrito"} component={Carrito}/>
                            <Route path={"/producto/:id"} component={ProductoDetalle}/>
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