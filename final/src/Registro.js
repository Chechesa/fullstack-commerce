import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const bcrypt = require('bcryptjs');

class Registro extends Component {
    constructor(props) {
        super(props);

        this.registrarUsuario = this.registrarUsuario.bind(this);
        this.onChangeUsuario = this.onChangeUsuario.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            usuario: '',
            email: '',
            password: ''
        }

    }

    onChangeUsuario(e) {
        this.setState({
            usuario: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    registrarUsuario(e) {
        e.preventDefault();

        let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let token = '';
        for(var i = 0; i < 64; i++) {
            token += chars[Math.floor(Math.random() * chars.length)];
        }

        String.prototype.hashCode = function() {
            var hash = 0, i, chr;
            if (this.length === 0) return hash;
            for (i = 0; i < this.length; i++) {
                chr   = this.charCodeAt(i);
                hash  = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }
            return hash;
        };

        const obj = {
            usuario: this.state.usuario,
            email: this.state.email,
            password: bcrypt.hashSync(this.state.password, 10),
            token: token
        };

        axios.post('http://localhost:4000/usuarios/agregar', obj)
            .then(res => {
                let future = new Date();
                future.setDate(future.getDate() + 1000*3600*24*14);
                cookies.set('u', obj.usuario, { path: '/', expires: future})
                cookies.set('t', obj.token, { path: '/', expires: future})
            })

    }

    render() {
        return (
            <div>
                <h2>Crea una cuenta</h2>

                <div>
                <form onSubmit={this.registrarUsuario}>
<div>
    <div className={'form-group'}>
        <input
            type={'text'}
            name={'usuario'}
            placeholder={'Usuario'}
            className={'form-control'}
            value={this.state.usuario}
            onChange={this.onChangeUsuario}
            required/>
    </div>
    <div className={'form-group'}>
        <input
            type={'email'}
            name={'email'}
            placeholder={'Correo electrónico'}
            className={'form-control'}
            value={this.state.email}
            onChange={this.onChangeEmail}
            required/>
    </div>
    <div className={'form-group'}>
        <input
            type={'password'}
            name={'password'}
            placeholder={'Contraseña'}
            className={'form-control'}
            value={this.state.password}
            onChange={this.onChangePassword}
            required/>
    </div>
    <div className={'text-center'}>
    <button className={'btn btn-primary'}>Crear cuenta</button>
    </div>

</div>
                </form>
                </div>
                <div className={'text-center'} style={{marginTop: 30}}>
                    <p><Link to={'/login'}>¿Ya tienes una cuenta?</Link></p>
                </div>
                <div className={'text-center'} style={{marginTop: 100}}>
                    <p><Link to={'/login'}>¿Eres administrador?<br />(Enlace con fines académicos)</Link></p>
                </div>
            </div>
        );
    }
}

export default Registro;