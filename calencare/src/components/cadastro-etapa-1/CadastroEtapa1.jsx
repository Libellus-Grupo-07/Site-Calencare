import React, { useState } from "react";
import Input from "../../components/input/Input";
import styles from "./CadastroEtapa1.module.css"


const CadastroEtapa1 = ({
RazaoSocial, setRazaoSocial,
CNPJ, setCNPJ,
TelefoneDaEmpresa, setTelefoneDaEmpresa,
EmailDaEmpresa, setEmailDaEmpresa

}
) => {

    return (

        <div className={styles["container-cadastro"]}>
            <Input valor={RazaoSocial} alterarValor={setRazaoSocial } titulo={"Razão Social"}></Input>
            <Input valor={CNPJ } alterarValor={ setCNPJ} titulo={"CNPJ"}></Input>
            <Input valor={ TelefoneDaEmpresa} alterarValor={ setTelefoneDaEmpresa} titulo={"Telefone da Empresa"}></Input>
            <Input valor={ EmailDaEmpresa} alterarValor={ setEmailDaEmpresa} titulo={"Email da Empresa"}></Input>

        </div>

    );
}

export default CadastroEtapa1;

