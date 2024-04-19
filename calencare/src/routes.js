import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Cadastro from "./pages/cadastro/Cadastro";
import Login from "./pages/login/Login";

const Rotas = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="cadastro" element={<Cadastro />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </>  
    );
}

export default Rotas;