import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import api from "../../api";
import styles from "./Clientes.module.css";
import { logado } from "../../utils/global";
import { useNavigate } from "react-router-dom";
import { Edit, IconlyProvider } from "react-iconly";
import Button from "../../components/button/Button";
import Titulo from "../../components/titulo/Titulo";
import Table from "../../components/table/Table";
import ModalTemplate from "../../components/modal-template/ModalTemplate";
import Input from "../../components/input/Input";

const Clientes = () => {
    const navigate = useNavigate();
    const idEmpresa = sessionStorage.getItem("idEmpresa");
    const titulos = ["Nome", "Email", "Telefone", "Cliente Desde", "Último Agendamento", ""]
    const [dados, setDados] = useState([]);
    const [nomeCliente, setNomeCliente] = useState("");
    const [sobrenomeCliente, setSobrenomeCliente] = useState("");
    const [emailCliente, setEmailCliente] = useState("");
    const [telefoneCliente, setTelefoneCliente] = useState("");
    const [dataNascimentoCliente, setDataNascimentoCliente] = useState("");

    const tituloModal = "Adicionar Cliente";
    const tituloBotao = "Adicionar";
    const corpoModal = (
        <>
            <Input
                id={"nomeCliente"}
                titulo={"Nome"}
                valor={nomeCliente}
                alterarValor={setNomeCliente}
            />

            <Input
                id={"sobrenomeCliente"}
                titulo={"Sobrenome"}
                valor={sobrenomeCliente}
                alterarValor={setSobrenomeCliente}
            />
            <Input
                id={"emailCliente"}
                titulo={"Email (Opcional)"}
                placeholder={"Email"}
                valor={emailCliente}
                alterarValor={setEmailCliente}
            />
            <Input
                id={"telefoneCliente"}
                titulo={"Telefone"}
                valor={telefoneCliente}
                alterarValor={setTelefoneCliente}
                mascara={"(00) 00000-0000"}
            />
            <Input
                id={"dataNascimentoCliente"}
                titulo={"Data de Nascimento"}
                valor={dataNascimentoCliente}
                alterarValor={setDataNascimentoCliente}
                type={"date"}
            />
        </>
    )

    const [nome, setNome] = useState("");
    const [modalAberto, setModalAberto] = useState(false);

    const abrirModal = () => {
        setModalAberto(!modalAberto);
    }

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }

    }, [idEmpresa]);

    const buscarClientes = () => {
        api.get(`clientes/empresa/${idEmpresa}`).then((response) => {
            const { data } = response;
            console.log(data)
            setDados(data);
        }).catch((error) => {
            console.error(error);
        })
    }

    return (
        <>
            <section className={styles["section-clientes"]}>
                <div>
                    <Header />
                </div>
                <div className={styles["container-clientes"]}>
                    <div className={styles["content-clientes"]}>
                        <div className={styles["header"]}>
                            <Titulo tamanho={"md"} titulo={`Clientes`} />
                            <div className={styles["group-button"]}>
                                {/* <Button
                                    funcaoButton={() => abrirModal()}
                                    cor="roxo"
                                    titulo={"Adicionar"}
                                    icone={<IconlyProvider
                                        stroke="bold"
                                        size="small"
                                    >
                                        <AddUser />
                                    </IconlyProvider>
                                    }
                                /> */}
                            </div>
                        </div>
                        <div className={styles["table-clientes"]}>
                            {
                                dados.length === 0 ?
                                    <div className={styles["sem-clientes"]}>
                                        Nenhum cliente cadastrado
                                    </div>
                                    :
                                    <Table titulos={titulos} linhas={dados} icones={[
                                        <IconlyProvider>
                                            <Edit />
                                            {/* <Delete /> */}
                                        </IconlyProvider>]
                                    } />
                            }
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        position: "absolute"
                    }}
                >
                    <ModalTemplate
                        aberto={modalAberto}
                        setAberto={setModalAberto}
                        corpo={corpoModal}
                        titulo={tituloModal}
                        tituloBotaoConfirmar={tituloBotao}
                    />
                </div>
            </section>
        </>
    );
}

export default Clientes;