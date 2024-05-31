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
    const titulos = ["", "Nome", "Email", "Perfil", "Status", "Serviços", ""]

    const [dados, setDados] = useState("");

    const editar = (index) => {
    }

    const deletar = (index) => {
    }

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }

        api.get(`/funcionarios`).then((response) => {
            const {data} = response;
            mapear(data); 
            console.log(data)
        }).catch((error) => {
            console.log("Houve um erro ao buscar o funcionário");
            console.log(error);
        });
    },[]);

    const mapear = (data) => {
        var dadosMapeados = []
        for (var index = 0; index < data.length; index++) {
          var dadoAtual = []
          dadoAtual.push(data[index].id)  
          dadoAtual.push(data[index].nome)  
          dadoAtual.push(data[index].email)  
          dadoAtual.push(data[index].telefone)  
          dadoAtual.push(data[index].bitStatus === 1 ? "Ativo" : "Inativo")  
          dadosMapeados.push(dadoAtual)
        }
        setDados(dadosMapeados)
    }

    return (
        <>
            <section className={styles["section-equipe"]}>
                <div>
                    <Header/>
                </div>
                <div className={styles["container-equipe"]}>
                    <div className={styles["content-equipe"]}>
                        <div className={styles["header"]}>
                            <Titulo tamanho={"md"} titulo={"Equipe"} />
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

                           {dados.length === 0  ? "Nenhum funcionário cadastrado!" :<Table
                                titulos={titulos}
                                linhas={dados}
                                showEditIcon={true}
                                showDeleteIcon={true}
                                funcaoEditar={editar}
                                funcaoDeletar={deletar}
                                 />}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Equipe;
