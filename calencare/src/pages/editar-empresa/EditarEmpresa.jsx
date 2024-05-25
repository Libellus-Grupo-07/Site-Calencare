import React, { useEffect, useState } from "react";
import styles from "./EditarEmpresa.module.css"
import Header from "../../components/header/Header";
import api from "../../api";
import Titulo from '../../components/titulo/Titulo';
import Button from "../../components/button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { inputSomenteNumero, inputSomenteTexto, logado } from "../../utils/global";
import Input from "../../components/input/Input";
import { FaCheck } from "react-icons/fa6";
import { TiCancel } from "react-icons/ti";
import { toast } from "react-toastify";

const EditarEmpresa = () => {
    const navigate = useNavigate();

    const { idEmpresa } = useParams();
    const [nome, setNome] = useState("");
    const [nomeUser, setNomeUser] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [dtCriacao, setDtCriacao] = useState("");
    const [empresa, setEmpresa] = useState({});

    const voltar = () => {
        navigate(`/perfil/${idEmpresa}`);
    }

    const editar = () => {
        let body = {
            "id": idEmpresa,
            "nome": nome,
            email,
            telefone,
            dtCriacao,
            empresa
        }
        api.put(`/empresas/${idEmpresa}`, body).then((response) => {
            console.log(response);
            toast.success("Informações atualizadas com sucesso!")
            voltar();
        }).catch((error) => {
            console.log("Houve um erro ao atualizar o funcionário");
            console.log(error);
        });
    }

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }
        api.get(`/empresas/${idEmpresa}`).then((response) => {
            const { data } = response;
            console.log(response);
            const { nome, email, telefone, dtCriacao, empresa } = data;
            setNome(nome);
            setNomeUser(nome)
            setEmail(email);
            setTelefone(telefone);
            setDtCriacao(dtCriacao);
            setEmpresa(empresa);
        }).catch((error) => {
            console.log("Houve um erro ao buscar o funcionário");
            console.log(error);
        });
    }, [idEmpresa]);

    return (
        <>
            <section className={styles["section-Empresa"]}>
                <div>
                    <Header nomeUser={nomeUser} />
                </div>
                <div className={styles["container-Empresa"]}>
                    <div className={styles["content-Empresa"]}>
                        <div className={styles["header"]}>
                            <Titulo
                                tamanho={"md"}
                                titulo={"Editar Informações Pessoais"}
                            />
                        </div>
                        <div className={styles["informations-Empresa"]}>
                            <Input
                                tamanho={"lg"}
                                valor={nome}
                                alterarValor={setNome}
                                titulo={"Nome"}
                                validarEntrada={(e) => inputSomenteTexto(e)}
                            />
                            <Input
                                tamanho={"lg"}
                                valor={telefone}
                                alterarValor={setTelefone}
                                titulo={"Telefone"}
                                mascara={"(00) 00000-0000"}
                                validarEntrada={(e) => inputSomenteNumero(e)}
                            />
                            <Input
                                tamanho={"lg"}
                                valor={email}
                                alterarValor={setEmail}
                                titulo={"Email"}

                            />
                            <Input
                                tamanho={"lg"}
                                valor={"Administrador"}
                                readonly={true}
                                titulo={"Empresa"}
                            />
                        </div>
                        <div className={styles["group-button"]}>
                            <Button
                                titulo={"Cancelar"}
                                cor={"branco"}
                                funcaoButton={() => voltar()}
                                icone={
                                    <div style={{
                                        fontSize: "18px",
                                        display: "flex",
                                        alignItens: "center",
                                        justifyContent: "center"
                                    }}>
                                        <TiCancel />
                                    </div>
                                } />
                            <Button
                                titulo={"Editar"}
                                icone={<FaCheck />}
                                cor={"roxo"}
                                funcaoButton={() => editar()}
                            />
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default EditarEmpresa;