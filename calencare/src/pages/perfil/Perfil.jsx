import React, { useEffect, useState } from "react";
import styles from "./Perfil.module.css"
import Header from "../../components/header/Header";
import api from "../../api";
import Button from "../../components/button/Button";
import { Delete, IconlyProvider, Logout } from "react-iconly";
import { useNavigate, useParams } from "react-router-dom";
import imgPerfil from "./../../utils/assets/perfil_padrao.svg";
import Row from './../../components/row/Row';
import { logado, logoutUsuario, transformarData } from "../../utils/global";
import Swal from 'sweetalert2'

const Perfil = () => {

    const navigate = useNavigate();

    const { idUser } = useParams();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [dtCriacao, setDtCriacao] = useState("");

    const [idEmpresa, setIdEmpresa] = useState(0);
    const [razaoSocial, setRazaoSocial] = useState("")
    const [cnpj, setCNPJ] = useState("")
    const [telefonePrincipal, setTelefonePrincipal] = useState("")
    const [emailPrincipal, setEmailPrincipal] = useState("")

    const [secaoPerfil, setSecaoPerfil] = useState(sessionStorage.getItem("sessaoPerfil") || "informacoes-pessoais");

    const mudarSecao = (secao) => {
        setSecaoPerfil(secao);
        sessionStorage.setItem("sessaoPerfil", secao)
    }

    const sair = (url) => {
        logoutUsuario();
        sessionStorage.removeItem("sessaoPerfil");
        sessionStorage.removeItem("token");
        navigate(url);
    }

    const excluir = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn-roxo",
                cancelButton: "btn-branco",
                title: "title-modal",
                text: "text-modal",

            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Exclusão de Conta",
            text: "Você realmente deseja excluir a sua conta?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
            showCloseButton: true,
            reverseButtons: true,
            width: "32vw"
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`/funcionarios/${idUser}`).then((response) => {
                    swalWithBootstrapButtons.fire({
                        title: "Exclusão de Conta",
                        text: "Sua conta foi excluída com sucesso.",
                        icon: "success"
                    });
                    sessionStorage.removeItem("idUser");
                    sair("/login");
                }).catch((error) => {
                    swalWithBootstrapButtons.fire({
                        title: "Exclusão de Conta",
                        text: "Não foi possível excluir sua conta.",
                        icon: "error"
                    });
                    console.error("Houve um erro ao tentar excluir a conta")
                    console.log(error)
                })
            }
        });

    }

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }

        api.get(`/funcionarios/${idUser}`).then((response) => {
            const { data } = response;
            const { nome, email, telefone, dtCriacao, empresa } = data;
            const { id, razaoSocial, cnpj, emailPrincipal, telefonePrincipal } = empresa;

            setIdEmpresa(id);
            setNome(nome);
            setEmail(email);
            setTelefone(telefone);
            setDtCriacao(dtCriacao);
            
            setRazaoSocial(razaoSocial);
            setCNPJ(cnpj);
            setEmailPrincipal(emailPrincipal);
            setTelefonePrincipal(telefonePrincipal);

            api.get(`/funcionarios/${idUser}`).then((response) => { 

            }).catch((error) => {
                console.log("Houve um erro ao buscar o funcionário");
                console.log(error);
            })


        }).catch((error) => {
            console.log("Houve um erro ao buscar o funcionário");
            console.log(error);
        })
    });

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
                                <Button
                                    cor="branco"
                                    titulo={"Excluir conta"}
                                    funcaoButton={() => excluir()}
                                    icone={
                                        <IconlyProvider
                                            stroke="bold"
                                            size="small"
                                        >
                                            <Delete />
                                        </IconlyProvider>
                                    }
                                />
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
                                <button
                                    onClick={() => mudarSecao("informacoes-empresa")}
                                    className={
                                        styles[
                                        secaoPerfil === "informacoes-empresa" ?
                                            "roxo" : "sem-fundo"
                                        ]

                                    }
                                >
                                    Informações da Empresa
                                </button>
                                <button
                                    onClick={() => mudarSecao("informacoes-pessoais")}
                                    className={
                                        styles[
                                        secaoPerfil === "informacoes-pessoais" ?
                                            "roxo" : "sem-fundo"
                                        ]
                                    }
                                >
                                    Informações Pessoais
                                </button>
                            </div>{
                                secaoPerfil === "informacoes-empresa" ?
                                    <div className={styles[""]}>
                                        <Row
                                            titulo="Razão Social"
                                            valor={razaoSocial}
                                            funcao={() => navigate(`/editar-perfil/${idUser}`)}
                                        />
                                        <Row
                                            titulo="CNPJ"
                                            valor={cnpj}
                                            funcao={() => navigate(`/editar-perfil/${idUser}`)}
                                        />
                                        <Row
                                            titulo="Email Principal"
                                            valor={emailPrincipal}
                                            funcao={() => navigate(`/editar-perfil/${idUser}`)}
                                        />
                                        <Row
                                            titulo="Telefone Principal"
                                            valor={telefonePrincipal}
                                        />
                                    </div> :
                                    <div className={styles[""]}>
                                        <div>
                                            <Row
                                                titulo="Nome"
                                                valor={nome}
                                                funcao={() => navigate(`/editar-perfil/${idUser}`)}
                                            />
                                            <Row
                                                titulo="Telefone"
                                                valor={telefone}
                                                funcao={() => navigate(`/editar-perfil/${idUser}`)}
                                            />
                                            <Row
                                                titulo="Email"
                                                valor={email}
                                                funcao={() => navigate(`/editar-perfil/${idUser}`)}
                                            />
                                            <Row
                                                titulo="Data de Cadastro"
                                                valor={transformarData(dtCriacao)}
                                            />
                                        </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default Perfil;