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

    const isEditar = location.pathname === "/servicos/adicionar";
    const { idServico } = useParams();
    const nomeUser = sessionStorage.getItem("nomeUser");
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [comissao, setComissao] = useState(0);
    const [duracao, setDuracao] = useState(0);
    const [servicos, setServicos] = useState([]);
    const [options, setOptions] = useState([]);
    const [categoria, setCategoria] = useState();


    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }

        api.get("/categoria-servico").then((response) => {
            const { data } = response;
            mapear(data);

        }).catch((error) => {
            console.error("Houve um erro ao buscar Categorias de Serviço => " + error);
        });

        api.get("servicos").then((response) => {
            const { data } = response;
            setServicos(data);
        }).catch((error) => {
            console.error("Houve um erro ao buscar os serviços.");
            console.error(error);
        });
    }, []);



    const salvar = () => {
        var url = isEditar ? `/servicos/preco/${idServico}` : "/servicos/preco/";
        var body = {};
        
        api.post(url, body).then(() => {
            toast.success("Serviço adicionado com sucesso!");
            navigate("/servicos");
        }).catch((error) => {
            toast.error("Houve um erro ao tentar adicionar serviço!");
            console.error(error);
        });
    }


    const mapear = ( data ) => {
        var optionsMap = [];

        for (let i = 0; i < data.length; i++) {
            optionsMap.push({
                label: data[i].nome,
                value: data[i].nome,
            })
        }
        
        setOptions(optionsMap)
        setCategoria(optionsMap[0]);
    }

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
                                titulo={isEditar ? "Adicionar Serviço" : "Editar Serviço"}
                            />
                        </div>
                        <form className={styles["informations-adicionar-servico"]}>
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
                        </form>
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
                                titulo={isEditar ? "Adicionar" : "Editar" }
                                icone={<FaCheck />}
                                cor={"roxo"}
                                funcaoButton={() => salvar()}
                            />
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default AdicionarServico;