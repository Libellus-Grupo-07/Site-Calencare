import React, { useEffect, useState } from "react";
import styles from "./AdicionarServico.module.css"
import Header from "../../components/header/Header";
import api from "../../api";
import Titulo from '../../components/titulo/Titulo';
import Button from "../../components/button/Button";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { inputSomenteNumero, inputSomenteTexto, logado } from "../../utils/global";
import Input from "../../components/input/Input";
import Textarea from "../../components/textarea/Textarea";
import { FaCheck } from "react-icons/fa6";
import { TiCancel } from "react-icons/ti";
import { toast } from "react-toastify";
import SelectInput from "../../components/select-input/SelectInput";

const AdicionarServico = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const titulo = location.pathname === "/servicos/adicionar" ? "Adicionar Serviço" : "Editar Serviço";
    const { idServico } = useParams();
    const idUser = sessionStorage.getItem("idUser");
    const [nome, setNome] = useState("");
    const [nomeUser, setNomeUser] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [comissao, setComissao] = useState(0);
    const [duracao, setDuracao] = useState(0);
    const [options, setOptions] = useState([
        {
            label: "Selecione",
            value: null
        },{
            label: "Cabelo",
            value: "Cabelo"
        },
        {
            label: "Maquiagem",
            value: "Maquiagem"
        },
        {
            label: "Podologia",
            value: "Podologia"
        },
        {
            label: "Manicure",
            value: "Manicure"
        }]);
    const [categoria, setCategoria] = useState(options[0]);


    // const editar = () => {
    //     let body = {
    //         "id": idServico,
    //         "nome": nome,
    //         email,
    //         telefone,
    //         dtCriacao,
    //         empresa
    //     }
    //     api.put(`/funcionarios/${idUser}`, body).then((response) => {
    //         console.log(response);
    //         toast.success("Informações atualizadas com sucesso!")
    //         voltar();
    //     }).catch((error) => {
    //         console.log("Houve um erro ao atualizar o funcionário");
    //         console.log(error);
    //     });
    // }

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }
        api.get(`/funcionarios/${idUser}`).then((response) => {
            const { data } = response;
            console.log(response);
            const { nome } = data;
            setNomeUser(nome)
        }).catch((error) => {
            console.log("Houve um erro ao buscar o funcionário");
            console.log(error);
        });
    }, [idUser]);

    return (
        <>
            <section className={styles["section-adicionar-servico"]}>
                <div>
                    <Header nomeUser={nomeUser} />
                </div>
                <div className={styles["container-adicionar-servico"]}>
                    <div className={styles["content-adicionar-servico"]}>
                        <div className={styles["header"]}>
                            <Titulo
                                tamanho={"md"}
                                titulo={titulo}
                            />
                        </div>
                        <div className={styles["informations-adicionar-servico"]}>
                            <Input
                                id="nomeServico"
                                tamanho={"lg"}
                                valor={nome}
                                alterarValor={setNome}
                                titulo={"Nome"}
                                validarEntrada={(e) => inputSomenteTexto(e)}
                            />
                            <Textarea
                                id={"descricaoServico"}
                                tamanho={"lg"}
                                valor={descricao}
                                alterarValor={setDescricao}
                                titulo={"Descrição"}
                                validarEntrada={(e) => inputSomenteTexto(e)}
                            />
                            <SelectInput
                                id={"categoriaServico"}
                                tamanho={"lg"}
                                options={options}
                                valor={categoria}
                                alterarValor={setCategoria}
                                titulo={"Categoria"}
                            />
                            <div className={styles["group-input"]}>
                                <Input
                                    id={"precoServico"}
                                    tamanho={"lg"}
                                    titulo={"Preço"}
                                    valor={preco}
                                    alterarValor={setPreco}

                                />
                                <Input
                                    id="comissaoServico"
                                    tamanho={"lg"}
                                    titulo={"Comissão em %"}
                                    valor={comissao}
                                    alterarValor={setComissao}
                                />
                            </div>
                            <Input
                                id="duracaoServico"
                                tamanho={"lg"}
                                titulo={"Duração em minutos"}
                                valor={duracao}
                                alterarValor={setDuracao}
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
                                titulo={"Adicionar"}
                                icone={<FaCheck />}
                                cor={"roxo"}
                            />
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default AdicionarServico;