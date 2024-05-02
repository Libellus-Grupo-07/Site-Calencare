import React from "react";
import Input from "../input/Input";
import styles from "./CadastroEtapa2.module.css"

const CadastroEtapa2 = () => {
    return (

        <div className={styles["tela-cadastro"]}>
                    <div className={styles["container-cadastro"]}>
                    <p>Informe os dados da <b>empresa</b> para começar a realizar os agendamentos.</p>
                        <Input titulo={"Logradouro"}></Input>
                        <Input titulo={"Bairro"}></Input>
                        <Input titulo={"Cidade"}></Input>
                        <Input titulo={"Estado"}></Input>
                        <div className={styles["container-adrress"]}>
                            <Input titulo={"Número"}></Input>
                            <Input titulo={"Complemento"}></Input>
                        </div>

                        
                    </div>
                </div>

    );
}

export default CadastroEtapa2;

