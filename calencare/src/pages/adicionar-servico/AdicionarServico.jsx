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

    const buscarCategoriasServico = (action) => {
        api.get("/categoria-servico").then((response) => {
            const { data } = response;
            console.log("Resposta => " + data.length);
            mapear("categoria-servico", data, action === "I" ? data.length : 0);

        }).catch((error) => {
            console.error("Houve um erro ao buscar Categorias de Serviço => " + error);
        });
    }

    const buscarServicos = (action) => {
        api.get("/servicos").then((response) => {
            const { data } = response;
            mapear("servico", data, action === "I" ? data.length : 0);
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
            console.error("Houve um erro ao buscar a empresa")
            console.error(error)
        })
    }, []);

    useEffect(() => {
        buscarCategoriasServico("C");
        buscarServicos("C");

        if (!isAdicionar) {
            console.log("isEditar")
            console.warn(servicos)

            api.get(`/servico-preco/${idEmpresa}/${idServico}`).then((response) => {
                const { data } = response;
                const { nome, descricao, preco, comissao, duracao, descricaoStatus } = data;
                console.warn(servicos);
                console.warn(nome)
                var a = servicos.filter(s => s.value === nome);
                console.error(a);
                console.error(servico)
                setDescricao(descricao);
                setPreco("R$ " + preco.toFixed(2).replace(".", ","));
                setComissao(comissao.toFixed(2).replace(".", ",") + "%");
                setDuracao(duracao);
                setServico(nome);
                setCategoria(descricao);
            }).catch((error) => {
                console.log("Houve um erro ao buscar serviço");
                console.error(error)
            })
        }
    }, [idEmpresa]);


    

    const mapear = (campo, data, index) => {
        var optionsMap = [];
        let i = 0;

        console.log(data);
        for (i = 0; i < data.length; i++) {
            optionsMap.push({
                id: data[i].id,
                label: data[i].nome,
                value: data[i].nome,
            })
        }

        console.log(index)
        i = index === 0 ? index - 1 : i;
        console.log(i);

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

    const isAdicionarServicoValid = (value) => {
        if (isSelected(categoria, "Categoria do Serviço") &&
            !isVazio(value, "Nome do Serviço")
        ) {
            return true;
        }

        return false;
    }

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

        console.log("Função Adicionar Serviço: ")
        if (isAdicionarServicoValid(value)) {
            let idCategoria = options.filter(o => o.label === categoria)[0].id;
            var body = {
                nome: value,
                categoriaId: idCategoria
            }

            api.post(`/servicos/${idCategoria}`, body).then((response) => {
                buscarServicos("I");
            }).catch((error) => {
                console.error("Houve um erro ao adicionar serviço!");
                console.error(error);
            });
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
            let idCategoria = options.filter(o => o.label === categoria)[0].id;
            let idServico = servicos.filter(s => s.label === servico)[0].id;
            var url = !isAdicionar ? `/servico-preco/${idServico}` : `/servico-preco/${idEmpresa}/${idCategoria}`;
            var body = {
                "nome": servico,
                "descricao": descricao,
                "preco": preco.replace("R$ ", "").replace(",", "."),
                "duracao": duracao,
                "comissao": comissao.replace(",", "."),
                "bitStatus": 1,
                "empresaId": idEmpresa,
                "servicoId": idServico
            };

            api.post(url, body).then(() => {
                toast.success("Serviço adicionado com sucesso!");
                navigate("/servicos");
            }).catch((error) => {
                toast.error("Houve um erro ao tentar adicionar serviço!");
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