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
    const idEmpresa = sessionStorage.idEmpresa;
    const [nome, setNome] = useState("");
    const [nomeUser, setNomeUser] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [perfilAcesso, setPerfilAcesso] = useState("");
    const [dtCriacao, setDtCriacao] = useState("");
    const [empresa, setEmpresa] = useState({});
    const [servicosSelecionados, setServicosSelecionados] = useState([]);
    const [servicosPorFuncionario, setServicosPorFuncionario] = useState([]);
    const [items, setItems] = useState([]);

    const voltar = () => {
        navigate(`/perfil`);
    }

    const editar = () => {
        let body = {
            "id": idUser,
            "nome": nome,
            email,
            telefone,
            dtCriacao,
            perfilAcesso,
            bitStatus: 1,
            empresa
        }
        api.put(`/funcionarios/${idUser}`, body).then((response) => {
            sessionStorage.nomeUser = response.data.nome;

            if (servicosPorFuncionario.length > 0) {
                for (let index = 0; index < servicosPorFuncionario.length; index++) {
                    console.log(servicosPorFuncionario);
                    // Serviço por Funcionário atual
                    var servicoFuncionario = servicosPorFuncionario[index]
                    // Filtrando o serviço preço pelo nome do Serviço Por Funcionário atual
                    var servicoPreco = items.filter(s => s.nome === servicoFuncionario.nomeServico);
                    // Variavel utilizada para checar se o serviço atual está selecionado e definir o status
                    var isSelecionado = servicosSelecionados.includes(servicoPreco[0]) ? 1 : 0;

                    // Se o status do serviço vindo do BD estiver diferente do status atual, então atualiza no BD
                    if (servicoFuncionario.bitStatus !== isSelecionado) {
                        api.patch(`/servico-por-funcionario/${idEmpresa}/${idUser}/${servicoFuncionario.id}`).then().catch((error) => {
                            console.error(error)
                        })
                    }
                }
            } else {
                for (let index = 0; index < items.length; index++) {
                    let servicoAdicionado = {
                        idFuncionario: idUser,
                        idServicoPreco: items[index].id,
                        dtCriacao: new Date(),
                        bitStatus: servicosSelecionados.includes(items[index]) ? 1 : 0
                    }

                    api.post(`/servico-por-funcionario/${idEmpresa}`, servicoAdicionado).then().catch((error) => {
                        console.error(error)
                    })
                }
            }

            toast.success("Informações atualizadas com sucesso!")
            voltar();
        }).catch((error) => {
            toast.error("Ocorreu um erro ao atualizar o funcionário");
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
            const { nome, email, telefone, dtCriacao, perfilAcesso, empresa } = data;
            setNome(nome);
            setNomeUser(nome)
            setEmail(email);
            setTelefone(telefone);
            setPerfilAcesso(perfilAcesso);
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
                    var servicoFuncionario = resposta.filter(s => s.nome === element.nomeServico && element.bitStatus === 1);
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
                                valor={perfilAcesso}
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