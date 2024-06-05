import React, { useEffect, useState } from "react";
import styles from "./AdicionarServico.module.css"
import Header from "../../components/header/Header";
import api from "../../api";
import Titulo from '../../components/titulo/Titulo';
import Button from "../../components/button/Button";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { inputSomenteNumero, inputSomenteTexto, inputValorMontario, inputValorPorcentagem, isSelected, isVazio, logado } from "../../utils/global";
import Input from "../../components/input/Input";
import Textarea from "../../components/textarea/Textarea";
import { FaCheck } from "react-icons/fa6";
import { TiCancel } from "react-icons/ti";
import { toast } from "react-toastify";
import SelectInput from "../../components/select-input/SelectInput";
import ModalTemplate from "../../components/modal-template/ModalTemplate";

const AdicionarServico = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isAdicionar = location.pathname === "/servicos/adicionar";
    const { idServico } = useParams();
    const nomeUser = sessionStorage.getItem("nomeUser");
    const idUser = sessionStorage.getItem("idUser");
    const [idEmpresa, setIdEmpresa] = useState(0);
    const [servico, setServico] = useState()
    const [descricao, setDescricao] = useState("");
    const [nomeCategoria, setNomeCategoria] = useState("");
    const [descricaoCategoria, setDescricaoCategoria] = useState("");
    const [preco, setPreco] = useState("");
    const [comissao, setComissao] = useState("");
    const [duracao, setDuracao] = useState("");
    const [servicos, setServicos] = useState([]);
    const [options, setOptions] = useState([]);
    const [categoria, setCategoria] = useState("");

    const buscarCategoriasServico = (action, index, categoria) => {
        api.get("/categoria-servico").then((response) => {
            const { data } = response;
            let idCategoria = index;

            if (categoria) {
                let categoriaObj = data.filter(c => c.nome === categoria)[0]
                idCategoria = data.indexOf(categoriaObj);
            }

            mapear("categoria-servico", data, action === "I" ? data.length : action === "E" ? idCategoria : -1, action);

        }).catch((error) => {
            console.error("Houve um erro ao buscar Categorias de Serviço => " + error);
        });
    }

    const buscarServicos = (action, index, nome) => {
        api.get("/servicos").then((response) => {
            const { data } = response;
            var indiceServico = index;

            if (nome) {
                indiceServico = data.indexOf(data.filter(s => s.nome === nome)[0]);
            }

            mapear("servico", data, action === "I" ? data.length : action === "E" ? indiceServico : -1, action);
        }).catch((error) => {
            console.error("Houve um erro ao buscar os serviços.");
            console.error(error);
        });
    }

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }

        api.get(`/empresas/funcionarios?idFuncionario=${idUser}`).then((response) => {
            const { data } = response;
            const { id } = data;
            setIdEmpresa(id);
            buscarCategoriasServico("C");
            buscarServicos("C");

        }).catch((error) => {
            console.error(error)
        })
    }, []);

    useEffect(() => {
        if (!isAdicionar) {
            alert(idEmpresa)
            api.get(`/servico-preco/${idEmpresa}/${idServico}`).then((response) => {
                const { data } = response;
                const { nome, descricao, categoria, preco, comissao, duracao, descricaoStatus } = data;
                setDescricao(descricao);
                setPreco("R$ " + preco.toFixed(2).replace(".", ","));
                setComissao(comissao.toFixed(2).replace(".", ",") + "%");
                setDuracao(duracao);
                buscarServicos("E", undefined, nome);
                buscarCategoriasServico("E", undefined, data.categoria);

            }).catch((error) => {
                console.error(error)
            })
        }
    }, [idEmpresa]);


    const mapear = (campo, data, index, action) => {
        var optionsMap = [];
        let i = 0;

        for (i = 0; i < data.length; i++) {
            optionsMap.push({
                id: data[i].id,
                label: data[i].nome,
                value: data[i].nome,
            })
        }

        i = index === 0 && action !== "E" ? index : action ? index : i;

        if (campo === "categoria-servico") {
            setOptions(optionsMap)
            setCategoria(optionsMap[i]);
        } else {
            setServicos(optionsMap)
            setServico(optionsMap[i]);
        }
    }

    const tituloModal = "Adicionar Categoria de Serviço";
    const tituloBotao = "Adicionar";
    const corpoModal = (
        <>
            <Input
                id={"nomeCategoria"}
                titulo={"Nome"}
                valor={nomeCategoria}
                alterarValor={setNomeCategoria}
            />

            <Textarea
                id={"descricaoCategoria"}
                titulo={"Descrição"}
                valor={descricaoCategoria}
                alterarValor={setDescricaoCategoria}
            />
        </>
    )

    const [modalAberto, setModalAberto] = useState(false);

    const abrirModal = (value) => {
        setModalAberto(!modalAberto);
        setNomeCategoria(value)
    }

    const isAdicionarCategoriaValid = () => {
        if (!isVazio(nomeCategoria, "Nome da Categoria")
            && !isVazio(descricaoCategoria, "Descrição da Categoria")
        ) {
            return true;
        }

        return false;
    }

    // const isAdicionarServicoValid = (value) => {
    //     if (isSelected(categoria, "Categoria do Serviço") &&
    //         !isVazio(value, "Nome do Serviço")
    //     ) {
    //         return true;
    //     }

    //     return false;
    // }

    const adicionarCategoria = () => {
        if (isAdicionarCategoriaValid()) {
            var body = {
                "nome": nomeCategoria,
                "descricao": descricaoCategoria
            }

            api.post("/categoria-servico", body).then(() => {
                abrirModal();
                buscarCategoriasServico("I");
                toast.success("Categoria de Serviço adicionada com sucesso!");
                setNomeCategoria("");
                setDescricaoCategoria("");
            }).catch((error) => {
                console.error(error)
                toast.error("Ocorreu um erro ao salvar Categoria de Serviço!");
            })
        }
    }

    const adicionarServico = (value) => {
        if (!isVazio(value)) { 
            let novoServico = {
                id: servicos.length,
                value: value,
                label: value
            }

            let servicosCopia = servicos;
            servicosCopia.push(servico);
            setServicos(servicosCopia)
            setServico(novoServico);
        }
    }

    const salvar = () => {
        if (isSelected(categoria, "Categoria do Serviço") &&
            !isVazio(servico, "Nome do Serviço") &&
            !isVazio(descricao, "Descrição do Serviço") &&
            !isVazio(preco, "Preço do Serviço") &&
            !isVazio(comissao, "Comissão do Serviço") &&
            !isVazio(duracao, "Duração do Serviço")
        ) {
            console.log(options.filter(o => o.label === categoria));
            console.log(servicos.filter(o => o.label === servico));
            let idCategoria = options.filter(o => o === categoria)[0].id;
            let nomeServico = servicos.filter(s => s === servico)[0].value;

            var url = !isAdicionar ? `/servico-preco/${idServico}` : `/servico-preco/${idEmpresa}/${idCategoria}`;
            var body = {
                "nome": nomeServico,
                "descricao": descricao,
                "preco": preco.replace("R$ ", "").replace(",", "."),
                "duracao": duracao,
                "comissao": comissao.replace(",", "."),
                "bitStatus": 1,
                "empresaId": idEmpresa,
            };

            api.post(url, body).then(() => {
                toast.success("Serviço adicionado com sucesso!");
                navigate("/servicos");
            }).catch((error) => {
                if (error.code === "ERR_NETWORK") {
                    toast.error("Ocorreu um erro ao tentar adicionar serviço!")
                } else {
                    const { response } = error;
                    const { data } = response;

                    if (data.status === 409) {
                        toast.error("Já existe um serviço com o nome selecionado!");
                    }
                }

                console.error(error);

            });
        }
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
                                titulo={isAdicionar ? "Adicionar Serviço" : "Editar Serviço"}
                            />
                        </div>
                        <form className={styles["informations-adicionar-servico"]}>
                            <SelectInput
                                id={"categoriaServico"}
                                tamanho={"lg"}
                                options={options}
                                valor={categoria}
                                alterarValor={setCategoria}
                                funcaoAdicionar={abrirModal}
                                titulo={"Categoria"}
                            />
                            <SelectInput
                                id="nomeServico"
                                tamanho={"lg"}
                                valor={servico}
                                placeholder={"Nome"}
                                alterarValor={setServico}
                                titulo={"Nome"}
                                validarEntrada={(e) => inputSomenteTexto(e)}
                                funcaoAdicionar={adicionarServico}
                                options={servicos}
                                maxlength={40}
                                minlength={5}
                            />
                            <Textarea
                                id={"descricaoServico"}
                                tamanho={"lg"}
                                valor={descricao}
                                alterarValor={setDescricao}
                                titulo={"Descrição"}
                                validarEntrada={(e) => inputSomenteTexto(e)}
                                maxlength={60}
                                minlength={5}
                            />
                            <div className={styles["group-input"]}>
                                <Input
                                    id={"precoServico"}
                                    tamanho={"lg"}
                                    titulo={"Preço"}
                                    valor={preco}
                                    alterarValor={setPreco}
                                    validarEntrada={inputValorMontario}
                                    maxlength={20}
                                    minlength={2}
                                />
                                <Input
                                    id="comissaoServico"
                                    tamanho={"lg"}
                                    titulo={"Comissão em %"}
                                    valor={comissao}
                                    alterarValor={setComissao}
                                    validarEntrada={inputValorPorcentagem}
                                    maxlength={6}
                                    minlength={1}
                                />
                            </div>
                            <Input
                                id="duracaoServico"
                                tamanho={"lg"}
                                titulo={"Duração em minutos"}
                                valor={duracao}
                                alterarValor={setDuracao}
                                validarEntrada={inputSomenteNumero}
                                maxlength={10}
                                minlength={1}
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
                                titulo={isAdicionar ? "Adicionar" : "Editar"}
                                icone={<FaCheck />}
                                cor={"roxo"}
                                funcaoButton={() => salvar()}
                            />
                        </div>
                    </div>
                </div>

                <ModalTemplate
                    aberto={modalAberto}
                    setAberto={setModalAberto}
                    corpo={corpoModal}
                    titulo={tituloModal}
                    tituloBotaoConfirmar={tituloBotao}
                    funcaoBotaoConfirmar={adicionarCategoria}
                />
            </section>

        </>
    );
}

export default AdicionarServico;