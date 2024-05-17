import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import api from "../../api";
import { AddUser, Edit, IconlyProvider } from "react-iconly";
import Button from "../../components/button/Button";
import Titulo from "../../components/titulo/Titulo";
import Input from "../../components/input/Input";
import styles from "./CadastroFuncionario.module.css";
import Ul from "../../components/ul/Ul";
import { TickSquare } from "react-iconly"

const CadastroFuncionario = () => {
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const items = [
        <TickSquare />, "Coloração",
        <TickSquare />, "Hidratação",
        <TickSquare />, "Pé e Mão ",
        <TickSquare />, "Corte",
        <TickSquare />, "Maquiagem ",
        <TickSquare />, "Unha de Gel",
        <TickSquare />, "Depilação",
        <TickSquare />, "Massagem"


    ]
    return (
        <>
            <div>
                <div>
                    <Header nomeUser={nome} />
                </div>
                <div className={styles["componet-input"]}>

                    <Titulo tamanho={"md"} titulo={`Adicionar Profissional`} />
                    <div className={styles["block-nome"]}>
                        <Input
                            id="nome"
                            valor={nome}
                            alterarValor={setNome}
                            titulo={"Nome"}
                        />
                        <Input
                            id="sobrenome"
                            valor={sobrenome}
                            alterarValor={setSobrenome}
                            titulo={"Sobrenome"}
                        />
                    </div>
                    <Input
                        id="email"
                        valor={email}
                        alterarValor={setEmail}
                        titulo={"Email"}
                    />
                    <Input
                        id="senha"
                        valor={senha}
                        alterarValor={setSenha}
                        titulo={"Senha"}
                    />


                    <Ul
                        titulo={"Serviços que realiza"}
                        items={items}
                    />
                </div>
            </div>

        </>
    )
}
export default CadastroFuncionario;