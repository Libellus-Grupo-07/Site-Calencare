import React from "react";
import { toast } from "react-toastify"; // Importa toast para exibir mensagens de sucesso ou erro
import styles from "./Login.module.css";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import Logo from "../../components/logo/Logo";
import Imagem from "../../utils/assets/login.svg"
import { HiOutlineArrowLeft } from "react-icons/hi";


const Login = () => {
    return (
        <>
            <div className={styles["tela-login"]}>
                <div className={styles["formulario-login"]}>
                    <h1> Login </h1>
                    <p>Entre em sua conta para começar a realizar os agendamentos.</p>
                    <div className={styles["container-cadastro"]}>
                        <Input titulo={"Email"}></Input>
                        <Input titulo={"Senha"} type={"password"}></Input>
                    </div>
                </div>
                <div className={styles["container-imagem-login"]}>
                    <div className={styles["logo-cadastro"]}>
                        <Logo /></div>
                    <img className={styles["imagem-cadastro"]} src={Imagem} alt="imagem cadastro" />
                </div>
                <div className={styles["container-buttons"]}>
                    <Button titulo="Voltar" cor={"branco"} icone={<HiOutlineArrowLeft />}></Button>
                    <Button titulo="Avançar" cor={"roxo"}  ></Button>
                </div>
            </div>


        </>
    )
}

export default Login;