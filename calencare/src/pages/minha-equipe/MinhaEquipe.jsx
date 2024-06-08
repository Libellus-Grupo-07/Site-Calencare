import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import api from "../../api";
import styles from "./MinhaEquipe.module.css";
import { logado } from "../../utils/global";
import { useNavigate } from "react-router-dom";
import { AddUser, IconlyProvider } from "react-iconly";
import Button from "../../components/button/Button";
import Titulo from "../../components/titulo/Titulo";
import Table from "../../components/table/Table";
import ModalTemplate from "../../components/modal-template/ModalTemplate";
import { toast } from "react-toastify";
import Pilha from "../../PilhaDesfazerDados";


const Equipe = () => {
    const navigate = useNavigate();
    const titulos = ["", "Nome", "Email", "Perfil", "Status", "Serviços", ""]

    const [pilha, setPilha] = useState(new Pilha())
    const idEmpresa = sessionStorage.getItem("idEmpresa")
    const [dados, setDados] = useState("");
    const [idprofissional, setIdProfissional] = useState("");
    const [nome, setNome] = useState("");

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }

        var pilhaSecundaria = new Pilha()
        pilhaSecundaria.setPilha(sessionStorage.pilha ? JSON.parse(sessionStorage.pilha) : [])
        setPilha(pilhaSecundaria)
        buscarFuncionarios()
    
    }, [navigate, idEmpresa]);


    const buscarFuncionarios = () => {
        api.get(`/funcionarios/empresa?idEmpresa=${idEmpresa}`).then((response) => {
            const { data } = response;
            mapear(data);
            console.log(data)
        }).catch((error) => {
            console.log("Houve um erro ao buscar o funcionário");
            console.log(error);
        });
    }
    const desfazer = () => {
        const id = pilha.pop();
        const funcionarioStatusDto = {
            bitStatus: 1
        };
        console.log(pilha)
        api.patch(`/funcionarios/status/${id}`, funcionarioStatusDto)
            .then(response => {
                const { data } = response;
                buscarFuncionarios()
            })
            .catch(error => {
                console.log("Houve um erro ao desfazer a ação");
                console.log(error);
            });
    };


    const corpoModal = (
        <>
            <span style={{
                lineHeight: "1.5rem",
            }}>
                Você realmente deseja excluir o funcionário "{nome}"?
            </span>
        </>
    )

    const buscarProfissional = (id) => {
        api.get(`/funcionarios/${id}`).then((response) => {
            const { data } = response;
            setDados(data);
            mapear(data);
        }).catch((error) => {
            console.error("Houve um erro ao buscar serviços");
            console.error(error)
        })
    }

    const [modalAberto, setModalAberto] = useState(false);

    const abrirModal = () => {
        setModalAberto(!modalAberto);
    }

    const editar = (index) => {
        let idprofissional = dados[index][0];
        navigate(`/profissional/editar/${idprofissional}`);
    }

    const deletar = (index) => {
        var id = dados[index][0];
        var nome = dados[index][1];
        setIdProfissional(id)
        setNome(nome)
        abrirModal(nome);
    }

    const excluir = () => {
        const funcionarioStatusDto = {
            bitStatus: 4
        };
        console.log(funcionarioStatusDto)
        api.patch(`/funcionarios/status/${idprofissional}`, funcionarioStatusDto).then(() => {
            toast.success("Funcionário excluído com sucesso!");
            buscarFuncionarios()
            pilha.push(idprofissional)
            sessionStorage.pilha = JSON.stringify(pilha.getPilha())
            setIdProfissional("")
            setNome("")
            abrirModal();
        }).catch((error) => {
            toast.error("Ocorreu um erro ao tentar excluir funcionário!");
            console.error(error);
        })
    }

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
                    <Header />
                </div>
                <div className={styles["container-equipe"]}>
                    <div className={styles["content-equipe"]}>
                        <div className={styles["header"]}>
                            <Titulo tamanho={"md"} titulo={"Minha Equipe"} />
                            <div className={styles["group-button"]}>

                                <Button
                                    funcaoButton={desfazer}
                                    cor="branco"
                                    titulo={"Desfazer"}
                                    icone={<IconlyProvider
                                        stroke="bold"
                                        size="small"
                                    >
                                        <AddUser />
                                    </IconlyProvider>
                                    }
                                />

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

                            {dados.length === 0 ?
                                <div className={styles["sem-funcionarios"]}>
                                    Nenhum funcionário cadastrado
                                </div> : <Table
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
            <ModalTemplate
                aberto={modalAberto}
                setAberto={setModalAberto}
                funcaoBotaoConfirmar={excluir}
                corpo={corpoModal}
                titulo={"Excluir Profissional"}
                tituloBotaoConfirmar={"Excluir"}
            />
        </>
    );
}

export default Equipe;
