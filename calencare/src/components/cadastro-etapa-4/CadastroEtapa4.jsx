import React, { useState } from "react";
import Input from "../../components/input/Input";
import styles from "./CadastroEtapa4.module.css"
import { toast } from "react-toastify";

const CadastroEtapa4 = ({
   Nome, setNome,
   Telefone, setTelefone,
   Email, setEmail,
   Senha, setSenha
}) => {

    return (

        <div className={styles["tela-cadastro"]}>
                    <div className={styles["container-cadastro"]}>
                    <Input valor={Nome} validarEntrada={setNome} titulo={"Nome"} ></Input>
                    <Input valor={Telefone} validarEntrada={setTelefone} titulo={"Telefone"}></Input>
                    <Input valor={Email} validarEntrada={setEmail} titulo={"Email"}></Input>
                    <Input valor={Senha} validarEntrada={setSenha} titulo={"Senha"} type={"password"}></Input>

                    </div>
                    </div>

);
}


export default CadastroEtapa4;
