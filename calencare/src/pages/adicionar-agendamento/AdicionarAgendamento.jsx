import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import api from "../../api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import Titulo from "../../components/titulo/Titulo";
import Input from "../../components/input/Input";
import { inputSomenteTexto, logado, isVazio, isValidEmail, transformarHora, transformarData, transformarDataHora } from "../../utils/global";
import styles from "./AdicionarAgendamento.module.css";
import Ul from "../../components/ul/Ul";
import SelectInput from "../../components/select-input/SelectInput";
import { FaCheck } from "react-icons/fa6";
import { TiCancel } from "react-icons/ti";
import ModalTemplate from "../../components/modal-template/ModalTemplate";
import { toast } from "react-toastify";


const AdicionarAgendamento = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isEditar = location.pathname === "/agendas";
    const [dadosClientes, setDadosClientes] = useState([]);
    const [dadosProfissionais, setDadosProfissionais] = useState([]);

    const { idAgenda } = useParams();
    const idEmpresa = sessionStorage.getItem("idEmpresa");
    const [cliente, setCliente] = useState();
    const [clientes, setClientes] = useState([]);
    const [nomeCliente, setNomeCliente] = useState("");
    const [sobrenomeCliente, setSobrenomeCliente] = useState("");
    const [emailCliente, setEmailCliente] = useState("");
    const [telefoneCliente, setTelefoneCliente] = useState("");
    // const [dataNascimentoCliente, setDataNascimentoCliente] = useState("");
    const [modalAberto, setModalAberto] = useState(false);
    const [data, setData] = useState("");
    // const [cliente, setCliente] = useState("");
    const [dataAgenda, setDataAgenda] = useState("");
    const [hora, setHora] = useState("");
    const [dia, setDia] = useState("");
    const [profissonais, setProfissionais] = useState([]);
    const [Profissional, setProfissional] = useState("")
    const [servicosSelecionados, setServicosSelecionados] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }
        api.get(`/servico-preco/${idEmpresa}`).then((response) => {
            const { data } = response;
            console.log(response);
            setItems(data.length === 0 ? [] : data)

        }).catch((error) => {
            console.log("Houve um erro ao buscar o serviço");
            console.log(error);
        });

        api.get(`/funcionarios/empresa?idEmpresa=${idEmpresa}`).then((response) => {
            const { data } = response;
            console.log(response);
            mapear(data, 0, "profissional")
            setDadosProfissionais(data)

        }).catch((error) => {
            console.log("Houve um erro ao buscar um funcionario");
            console.log(error);
        });

        buscarClientes(0)

    }, [navigate, idEmpresa]);

    const validarAgenda = () => {
        if (
            !isVazio(cliente, "Cliente") &&
            !isVazio(Profissional, "profissional") &&
            !isVazio(servicosSelecionados, "Serviços que realiza") &&
            !isVazio(data, "Data")
        ) {
            return true;
        }

        return false;
    };

    const toggleServico = (item) => {
        if (servicosSelecionados.includes(item)) {
            setServicosSelecionados(servicosSelecionados.filter(servico => servico !== item));
        } else {
            setServicosSelecionados([...servicosSelecionados, item]);
        }
    };


    const corpoModal = (
        <>
            <Input
                id={"nomeCliente"}
                titulo={"Nome"}
                valor={nomeCliente}
                alterarValor={setNomeCliente}
                maxlength={40}
                minlength={3}
                validarEntrada={inputSomenteTexto}
            />

            <Input
                id={"sobrenomeCliente"}
                titulo={"Sobrenome"}
                valor={sobrenomeCliente}
                alterarValor={setSobrenomeCliente}
                maxlength={40}
                minlength={3}
                validarEntrada={inputSomenteTexto}
            />
            <Input
                id={"emailCliente"}
                titulo={"Email"}
                placeholder={"Email"}
                valor={emailCliente}
                alterarValor={setEmailCliente}
                maxlength={60}
                minlength={3}
            />
            <Input
                id={"telefoneCliente"}
                titulo={"Telefone"}
                valor={telefoneCliente}
                alterarValor={setTelefoneCliente}
                mascara={"(00) 00000-0000"}
            />
            {/* <Input
                id={"dataNascimentoCliente"}
                titulo={"Data de Nascimento"}
                valor={dataNascimentoCliente}
                alterarValor={setDataNascimentoCliente}
                type={"date"}
            /> */}
        </>
    )

    const abrirModal = (value) => {
        setModalAberto(!modalAberto);
        setNomeCliente(value)
    }

    const validarCadastroCliente = () => {
        if (!isVazio(nomeCliente, "Nome do Cliente") &&
            !isVazio(sobrenomeCliente, "Sobrenome do Cliente") &&
            (emailCliente === "" || (
                !isVazio(emailCliente, "Email do Cliente") && isValidEmail(emailCliente, "Email do Cliente")
            )) &&
            !isVazio(telefoneCliente, "Telefone do Cliente")
            // && !isVazio(dataNascimentoCliente, "Data de Nascimento do Cliente")
        ) {
            return true;
        }

        return false
    }

    const atualizarClientes = (novoCliente) => {
         setClientes([...clientes, novoCliente]); // Adicione o novo cliente à lista de clientes
         setCliente(novoCliente); // Defina o novo cliente como o cliente selecionado
    };

    const adicionarCliente = () => {
        if (validarCadastroCliente()) {
            let body = {
                nome: nomeCliente,
                sobrenome: sobrenomeCliente,
                telefone: telefoneCliente,
                email: emailCliente,
                empresaId: idEmpresa,
                // "dtNascimento": dataNascimentoCliente
            }

            api.post("/clientes", body).then(() => {
                setNomeCliente("");
                setSobrenomeCliente("");
                setEmailCliente("");
                setTelefoneCliente("");
                // setDataNascimentoCliente("");
                toast.success("Cliente adicionado com sucesso!");
                abrirModal();
                buscarClientes(dadosClientes.length)
            }).catch((error) => {
                toast.error("Houve um erro ao tentar adicionar cliente");
                console.error("Houve um erro ao tentar adicionar cliente!");
                console.error(error)
            })
          
            /*api.post("/clientes", body)
                .then((response) => {
                    setNomeCliente("");
                    setSobrenomeCliente("");
                    setEmailCliente("");
                    setTelefoneCliente("");
                    setDataNascimentoCliente("");
                    toast.success("Cliente adicionado com sucesso!");
                    abrirModal();
                    const novoCliente = {
                        id: response.data.id,
                        label: nomeCliente,
                        value: nomeCliente
                    };
                    atualizarClientes(novoCliente);
                    setCliente(novoCliente);
                    //abrirModal(novoCliente);
                }).catch((error) => {
                    toast.error("Houve um erro ao tentar adicionar cliente");
                    console.error("Houve um erro ao tentar adicionar cliente!");
                    console.error(error)
                }) */
        }
    }


    const buscarClientes = (index) => {
        api.get(`/clientes/listar/${idEmpresa}`).then((response) => {
            const { data } = response;
            console.log(data);
            mapear(data, index, "cliente");
            setDadosClientes(data)
        }).catch((error) => {
            console.log("Houve um erro ao buscar clientes");
            console.log(error);
        });
    }

    const mapear = (data, index, nomeVetor) => {
        var dataMapp = [];

        if (nomeVetor === "cliente") {
            dataMapp.push({
                //id: data[i].id,
                label: "Criar",
                value: "Criar"
            })
        }

        let i = 0;

        for (i = 0; i < data.length; i++) {
            dataMapp.push({
                id: data[i].id,
                index: i,
                label: data[i].nome + " " + data[i].sobrenome,
                value: data[i].nome + " " + data[i].sobrenome,
            })
        }

        i = index === 0 ? index - 1 : i;

        if (nomeVetor === "cliente") {
            setClientes(dataMapp);
            setCliente(dataMapp[i]);
        } else {
            setProfissionais(dataMapp);
            setProfissional(dataMapp[i]);
        }
    }

    const handleSave = () => {
        console.log(cliente)

        if (validarAgenda()) {
            for (let index = 0; index < servicosSelecionados.length; index++) {
                let dataHora = dataAgenda + "T" + hora;
                let AgendaAdicionado = {
                    idServicoPreco: servicosSelecionados[index].id,
                    //dtHora: transformarDataHora(dataAgenda),
                    dtHora: dataHora,
                    dia: transformarData(data),
                    horario: transformarHora(hora),
                    bitStatus: 1,
                    cliente: dadosClientes[cliente.index],
                    profissional: dadosProfissionais[Profissional.index]
                }

                api.post(`/agendamentos/${Profissional.id}/${cliente.id}/${servicosSelecionados[index].id}`, AgendaAdicionado).then((response) => {
                    const { data } = response;
                    const { id } = data;
                    toast.success("Agendamento adicionada com sucesso!");
                    sessionStorage.setItem("editado", JSON.stringify(AgendaAdicionado));
                    navigate("/agendas");

                    console.log("Json de servico adicionado " + JSON.stringify(AgendaAdicionado));

                }).catch((error) => {
                    console.error(error)
                    toast.error("Ocorreu um erro ao adicionar os dados, por favor, tente novamente.");
                })
            }
        };
    }

    return (
        <>
            <section className={styles["section-adicionar-agenda"]}>
                <div>
                    <Header />
                </div>
                <div className={styles["container-adicionar-agenda"]}>
                    <div className={styles["content-adicionar-agenda"]}>
                        <div className={styles["header"]}>
                            <Titulo tamanho={"md"} titulo={isEditar ? "Editar Agendamento" : "Adicionar Agendamento"} />
                        </div>
                        <div className={styles["informations-adicionar-agenda"]}>

                            <SelectInput
                                id="cliente"
                                valor={cliente}
                                alterarValor={setCliente}
                                titulo={"Cliente"}
                                options={clientes}
                                funcaoAdicionar={abrirModal}

                            />

                            <Ul className={styles["servicos-grid"]}
                                titulo={"Serviços"}
                                items={items}
                                servicosSelecionados={servicosSelecionados}
                                toggleServico={toggleServico}
                                nomeCampo={undefined}
                            />
                            <SelectInput
                                id={"profissional"}
                                tamanho={"lg"}
                                options={profissonais}
                                valor={Profissional}
                                alterarValor={setProfissional}
                                titulo={"Profissional"}


                            />
                            <Input
                                id="data"
                                valor={dataAgenda}
                                type={"datetime-local"}
                                alterarValor={setDataAgenda}
                                titulo={"Data e Hora"}
                                tamanho={"lg"}
                            />
                            <div className={styles["group-input"]}>
                                <Input
                                    id="data"
                                    valor={dia}
                                    type={"date"}
                                    alterarValor={setDia}
                                    titulo={"Data"}
                                    tamanho={"lg"}

                                />
                                <Input
                                    id="hora"
                                    valor={hora}
                                    type={"hora"}
                                    alterarValor={setHora}
                                    titulo={"Hora"}
                                    tamanho={"lg"}
                                />
                            </div>

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
                                funcaoButton={handleSave}
                                titulo={isEditar ? "Editar" : "Adicionar"}
                                icone={<FaCheck />}
                                cor={"roxo"}
                            />
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
                        titulo={"Adicionar Cliente"}
                        tituloBotaoConfirmar={"Adicionar"}
                        funcaoBotaoConfirmar={adicionarCliente}
                    />
                </div>
            </section>

        </>
    );
};


export default AdicionarAgendamento;
