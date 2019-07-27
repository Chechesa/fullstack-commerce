import React, { Component } from "react";
import {
    HashRouter
} from "react-router-dom";

class Home extends Component {
    render() {
        return(
            <HashRouter>
                <div>
                    <h2>Catálogo</h2>
                </div>
            </HashRouter>
        );
    }
}

export default Home;