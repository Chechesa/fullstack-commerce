import React, { Component } from "react";
import {
    HashRouter,
    Link
} from "react-router-dom";
import axios from 'axios';
import CatalogoRow from "./CatalogoRow";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }


    render() {
        return(
            <HashRouter>
                <div>
                    <h2>Catálogo</h2>
                    <div id={'catálogo'} className={'container'}>
                        <div className={'row'}>
                        {this.state.data.length <= 0
                            ? <div>Aún no hay productos para mostrar</div>
                            : this.state.data.map((producto, i) => (
                                <CatalogoRow producto={producto} key={i} />
                            ))
                        }
                        </div>
                    </div>
                </div>
            </HashRouter>
        );
    }

    componentDidMount() {
        axios.get('http://localhost:4000/productos')
            .then((res) => {
                this.setState({data: res.data});
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

export default Home;