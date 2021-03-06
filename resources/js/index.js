import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./screens/Home";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
    <BrowserRouter>
        <div className="container">
            <div className="row">
                <h1 className="col-md-12 mt-2 mb-3">Push to Trello</h1>
            </div>
        </div>

        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    </BrowserRouter>,

    document.getElementById("root")
);
