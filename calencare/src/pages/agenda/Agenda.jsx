import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import api from "../../api";
import styles from "./Agenda.module.css";
import { logado } from "../../utils/global";
import { useNavigate } from "react-router-dom";
import { AddUser, Edit, IconlyProvider } from "react-iconly";
import Button from "../../components/button/Button";
import Titulo from "../../components/titulo/Titulo";

const Agenda = () => {
    const navigate = useNavigate();
    const idUser = sessionStorage.getItem("idUser");
    const [nome, setNome] = useState("");


    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }

        // api.get(`/agendas/${idUser}`).then((response) => {
        //     const { data } = response;
        //     const { nome } = data;
        //     setNome(nome);
        // }).catch((error) => {
        //     console.log("Houve um erro ao buscar uma agenda");
        //     console.log(error);
        // });
    }, [idUser]);

    return (
        <>
            <section className={styles["section-agenda"]}>
                <div>
                    <Header nomeUser={nome} />
                </div>
                <div className={styles["container-agenda"]}>
                    <div className={styles["content-agenda"]}>
                        <div className={styles["header"]}>
                            <Titulo tamanho={"md"} titulo={"Agenda"}/>
                            <div className={styles["group-button"]}>
                                <Button
                                    funcaoButton={() => navigate("/agenda/adicionar")}
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
                    </div>
                </div>
            </section>
        </>
    );
}

export default Agenda;