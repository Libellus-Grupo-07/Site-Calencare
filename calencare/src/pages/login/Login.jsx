import React from "react";
import { toast } from "react-toastify"; // Importa toast para exibir mensagens de sucesso ou erro
import styles from "./Login.module.css";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import Logo from "../../components/logo/Logo";
import Imagem from "../../utils/assets/login.svg"
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import imgFundo from './../../utils/assets/bolinha_login.svg';
import imgFundoImagem from './../../utils/assets/bolinha_imagem_login.svg';

const Login = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles["tela-login"]}>
                <div className={styles["formulario-login"]}>
                    <div className={styles["background"]}>
                        <img src={imgFundo} alt="bolinhas de fundo" />
                    </div>
                    <div className={styles["text"]}>
                        <h1> Entrar </h1>
                        <p>Entre com os dados da sua <b>conta</b> para começar a realizar os agendamentos.</p>
                    </div>
                    <div className={styles["form"]}>
                        <div className={styles["container-login"]}>
                            <Input titulo={"Email"} type="email"></Input>
                            <Input titulo={"Senha"} type={"password"}></Input>
                        </div>
                        <div className={styles["container-buttons"]}>
                            <Button funcaoButton={() => navigate(-1)} titulo="Voltar" cor={"branco"} icone={<HiOutlineArrowLeft />}></Button>
                            <Button titulo="Entrar" cor={"roxo"}  ></Button>
                        </div>
                    </div>
                    <div className={styles["text-cadastre-se"]}>
                        <span>
                            Não possui uma conta? <b className={styles["link-cadastre-se"]} onClick={() => navigate("/cadastro")}> Cadastre-se
                            </b>
                        </span>
                    </div>
                </div>
                <div className={styles["container-imagem-login"]}>
                    <div className={styles["background-imagem"]}>
                        <img src={imgFundoImagem} alt="bolinhas de fundo" />
                    </div>
                    <div className={styles["logo-login"]} onClick={() => navigate("/")}>
                        <Logo /></div>
                    <img className={styles["imagem-login"]} src={Imagem} alt="imagem login" />
                </div>
            </div >
        </>
    )
}

export default Login;