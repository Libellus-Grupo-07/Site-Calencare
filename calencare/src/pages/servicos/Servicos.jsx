import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import api from "../../api";
import styles from "./Servicos.module.css";
import { logado } from "../../utils/global";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import Button from "../../components/button/Button";
import Titulo from "../../components/titulo/Titulo";
import Table from "../../components/table/Table";

const Servicos = () => {
    const navigate = useNavigate();
    const idUser = sessionStorage.getItem("idUser");
    const titulos = ["Nome", "Descrição", "Categoria", "Preço", "Comissão em %", "Duração (minutos)", ""]
    const [dados, setDados] = useState([]);

    // const [nome, setNome] = useState("");

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }

        api.get("/servicos/preco").then((response) => {
            const { data } = response;
            mapear(data);
        }).catch((error) => {
            console.error("Houve um erro ao buscar serviços");
            console.error(error)
        })

        // api.get(`/funcionarios/${idUser}`).then((response) => {
        //     const { data } = response;
        //     const { nome } = data;
        //     setNome(nome);
        // }).catch((error) => {
        //     console.log("Houve um erro ao buscar o funcionário");
        //     console.log(error);
        // });
    }, []);

    const mapear = ( data ) => {
        var dataMapp = [];
        // ["Coloração", "Coloração de fios", "Categoria", "R$ 45,00", "20% em %", "60 minutos"], ["Coloração", "Coloração de fios", "Categoria", "R$ 45,00", "20% em %", "60 minutos"
        
        for (let i = 0; i < data.length; i++){
            var dataAtual = [];
            dataAtual.push(data[i].descricao);
            dataAtual.push(data[i].descricao);
            dataAtual.push(data[i].descricao);
            dataAtual.push(`R$ ${data[i].preco.toFixed(2).replace(".", ",")}`);
            dataAtual.push((data[i].comissao * 10).toFixed(2).replace(".", ",") + "%");
            dataAtual.push(data[i].duracao + " minutos");

            dataMapp.push(dataAtual);
        }

        setDados(dataMapp);
    }

    const editar = () => {}
    const deletar = () => {}

    return (
        <>
            <section className={styles["section-servicos"]}>
                <div>
                    <Header />
                </div>
                <div className={styles["container-servicos"]}>
                    <div className={styles["content-servicos"]}>
                        <div className={styles["header"]}>
                            <Titulo tamanho={"md"} titulo={`Serviços`} />
                            <div className={styles["group-button"]}>
                                <Button
                                    cor="roxo"
                                    titulo={"Adicionar"}
                                    icone={<FaPlus />}
                                    funcaoButton={() => navigate("/servicos/adicionar")}
                                />
                            </div>
                        </div>
                        <div className={styles["table-servicos"]}>
                            {dados.length === 0 ?
                                <div>
                                    Nenhum serviço adicionado
                                </div>
                                :
                                <Table
                                    titulos={titulos}
                                    linhas={dados}
                                    showEditIcon={true}
                                    showDeleteIcon={true}
                                    funcaoEditar={editar}
                                    funcaoDeletar={deletar}
                                />
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Servicos;