import React, { useState } from "react";
import Input from "../input/Input";
import styles from "./CadastroEtapa2.module.css"
import { toast } from "react-toastify"; // Importa toast para exibir mensagens de sucesso ou erro

const CadastroEtapa2 = ({
    Cep, setCep,  
    Logradouro, setLogradouro,
    Bairro, setBairro,
    Cidade, setCidade,
    UF, setUF,
    Numero, setNumero,
    Complemento, setComplemento  
}) => {
    
    return (

        <div className={styles["tela-cadastro"]}>
            <div className={styles["container-cadastro"]}>
            <Input valor={Cep} alterarValor={setCep} titulo={"Cep"}></Input>
                <Input valor={Logradouro} alterarValor={setLogradouro} titulo={"Logradouro"}></Input>
                <div className={styles["container-adrress"]}>
                    <Input valor={Numero} alterarValor={setNumero} titulo={"Número"}></Input>
                    <Input valor={Complemento} alterarValor={setComplemento} titulo={"Complemento"}></Input>
                </div>
                <Input valor={Bairro} alterarValor={setBairro} titulo={"Bairro"}></Input>
                <div className={styles["container-adrress"]}>
                <Input valor={Cidade} alterarValor={setCidade} titulo={"Cidade"}></Input>
                <div className={styles["uf"]}>
                <Input valor={UF} alterarValor={setUF} titulo={"UF"}></Input>
                </div>
                </div>
               


            </div>
        </div>

    );
}


export default CadastroEtapa2;

