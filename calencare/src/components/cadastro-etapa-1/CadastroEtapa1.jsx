import React, { useState } from "react";
import Input from "../../components/input/Input";
import styles from "./CadastroEtapa1.module.css"
import { inputSomenteTexto, inputSemCaracteresEspeciais, inputSomenteNumero } from "../../utils/global";

const CadastroEtapa1 = ({
    RazaoSocial, setRazaoSocial,
    CNPJ, setCNPJ,
    TelefoneDaEmpresa, setTelefoneDaEmpresa,
    EmailDaEmpresa, setEmailDaEmpresa

}
) => {

    return (
        <>
            <div className={styles["tela-cadastro"]}>
                <div className={styles["container-cadastro"]}>
                    <Input
                        id="razaoSocial"
                        valor={RazaoSocial}
                        alterarValor={setRazaoSocial}
                        titulo={"Razão Social"}
                    />
                    <Input
                        id="cnpj"
                        valor={CNPJ}
                        alterarValor={setCNPJ}
                        titulo={"CNPJ"}
                        mascara={"00.000.000/0000-00"}
                    />
                    <Input
                        id="telefoneEmpresa"
                        valor={TelefoneDaEmpresa}
                        alterarValor={setTelefoneDaEmpresa}
                        titulo={"Telefone da Empresa"}
                        mascara={"(00) 0000-0000"}

                    />
                    <Input
                        id="emailEmpresa"
                        valor={EmailDaEmpresa}
                        alterarValor={setEmailDaEmpresa}
                        titulo={"Email da Empresa"}
                    />
                </div>
            </div>
        </>
    );
}

export default CadastroEtapa1;

