import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Cadastro from "./pages/cadastro/Cadastro";
import Login from "./pages/login/Login";
import NotFound from "./pages/notfound/NotFound";
import Inicio from "./pages/inicio/Inicio";
import Perfil from "./pages/perfil/Perfil";
import EditarPerfil from "./pages/editar-perfil/EditarPerfil";
import Servicos from "./pages/servicos/Servicos";
import Clientes from "./pages/clientes/Clientes";
import AdicionarServico from './pages/adicionar-servico/AdicionarServico';

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
          <Route path="servicos" element={<Servicos />} />
          <Route path="adicionar-servicos" element={<AdicionarServico />} />
          <Route path="servicos/:idServico" element={<AdicionarServico />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="perfil/:idUser" element={<Perfil />} />
          <Route path="editar-perfil/:idUser" element={<EditarPerfil />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Rotas;
