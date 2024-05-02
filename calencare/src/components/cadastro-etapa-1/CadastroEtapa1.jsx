import React from "react";
import Input from "../../components/input/Input";
import styles from "./CadastroEtapa1.module.css"

const CadastroEtapa1 = () => {
    return (

        <div className={styles["tela-cadastro"]}>
                    <div className={styles["container-cadastro"]}>
                    <p>Informe os dados da <b>empresa</b> para começar a realizar os agendamentos.</p>
                        <Input titulo={"Razão Social"}></Input>
                        <Input titulo={"CNPJ"}></Input>
                        <Input titulo={"Telefone da Empresa"}></Input>
                        <Input titulo={"Email da Empresa"}></Input>
                        
                    </div>
                </div>

    );
}

export default CadastroEtapa1;

