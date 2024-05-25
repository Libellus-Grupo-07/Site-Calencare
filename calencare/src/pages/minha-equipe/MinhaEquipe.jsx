import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import api from "../../api";
import styles from "./MinhaEquipe.module.css";
import { logado } from "../../utils/global";
import { useNavigate } from "react-router-dom";
import { AddUser, Edit, IconlyProvider } from "react-iconly";
import Button from "../../components/button/Button";
import Titulo from "../../components/titulo/Titulo";
import Table from "../../components/table/Table";

const Equipe = () => {
    const navigate = useNavigate();
    const idUser = sessionStorage.getItem("idUser");
    const titulos = ["", "Nome", "Email", "Perfil", "Status", "Serviços",""]
    const dados = [["", "Felipe Santana", "felipe@gmail.com", "Funcionário", "Ativo", "Corte"],
    ["", "Helen Araújo", "helen@gmail.com", "Funcionário", "Ativo", "Hidratação"]];
    // const tituloServico = ["Serviços"]
    // const dadosServicos = ["Corte", "Hidratação"]

    const [nome, setNome] = useState("");

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }

        api.get(`/funcionarios/${idUser}`).then((response) => {
            const { data } = response;
            const { nome } = data;
            setNome(nome);
        }).catch((error) => {
            console.log("Houve um erro ao buscar o funcionário");
            console.log(error);
        });
    }, [idUser]);


    return (
        <>
            <section className={styles["section-equipe"]}>
                <div>
                    <Header nomeUser={nome} />
                </div>
                <div className={styles["container-equipe"]}>
                    <div className={styles["content-equipe"]}>
                        <div className={styles["header"]}>
                            <Titulo tamanho={"md"} titulo={"Equipe"}/>
                            <div className={styles["group-button"]}>
                                <Button
                                    funcaoButton={() => navigate("/profissional/adicionar")}
                                    cor="roxo"
                                    titulo={"Adicionar"}
                                    icone={<IconlyProvider
                                        stroke="bold"
                                        size="small"
                                    >
                                        <AddUser />
                                    </IconlyProvider>
                                    }
                                />
                            </div>
                        </div>
                        <div className={styles["table-equipe"]}>
                            <Table titulos={titulos} linhas={dados} icones={
                                [<IconlyProvider>
                                    <Edit />
                                </IconlyProvider>]
                            } />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Equipe;