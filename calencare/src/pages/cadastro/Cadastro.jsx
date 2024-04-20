import React from "react";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import styles from "./Cadastro.module.css"
import { HiOutlineArrowLeft } from "react-icons/hi";

const Cadastro = () => {
    return (
        <>
            <h1> Cadastro </h1>
            <p>Informe os dados da <b>empresa</b> para começar a realizar os agendamentos.</p>
            <div className={styles["container-cadastro"]}>
            <Input titulo={"Razão Social"}></Input>
            <Input titulo={"CNPJ"}></Input>
            <Input titulo={"CEP"}></Input>
            <div className={styles["container-adrress"]}>
            <Input titulo={"Número"}></Input>
            <Input titulo={"Complemento"}></Input>
            </div>
            <div className={styles["container-buttons"]}>
            <Button titulo="Voltar" cor={"branco"} icone={<HiOutlineArrowLeft/>}></Button>
            <Button titulo="Avançar" cor={"roxo"}  ></Button>
            </div>
            </div>

            



        </>
    );
}

export default Cadastro;