import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Admin extends Component {
    render() {
        return(
            <div>
                <h2>Panel de administración</h2>
                <nav id={'panel-menu'}>
                    <ul>
                        <li><Link to={'/admin/pedidos'}>Ver pedidos</Link></li>
                        <li><Link to={'/admin/usuarios'}>Ver usuarios registrados</Link></li>
                        <li><Link to={'/admin/productos'}>Administrar productos</Link></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Admin