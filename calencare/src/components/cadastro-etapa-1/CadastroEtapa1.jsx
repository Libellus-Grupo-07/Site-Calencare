import React from "react";
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
        <>
            <div className={styles["tela-cadastro"]}>
                <div className={styles["container-cadastro"]}>
                    <Input
                        id="razaoSocial"
                        valor={RazaoSocial}
                        alterarValor={setRazaoSocial}
                        titulo={"Razão Social"}
                        minlength={5}
                        maxlength={50}
                    />
                    <Input
                        id="cnpj"
                        valor={CNPJ}
                        alterarValor={setCNPJ}
                        titulo={"CNPJ"}
                        mascara={"00.000.000/0000-00"}
                        minlength={18}
                        maxlength={18}
                    />
                    <Input
                        id="telefoneEmpresa"
                        valor={TelefoneDaEmpresa}
                        alterarValor={setTelefoneDaEmpresa}
                        titulo={"Telefone da Empresa"}
                        mascara={"(00) 0000-0000"}
                        minlength={14}
                        maxlength={14}

                    />
                    <Input
                        id="emailEmpresa"
                        valor={EmailDaEmpresa}
                        alterarValor={setEmailDaEmpresa}
                        titulo={"Email da Empresa"}
                        regex={"/^[a-z0-9.]+@[a-z0-9]+.[a-z]+(.[a-z]+)?$/i"}
                        minlength={10}
                        maxlength={40}
                    />
                </div>
            </div>
        </>
    );
}

export default CadastroEtapa1;

