import React, { useState } from "react";
import Input from "../../components/input/Input";
import styles from "./CadastroEtapa1.module.css"
import { toast } from "react-toastify"; // Importa toast para exibir mensagens de sucesso ou erro

const CadastroEtapa1 = () => {
    const  [razaoSocial, setRazaoSocial] = useState("")
    const  [CNPJ, setCNPJ] = useState("")
    const  [TelefoneDaEmpresa, setTelefoneDaEmpresa] = useState("")
    const  [EmailDaEmpresa, setEmailDaEmpresa] = useState("")

    const alertas = () =>{
       if(razaoSocial.length == 0){
        toast.error("A Razão Social deve ser preenchida")
       }
       if(CNPJ.length == 0){
        toast.error("O CNPJ deve ser preenchido")
       }
       if(TelefoneDaEmpresa.length == 0){
        toast.error("O telefone deve ser preenchido")
       }
       if(EmailDaEmpresa == 0){
        toast.error("O Email da empresa deve ser preenchido")
       }
    }

    return (

        <div className={styles["container-cadastro"]}>
            <Input titulo={"Razão Social"}></Input>
            <Input titulo={"CNPJ"}></Input>
            <Input titulo={"Telefone da Empresa"}></Input>
            <Input titulo={"Email da Empresa"}></Input>

        </div>

    );
}

export default CadastroEtapa1;

