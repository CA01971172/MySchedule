import React from 'react';
import ReactDOM from 'react-dom';
import "./style/app.scss"
import App from "./App";

window.onload = async function(){
    ReactDOM.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>,
        document.getElementById("root")
    );
};