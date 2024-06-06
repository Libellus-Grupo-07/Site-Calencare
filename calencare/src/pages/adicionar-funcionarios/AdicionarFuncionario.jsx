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
    const { idProfissional } = useParams();
    const idEmpresa = 8;
    const isEditar = location.pathname === `/profissional/editar/${idProfissional}`;
    const [nomeUser, setNomeUser] = useState("");
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [bitStatus, setBitStatus] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [options, setOptions] = useState([
            {
                label: "Selecione",
                value: null
            }, {
                label: "Administrador",
                value: "Adminstrador"
            },
            {
                label: "Funcionário",
                value: "Funcionário"
            }]);
    
    const [tipoPerfil, setTipoPerfil] = useState("");
    const [servicosSelecionados, setServicosSelecionados] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }
        api.get(`/funcionarios/${idProfissional}`).then((response) => {
            const { data } = response;
            console.log(response);
            const { nome, telefone, email, bitStatus } = data;
            setNome(nome);
            setTelefone(telefone);
            setBitStatus(bitStatus);
            setEmail(email);
            //tipo perfil
            // servico  que realiza

        }).catch((error) => {
            console.log("Houve um erro ao buscar o funcionário");
            console.log(error);
        });

        let urlServicos = isEditar ? 
            `/servico-por-funcionario/${idEmpresa}/funcionario/${idProfissional}`
            : `/servico-preco/${idEmpresa}`

        api.get(urlServicos).then((response) => {
            const { data } = response;
            console.log(response);
            setItems(data.length === 0 ? [] : data)
            

        }).catch((error) => {
            console.log("Houve um erro ao buscar o serviço");
            console.log(error);
        });

    }, [idProfissional]);

  
    const validarFuncionario = () => {
        if (!isVazio(nome, "Nome")
            && !isVazio(telefone, "Telefone")
            && !isVazio(email, "Email")
            && !isVazio(senha, "Senha")
            && !isVazio(options, "Tipo de Perfil")
            && !isVazio(tipoPerfil, "Tipo de Perfil")
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
            telefone,
            bitStatus,
            email,
            senha,
            options,
            tipoPerfil,
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

                            <Input
                                id="nome"
                                tamanho={"lg"}
                                valor={nome}
                                alterarValor={setNome}
                                titulo={"Nome"}
                                validarEntrada={(e) => inputSomenteTexto(e)}
                            />
                            <Input
                                id="telefone"
                                tamanho={"lg"}
                                valor={telefone}
                                alterarValor={setTelefone}
                                titulo={"Telefone"}
                                mascara={"(00) 00000-0000"}
                            />
                  
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

                        <div className={styles["group-input"]}>
                            <SelectInput
                                id={"tipoPerfil"}
                                tamanho={"lg"}
                                options={options}
                                valor={tipoPerfil}
                                alterarValor={setTipoPerfil}
                                titulo={"Tipo de Perfil"}
                            />

                            <div className={styles[isEditar ? "selectInput-status" : "none-selectInput-status"]}>
                                <SelectInput
                                    id={"status"}
                                    tamanho={"lg"}
                                    options={options}
                                    valor={bitStatus}
                                    alterarValor={setBitStatus}
                                    titulo={"Status"}
                                />
                            </div>
                        </div>

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
                            titulo={isEditar ? "Editar" : "Adicionar"}
                            icone={<FaCheck />}
                            cor={"roxo"}
                        />
                    </div>
                    </div>
                </div>
        </section >

        </>
    );
};

export default AdicionarFuncionario;
