import React, { Component } from "react";
import {
    Route,
    // NavLink,
    HashRouter
} from "react-router-dom";
import Home from "./Home";
import 'bootstrap/dist/css/bootstrap.min.css';

import Productos from "./Admin/Productos";

class Main extends Component {
    render() {
        return(
            <HashRouter>
                <header className={'col'}>
                    <h1>Tienda de Rompecabezas</h1>
                </header>

                <div className={"content container"}>
                    <div className={'row'}>
                        <div className={'col'}>
                    <Route exact path={"/"} component={Home}/>
                    <Route path={"/admin/productos"} component={Productos}/>
                        </div>
                    </div>
                </div>

                <footer className={'text-center'}>© 2019 Curso Fullstack. Marco Camarena</footer>
            </HashRouter>
        );
    }
}

export default Main;