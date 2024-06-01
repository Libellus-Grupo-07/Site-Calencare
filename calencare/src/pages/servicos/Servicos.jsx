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
import ModalTemplate from "../../components/modal-template/ModalTemplate";
import { toast } from "react-toastify";

const Servicos = () => {
    const navigate = useNavigate();
    const idUser = sessionStorage.getItem("idUser");
    const [idEmpresa, setIdEmpresa] = useState(0);
    const [idServico, setIdServico] = useState(0);
    const [nomeServico, setNomeServico] = useState("");
    const titulos = ["Nome", "Descrição", "Preço", "Comissão em %", "Duração (minutos)", "Status", ""]
    const [dados, setDados] = useState([]);
    const [dadosResposta, setDadosResposta] = useState([]);

    // const [nome, setNome] = useState("");

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }

        api.get(`/empresas/funcionarios?idFuncionario=${idUser}`).then((response) => {
            const { data } = response;
            const { id } = data;
            setIdEmpresa(id);
            buscarServicos(id);
        }).catch((error) => {
            console.log("Houve um erro ao buscar a empresa");
            console.log(error);
        });


        // api.get(`/funcionarios/${idUser}`).then((response) => {
        //     const { data } = response;
        //     const { nome } = data;
        //     setNome(nome);
        // }).catch((error) => {
        //     console.log("Houve um erro ao buscar o funcionário");
        //     console.log(error);
        // });
    }, []);

    const buscarServicos = (id) => {
        api.get(`/servico-preco/${id}`).then((response) => {
            const { data } = response;
            setDadosResposta(data);
            mapear(data);
        }).catch((error) => {
            console.error("Houve um erro ao buscar serviços");
            console.error(error)
        })
    }

    const mapear = (data) => {
        var dataMapp = [];
        // ["Coloração", "Coloração de fios", "Categoria", "R$ 45,00", "20% em %", "60 minutos"], ["Coloração", "Coloração de fios", "Categoria", "R$ 45,00", "20% em %", "60 minutos"

        for (let i = 0; i < data.length; i++) {
            var dataAtual = [];
            dataAtual.push(data[i].nome);
            dataAtual.push(data[i].descricao);
            dataAtual.push(`R$ ${data[i].preco.toFixed(2).replace(".", ",")}`);
            dataAtual.push((data[i].comissao).toFixed(2).replace(".", ",") + "%");
            dataAtual.push(data[i].duracao + " minutos");
            dataAtual.push(data[i].descricaoStatus);

            dataMapp.push(dataAtual);
        }

        setDados(dataMapp);
    }

    const tituloModal = "Excluir Serviço";
    const tituloBotao = "Excluir";
    const corpoModal = (
        <>
            <span style={{
                lineHeight: "1.5rem",
            }}>
                Você realmente deseja excluir o serviço "{nomeServico}"?
            </span>
        </>
    )

    const [modalAberto, setModalAberto] = useState(false);

    const abrirModal = () => {
        setModalAberto(!modalAberto);
    }

    const editar = (index) => {
        let idServico = dadosResposta[index].id;
        navigate(`/servicos/editar/${idServico}`);
    }

    const deletar = (index) => {
        var id = dadosResposta[index].id;
        var nome = dadosResposta[index].nome;
        setIdServico(id);
        setNomeServico(nome);
        abrirModal();
    }

    const excluir = () => {
        api.delete(`/servico-preco/${idEmpresa}/${idServico}`).then(() => {
            toast.success("Serviço excluído com sucesso!");
            buscarServicos(idEmpresa);
            abrirModal();
        }).catch((error) => {
            toast.error("Ocorreu um erro ao tentar excluir serviço!");
            console.error(error);
        })
    }

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
            <ModalTemplate
                aberto={modalAberto}
                setAberto={setModalAberto}
                funcaoBotaoConfirmar={excluir}
                corpo={corpoModal}
                titulo={tituloModal}
                tituloBotaoConfirmar={tituloBotao}
            />
        </>
    );
}

export default Servicos;