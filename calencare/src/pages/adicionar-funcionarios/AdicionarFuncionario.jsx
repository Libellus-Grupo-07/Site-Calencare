import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import api from "../../api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import Titulo from "../../components/titulo/Titulo";
import Input from "../../components/input/Input";
import { inputSomenteTexto, logado, isVazio } from "../../utils/global";
import styles from "./AdicionarFuncionario.module.css";
import Ul from "../../components/ul/Ul";
import { TickSquare } from "react-iconly";
import SelectInput from "../../components/select-input/SelectInput";
import { FaCheck } from "react-icons/fa6";
import { TiCancel } from "react-icons/ti";
import { toast } from "react-toastify";
import { useForm } from "../../hooks/useForm";

const AdicionarFuncionario = () => {

    //const { currentStep, currentComponent, changeStep, isLastStep } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const isEditar = location.pathname === "/funcionarios";
    const {idProfissional} = useParams();
    const [nomeUser, setNomeUser] = useState("");
    const idUser = sessionStorage.getItem("idUser");
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [options, setOptions] = useState([]);
    const [tipoPerfil, setTipoPerfil] = useState("");
    const [servicosSelecionados, setServicosSelecionados] = useState([]);
    // const items = [
    //     "Coloração",
    //     "Hidratação",
    //     "Pé e Mão ",
    //     "Corte",
    //     "Maquiagem ",
    //     "Unha de Gel",
    //     "Depilação",
    //     "Massagem"
    // ];

    const validarFuncionario = () => {
        if (!isVazio(nome, "Nome")
            && !isVazio(sobrenome, "Sobrenome")
            && !isVazio(email, "Email")
            && !isVazio(senha, "Senha")
            && !isVazio(options, "Tipo de Perfil")
            && !isVazio(servicosSelecionados, "Serviços que realiza")
        ) {
            return true;
        }

        return false;
    }

    const handleSave = () => {
        var url = isEditar ? `/funcionarios/${idProfissional}` : "/funcionarios" 
        const objetoAdicionado = {
            nome,
            sobrenome,
            email,
            senha,
            options,
            servicosSelecionados
        };
        if (validarFuncionario()) {
            api.post(url, objetoAdicionado).then(() => {
                toast.success("Funcionario adicionado com sucesso!");
                sessionStorage.setItem("editado", JSON.stringify(objetoAdicionado));
                navigate("/equipe");
            }).catch(() => {
                toast.error("Ocorreu um erro ao adicionar os dados, por favor, tente novamente.");
            })
        }
    };

    const toggleServico = (item) => {
        if (servicosSelecionados.includes(item)) {
            setServicosSelecionados(servicosSelecionados.filter(servico => servico !== item));
        } else {
            setServicosSelecionados([...servicosSelecionados, item]);
        }
    };

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }
        api.get(`/funcionarios/${idProfissional}`).then((response) => {
            const { data } = response;
            console.log(response);
            const { nome, telefone, email, bitStatus } = data;
            setNomeUser(nome);
        }).catch((error) => {
            console.log("Houve um erro ao buscar o funcionário");
            console.log(error);
        });

    }, [idProfissional]);

    return (
        <>
            <section className={styles["section-adicionar-funcionario"]}>
                <div>
                    <Header nomeUser={nomeUser} />
                </div>
                <div className={styles["container-adicionar-funcionario"]}>
                    <div className={styles["content-adicionar-funcionario"]}>
                        <div className={styles["header"]}>
                            <Titulo tamanho={"md"} titulo={isEditar ? "Editar Profissional" : "Adicionar Profissional"} />
                        </div>
                        <div className={styles["informations-adicionar-funcionario"]}>
                            <div className={styles["group-input"]}>
                                <Input
                                    id="nome"
                                    tamanho={"lg"}
                                    valor={nome}
                                    alterarValor={setNome}
                                    titulo={"Nome"}
                                    validarEntrada={(e) => inputSomenteTexto(e)}
                                />
                                <Input
                                    id="sobrenome"
                                    tamanho={"lg"}
                                    valor={sobrenome}
                                    alterarValor={setSobrenome}
                                    titulo={"Sobrenome"}
                                    validarEntrada={(e) => inputSomenteTexto(e)}
                                />
                            </div>

                            <Input
                                id="email"
                                valor={email}
                                alterarValor={setEmail}
                                titulo={"Email"}
                            />
                            <Input
                                id="senha"
                                valor={senha}
                                alterarValor={setSenha}
                                titulo={"Senha"}
                            />

                            <SelectInput
                                id={"tipoPerfil"}
                                tamanho={"lg"}
                                options={options}
                                valor={tipoPerfil}
                                alterarValor={setTipoPerfil}
                                titulo={"Tipo de Perfil"}
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

                                funcaoButton={() => navigate(-1)}
                                titulo={"Cancelar"}
                                cor={"branco"}
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
                                //(e) => avancar(e)
                                funcaoButton={handleSave}
                                titulo={isEditar ? "Editar " : "Adicionar "}
                                icone={<FaCheck />}
                                cor={"roxo"}
                            />
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default AdicionarFuncionario;
