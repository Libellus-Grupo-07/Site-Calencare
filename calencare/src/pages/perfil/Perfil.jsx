import React, { useEffect, useState } from "react";
import styles from "./Perfil.module.css"
import Header from "../../components/header/Header";
import api from "../../api";
import Titulo from './../../components/titulo/Titulo';
import Button from "../../components/button/Button";
import { Delete, IconlyProvider, Logout } from "react-iconly";
import { useNavigate } from "react-router-dom";
import imgPerfil from "./../../utils/assets/perfil_padrao.svg";
import Row from './../../components/row/Row';
import { transformarData } from "../../utils/global";

const Perfil = () => {
    const navigate = useNavigate();

    const idUser = sessionStorage.getItem("idUser");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [dtCriacao, setDtCriacao] = useState("");
    let secaoAtual = sessionStorage.getItem("sessaoPerfil");
    // const [secaoPerfil, setSecaoPerfil] = useState(secaoAtual || "informacoes-empresa");
    const [secaoPerfil, setSecaoPerfil] = useState(secaoAtual || "informacoes-pessoais");

    const mudarSecao = (secao) => {
        setSecaoPerfil(secao);
        sessionStorage.setItem("sessaoPerfil", secao)
    }

    const sair = (url) => {
        sessionStorage.removeItem("idUser");
        sessionStorage.removeItem("sessaoPerfil");
        navigate(url);
    }

    useEffect(() => {
        api.get(`/funcionarios/${idUser}`).then((response) => {
            const { data } = response;
            console.log(response);
            const { nome, email, telefone, dtCriacao } = data;
            setNome(nome);
            setEmail(email);
            setTelefone(telefone);
            setDtCriacao(dtCriacao);
        }).catch((error) => {
            console.log("Houve um erro ao buscar o funcionário");
            console.log(error);
        });
    }, [idUser]);

    return (
        <>
            <section className={styles["section-perfil"]}>
                <div>
                    <Header nomeUser={nome} />
                </div>
                <div className={styles["container-perfil"]}>
                    <div className={styles["content-perfil"]}>
                        <div className={styles["header"]}>
                            <div className={styles["group-button"]}>
                                {/* <Button
                                    cor="branco"
                                    titulo={"Excluir conta"}
                                    icone={
                                        <IconlyProvider
                                            stroke="bold"
                                            size="small"
                                        >
                                            <Delete />
                                        </IconlyProvider>
                                    }
                                /> */}
                                <Button
                                    funcaoButton={() => sair("/login")}
                                    cor={"roxo"}
                                    titulo={"Sair da conta"}
                                    icone={
                                        <IconlyProvider
                                            stroke="bold"
                                            size="small"
                                        >
                                            <Logout />
                                        </IconlyProvider>
                                    }
                                />
                            </div>
                        </div>
                        <div className={styles["informations-perfil"]}>
                            <div className={styles["photo-perfil"]}>
                                <img
                                    src={imgPerfil}
                                    alt="Foto de perfil do usuário"
                                    className={styles["img-perfil"]}
                                />
                            </div>
                            <div className={styles["group-button"]}>
                                {/* <button
                                    onClick={() => mudarSecao("informacoes-empresa")}
                                    className={
                                        styles[
                                        secaoPerfil == "informacoes-empresa" ?
                                            "roxo" : "sem-fundo"
                                        ]

                                    }
                                >
                                    Informações da Empresa
                                </button> */}
                                <button
                                    onClick={() => mudarSecao("informacoes-pessoais")}
                                    className={
                                        styles[
                                        secaoPerfil == "informacoes-pessoais" ?
                                            "roxo" : "sem-fundo"
                                        ]
                                    }
                                >
                                    Informações Pessoais
                                </button>
                            </div>
                            <div className={styles[""]}>
                                <Row
                                    titulo="Nome"
                                    valor={nome}
                                />
                                <Row
                                    titulo="Telefone"
                                    valor={telefone}
                                />
                                <Row
                                    titulo="Email"
                                    valor={email}
                                />
                                <Row
                                    titulo="Data de Cadastro"
                                    valor={transformarData(dtCriacao)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default Perfil;