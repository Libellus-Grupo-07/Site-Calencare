import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import api from "../../api";
import styles from "./Clientes.module.css";
import { logado } from "../../utils/global";
import { useNavigate } from "react-router-dom";
import { AddUser, Edit, IconlyProvider } from "react-iconly";
import Button from "../../components/button/Button";
import Titulo from "../../components/titulo/Titulo";
import Table from "../../components/table/Table";

const Clientes = () => {
    const navigate = useNavigate();
    const idUser = sessionStorage.getItem("idUser");
    const titulos = ["Nome", "Email", "Telefone", "Cliente Desde", "Último Agendamento"]
    const dados = [["Coloração", "Coloração de fios", "Categoria", "R$ 45,00", "20% em %"], ["Coloração", "Coloração de fios", "Categoria", "R$ 45,00", "20% em %"]];

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
            <section className={styles["section-clientes"]}>
                <div>
                    <Header nomeUser={nome} />
                </div>
                <div className={styles["container-clientes"]}>
                    <div className={styles["content-clientes"]}>
                        <div className={styles["header"]}>
                            <Titulo tamanho={"md"} titulo={`Clientes`} />
                            <div className={styles["group-button"]}>
                                <Button
                                    cor="roxo"
                                    titulo={"Adicionar"}
                                    icone={<IconlyProvider
                                        stroke="bold"
                                        size="small"
                                    >
                                        <AddUser/>
                                    </IconlyProvider>
                                    }
                                />
                            </div>
                        </div>
                        <div className={styles["table-clientes"]}>
                            <Table titulos={titulos} linhas={dados} icones={
                                <IconlyProvider>
                                    <Edit />
                                </IconlyProvider>
                            }/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Clientes;