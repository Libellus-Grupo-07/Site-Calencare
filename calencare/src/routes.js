import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Cadastro from "./pages/cadastro/Cadastro";
import Login from "./pages/login/Login";
import NotFound from "./pages/notfound/NotFound";
import CadastroEtapa1 from "./components/cadastro-etapa-1/CadastroEtapa1";
import CadastroEtapa2 from "./components/cadastro-etapa-2/CadastroEtapa2";
import CadastroEtapa3 from "./components/cadastro-etapa-3/CadastroEtapa3";
import CadastroEtapa4 from "./components/cadastro-etapa-4/CadastroEtapa4";
import Inicio from "./pages/inicio/Inicio";
import Perfil from "./pages/perfil/Perfil";

function Rotas() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound/>} />
          <Route path="cadastro" element={<Cadastro />} />
          <Route path="login" element={<Login />} />
          <Route path="inicio" element={<Inicio />} />
          <Route path="perfil" element={<Perfil />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Rotas;
