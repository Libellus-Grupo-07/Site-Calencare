import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Cadastro from "./pages/cadastro/Cadastro";
import Login from "./pages/login/Login";
import NotFound from "./pages/notfound/NotFound";
import CadastroEtapa1 from "./components/cadastro-etapa-1/CadastroEtapa1";
import CadastroEtapa2 from "./components/cadastro-etapa-2/CadastroEtapa2";
import CadastroEtapa3 from "./components/cadastro-etapa-3/CadastroEtapa3";

function Rotas() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cadastro" element={<Cadastro />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound/>} />
          <Route path="cadastroEtapa1" element={<CadastroEtapa1 />} />
          <Route path="cadastroEtapa2" element={<CadastroEtapa2 />} />
          <Route path="cadastroEtapa3" element={<CadastroEtapa3 />} />

          
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Rotas;
