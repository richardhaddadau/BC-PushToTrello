import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './screens/home';
import ListOfThings from './screens/list';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render((
    <BrowserRouter>
        <div>
            <nav className="container">
                <ul className="nav mt-2 mb-2">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/list">List</Link>
                    </li>
                </ul>
            </nav>

            <Routes>
                <Route path='/list' element={ <ListOfThings/> } />
                <Route path='/' element={ <Home/> } />
            </Routes>
        </div>
    </BrowserRouter>
), document.getElementById('root'));
