import React, { useEffect, useState } from "react";
import styles from "./EditarPerfil.module.css"
import Header from "../../components/header/Header";
import api from "../../api";
import Titulo from './../../components/titulo/Titulo';
import Button from "../../components/button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { inputSomenteNumero, inputSomenteTexto, logado } from "../../utils/global";
import Input from "../../components/input/Input";
import { FaCheck } from "react-icons/fa6";
import { TiCancel } from "react-icons/ti";
import { toast } from "react-toastify";
import Ul from "../../components/ul/Ul";

const EditarPerfil = () => {
    const navigate = useNavigate();

    const { idUser } = useParams();
    const idEmpresa  = sessionStorage.idEmpresa;
    const [nome, setNome] = useState("");
    const [nomeUser, setNomeUser] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [dtCriacao, setDtCriacao] = useState("");
    const [empresa, setEmpresa] = useState({});
    const [servicosSelecionados, setServicosSelecionados] = useState([]);
    const [servicosPorFuncionario, setServicosPorFuncionario] = useState([]);
    const [items, setItems] = useState([]);

    const voltar = () => {
        navigate(`/perfil/${idUser}`);
    }

    const editar = () => {
        let body = {
            "id": idUser,
            "nome": nome,
            email,
            telefone,
            dtCriacao,
            empresa
        }
        api.put(`/funcionarios/${idUser}`, body).then((response) => {
            console.log(response);
            toast.success("Informações atualizadas com sucesso!")
            voltar();
        }).catch((error) => {
            console.log("Houve um erro ao atualizar o funcionário");
            console.log(error);
        });
    }

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }
        api.get(`/funcionarios/${idUser}`).then((response) => {
            const { data } = response;
            console.log(response);
            const { nome, email, telefone, dtCriacao, empresa } = data;
            setNome(nome);
            setNomeUser(nome)
            setEmail(email);
            setTelefone(telefone);
            setDtCriacao(dtCriacao);
            setEmpresa(empresa);
        }).catch((error) => {
            console.log("Houve um erro ao buscar o funcionário");
            console.log(error);
        });

        api.get(`/servico-preco/${idEmpresa}`).then((response) => {
            const { data } = response;
            const resposta = data
            setItems(resposta.length === 0 ? [] : resposta)

            api.get(`/servico-por-funcionario/${idEmpresa}/funcionario/${idUser}`
            ).then((response) => {
                const { data } = response;
                setServicosPorFuncionario(data)
                var servicosRealizados = []
                // Percorrendo a lista de servicos realizados pelo funcionario
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    // resposta do servico preco(todos os servicos cadastrados da empresa) e filtrando apartir do serivco atual 
                    var servicoFuncionario = resposta.filter(s => s.nome === element.nomeServico)
                    servicosRealizados.push(servicoFuncionario[0])
                }
                setServicosSelecionados(servicosRealizados)


            }).catch((error) => {
                console.log("Houve um erro ao buscar o serviço");
                console.log(error);
                });

        }).catch((error) => {
            console.log("Houve um erro ao buscar o serviço");
            console.log(error);
        });


    }, [navigate, idUser, idEmpresa]);

    const toggleServico = (item) => {
        if (servicosSelecionados.includes(item)) {
            setServicosSelecionados(servicosSelecionados.filter(servico => servico !== item));
        } else {
            setServicosSelecionados([...servicosSelecionados, item]);
        }
    };


    return (
        <>
            <section className={styles["section-perfil"]}>
                <div>
                    <Header nomeUser={nomeUser} />
                </div>
                <div className={styles["container-perfil"]}>
                    <div className={styles["content-perfil"]}>
                        <div className={styles["header"]}>
                            <Titulo
                                tamanho={"md"}
                                titulo={"Editar Informações Pessoais"}
                            />
                        </div>
                        <div className={styles["informations-perfil"]}>
                            <Input
                                tamanho={"lg"}
                                valor={nome}
                                alterarValor={setNome}
                                titulo={"Nome"}
                                validarEntrada={(e) => inputSomenteTexto(e)}
                            />
                            <Input
                                tamanho={"lg"}
                                valor={telefone}
                                alterarValor={setTelefone}
                                titulo={"Telefone"}
                                mascara={"(00) 00000-0000"}
                                validarEntrada={(e) => inputSomenteNumero(e)}
                            />
                            <Input
                                tamanho={"lg"}
                                valor={email}
                                alterarValor={setEmail}
                                titulo={"Email"}

                            />
                            <Input
                                tamanho={"lg"}
                                valor={"Administrador"}
                                readonly={true}
                                titulo={"Perfil"}
                            />
                            <Ul className={styles["servicos-grid"]}
                                titulo={"Serviços que realiza"}
                                items={items}
                                servicosSelecionados={servicosSelecionados}
                                toggleServico={toggleServico}
                            />
                        </div>
                        <div className={styles["group-button"]}>
                            <Button
                                titulo={"Cancelar"}
                                cor={"branco"}
                                funcaoButton={() => voltar()}
                                icone={
                                    <div style={{
                                        fontSize: "18px",
                                        display: "flex",
                                        alignItens: "center",
                                        justifyContent: "center"
                                    }}>
                                        <TiCancel />
                                    </div>
                                } />
                            <Button
                                titulo={"Editar"}
                                icone={<FaCheck />}
                                cor={"roxo"}
                                funcaoButton={() => editar()}
                            />
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default EditarPerfil;