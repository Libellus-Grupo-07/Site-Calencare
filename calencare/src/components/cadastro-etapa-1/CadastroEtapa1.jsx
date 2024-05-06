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
                        valor={RazaoSocial}
                        alterarValor={setRazaoSocial}
                        titulo={"Razão Social"}
                        validarEntrada={(e) => inputSomenteTexto(e)}
                    />
                    <Input
                        valor={CNPJ}
                        alterarValor={setCNPJ}
                        titulo={"CNPJ"}
                        validarEntrada={(e) => inputSomenteNumero(e)}
                    />
                    <Input
                        valor={TelefoneDaEmpresa}
                        alterarValor={setTelefoneDaEmpresa}
                        titulo={"Telefone da Empresa"}
                        validarEntrada={(e) => inputSomenteNumero(e)}

                    />
                    <Input
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

