import React from "react";
import Logo from "../../components/logo/Logo";
import { useNavigate } from "react-router-dom";
import Titulo from "../../components/titulo/Titulo";

const Inicio = () => {
    const navigate = useNavigate();

    return (
        <>
            <Logo
                onClick={navigate("")}
            />
            <Titulo titulo={"Página Inicial"}/>
        </>
    )
}

export default Inicio;