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
                <Input
                    valor={Nome}
                    alterarValor={setNome}
                    titulo={"Nome"}/>
                <Input
                    valor={Telefone}
                    alterarValor={setTelefone}
                    titulo={"Telefone"}
                />
                <Input
                    valor={Email}
                    alterarValor={setEmail}
                    titulo={"Email"}
                />
                <Input
                    valor={Senha}
                    alterarValor={setSenha}
                    titulo={"Senha"}
                    type={"password"}
                />

            </div>
        </div>

    );
}


export default CadastroEtapa4;
