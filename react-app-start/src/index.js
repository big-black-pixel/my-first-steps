import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import 'macro-css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <React.StrictMode>
        <BrowserRouter>
           <App /> 
        </BrowserRouter>
    </React.StrictMode>

);


