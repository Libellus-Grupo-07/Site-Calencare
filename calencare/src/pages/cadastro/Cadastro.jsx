import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import styles from "./Cadastro.module.css"
import { HiOutlineArrowLeft } from "react-icons/hi";
import Imagem from "../../utils/assets/cadastro.svg";
import Logo from "../../components/logo/Logo";
import CadastroEtapa1 from "../../components/cadastro-etapa-1/CadastroEtapa1";
import CadastroEtapa2 from "../../components/cadastro-etapa-2/CadastroEtapa2";
import CadastroEtapa3 from "../../components/cadastro-etapa-3/CadastroEtapa3";
import CadastroEtapa4 from "../../components/cadastro-etapa-4/CadastroEtapa4";

// hooks
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
    const formComponents = [<CadastroEtapa1 />, <CadastroEtapa2 />, <CadastroEtapa3 />, <CadastroEtapa4 />]

    const { currentStep, currentComponent, changeStep, isLastStep } = useForm(formComponents)

    const navigate = useNavigate()

    return (
        <>
            <div>
                <div className={styles["tela-cadastro"]}>
                    <div className={styles["container-imagem-cadastro"]}>
                        {/* <div><Navbar/></div> */}
                        <div className={styles["logo-cadastro"]}><Logo /></div>
                        <img className={styles["imagem-cadastro"]} src={Imagem} alt="imagem cadastro" />
                    </div>
                    <div className={styles["formulario-cadastro"]}>
                        <div className={styles["engloba-formulario"]}>
                            <div className="texto">
                                <h1> Cadastro </h1>
                                <p>Informe os {currentStep == 2 ? "dias" : "dados"} da <b>{currentStep < 2 ? "empresa" : currentStep == 2 ? "funcionamento" : "usuário"}</b> para começar a realizar os agendamentos.</p>
                            </div>
                            <div className={styles["inputs-container"]}>
                                <div className={styles["form"]}>
                                    {currentComponent}
                                </div>
                                <div className={styles["container-buttons"]}>
                                    <Button funcaoButton={() => changeStep(currentStep - 1, null)} titulo="Voltar" cor={"branco"} icone={<HiOutlineArrowLeft />}></Button>
                                    {!isLastStep ? (
                                        <Button funcaoButton={(e) => changeStep(currentStep + 1, e)} titulo="Avançar" cor={"roxo"}  ></Button>) : (
                                        <Button titulo="Cadastrar" cor={"roxo"}  ></Button>)}
                                </div>
                            </div>

                            <div className={styles["text-entrar"]}>
                                <span>Já possui uma conta? <b className={styles["link-entrar"]} onClick={() => navigate("/login")}>Entrar</b></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default Cadastro;