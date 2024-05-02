import React from "react";
import Input from "../../components/input/Input";
import styles from "./CadastroEtapa3.module.css"
import Titulo from "../titulo/Titulo";
import Subtitulo from "../subtitulo/Subtitulo";

const CadastroEtapa3 = () => {
    return (

        <div className={styles["tela-cadastro"]}>
                    <div className={styles["container-cadastro"]}>
                    <p>Informe os dados da <b>usuário</b> para começar a realizar os agendamentos.</p>
                    <Input titulo={"Nome"} ></Input>
                    <Input titulo={"Telefone"}></Input>
                    <Input titulo={"Email"}></Input>
                    <Input titulo={"Senha"} type={"password"}></Input>

                    </div>
                    </div>

);
}

export default CadastroEtapa3;
