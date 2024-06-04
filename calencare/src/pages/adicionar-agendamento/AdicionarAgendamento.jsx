import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import api from "../../api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import Titulo from "../../components/titulo/Titulo";
import Input from "../../components/input/Input";
import { inputSomenteTexto, logado, isVazio, isValidEmail } from "../../utils/global";
import styles from "./AdicionarAgendamento.module.css";
import Ul from "../../components/ul/Ul";
import { TickSquare } from "react-iconly";
import SelectInput from "../../components/select-input/SelectInput";
import { FaCheck } from "react-icons/fa6";
import { TiCancel } from "react-icons/ti";
import ModalTemplate from "../../components/modal-template/ModalTemplate";
import { toast } from "react-toastify";


const AdicionarAgendamento = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isEditar = location.pathname === "/agendas";
    const [dados, setDados] = useState("");

    const { idAgenda } = useParams();
    const [nomeUser, setNomeUser] = useState("");
    const idUser = sessionStorage.getItem("idUser");
    const [cliente, setCliente] = useState();
    const [clientes, setClientes] = useState([]);
    const [nomeCliente, setNomeCliente] = useState("");
    const [sobrenomeCliente, setSobrenomeCliente] = useState("");
    const [emailCliente, setEmailCliente] = useState("");
    const [telefoneCliente, setTelefoneCliente] = useState("");
    const [dataNascimentoCliente, setDataNascimentoCliente] = useState("");
    const [modalAberto, setModalAberto] = useState(false);
    const [nome, setNome] = useState("");
    const [data, setData] = useState("");
    // const [cliente, setCliente] = useState("");
    const [dataAgenda, setDataAgenda] = useState("");
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
    const items = [];

    const validarAgenda = () => {
        if (!isVazio(cliente, "Cliente")
            && !isVazio(dataAgenda, "Data")
            && !isVazio(options, "Tipo de Perfil")
            && !isVazio(tipoPerfil, "Tipo de Perfil")
            && !isVazio(servicosSelecionados, "Serviços que realiza")
        ) {
            return true;
        }

        return false;
    }

    const toggleServico = (item) => {
        if (servicosSelecionados.includes(item)) {
            setServicosSelecionados(servicosSelecionados.filter(servico => servico !== item));
        } else {
            setServicosSelecionados([...servicosSelecionados, item]);
        }
    };

    const tituloModal = "Adicionar Cliente";
    const tituloBotao = "Adicionar";
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
                titulo={"Email (Opcional)"}
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
            <Input
                id={"dataNascimentoCliente"}
                titulo={"Data de Nascimento"}
                valor={dataNascimentoCliente}
                alterarValor={setDataNascimentoCliente}
                type={"date"}
            />
        </>
    )

    const abrirModal = (value) => {
        setModalAberto(!modalAberto);
        setNomeCliente(value)
    }

    const validarCadastroCliente = () => {
        if (!isVazio(nomeCliente, "Nome do Cliente") &&
            !isVazio(sobrenomeCliente, "Sobrenome do Cliente") &&
            (emailCliente == "" || (
            !isVazio(emailCliente, "Email do Cliente") && isValidEmail(emailCliente, "Email do Cliente")
            )) &&
            !isVazio(telefoneCliente, "Telefone do Cliente") &&
            !isVazio(dataNascimentoCliente, "Data de Nascimento do Cliente")
        ) {
            return true;
        }

        return false
    }

    const adicionarCliente = () => {
        if (validarCadastroCliente()) {
            let body = {
                "nome": nomeCliente,
                // "sobrenome": sobrenomeCliente,
                "telefone": telefoneCliente,
                "email": emailCliente,
                // "dtNascimento": dataNascimentoCliente
            }

            api.post("/clientes", body).then(() => {
                setNomeCliente("");
                setSobrenomeCliente("");
                setEmailCliente("");
                setTelefoneCliente("");
                setDataNascimentoCliente("");
                toast.success("Cliente adicionado com sucesso!");
                abrirModal();
                buscarClientes()
            }).catch((error) => {
                toast.error("Houve um erro ao tentar adicionar cliente");
                console.error("Houve um erro ao tentar adicionar cliente!");
                console.error(error)
            })
        }
    }

    const buscarClientes = (index) => {
        api.get(`/clientes/${sessionStorage.getItem("idEmpresa")}`).then((response) => {
            const { data } = response;
            console.log(data);
            mapear(data, index);

        }).catch((error) => {
            console.log("Houve um erro ao buscar clientes");
            console.log(error);
        });
    }

    useEffect(() => {
        api.get(`/servico-preco/${idEmpresa}`).then((response) => {
            const { dataServico } = response;
            mapearServico(dataServico); 
            console.log(dataServico);
        }).catch((error) => {
            console.log("Houve um erro ao buscar um serviço");
            console.log(error);
        });
    }, []);
    
// const mapearServico = (dataServico) => {
//     const ServicosMapeados = dataServico.map(servico => ({
//         id: servico.id,
//         label: servico.servico,
//         value: servico.servico
//     }));
//     setDados(ServicosMapeados);
// };
const mapearServico = (dataServico) => {
    var ServicosMapeados = []
    for (var index = 0; index < dataServico.length; index++) {
      var dadoAtual = []
      dadoAtual.push(dataServico[index].id)  
      dadoAtual.push(dataServico[index].servico) 
    }
    setDados(ServicosMapeados)
    
}

    // useEffect(() => {
    //     if (!logado(sessionStorage.getItem("token"))) {
    //         navigate("/login");
    //         return;
    //     }
      
        // api.get(`/agendas/${idUser}`).then((response) => {
        //     const { data } = response;
        //     console.log(response);
        //     const { nome } = data;
        //     setNomeUser(nome);
        // }).catch((error) => {
        //     console.log("Houve um erro ao buscar o funcionário");
        //     console.log(error);
        // });
        
        buscarClientes(0)


    }, [idUser]);

    const mapear = (data, index) => {
        var dataMapp = [];
        let i = 0;

        for (i = 0; i < data.length; i++){
            dataMapp.push({
                id: data[i].id,
                label: data[i].nome,
                value: data[i].nome
            })
        }

        i = index === 0 ? index - 1 : i;
        console.log(i);
        setClientes(dataMapp);
        setCliente(dataMapp[i]);
    }

    const handleSave = () => {
        var url = isEditar ? `/agendas/${idAgenda}` : "/agendas"
        const objetoAdicionado = {
            cliente,
            dataAgenda,
            options,
            tipoPerfil,
            servicosSelecionados
        };
        if (validarAgenda()) {
            api.post(url, objetoAdicionado).then(() => {
                toast.success("Agenda adicionada com sucesso!");
                sessionStorage.setItem("editado", JSON.stringify(objetoAdicionado));
                navigate("/agendas");
            }).catch(() => {
                toast.error("Ocorreu um erro ao adicionar os dados, por favor, tente novamente.");
            })
        }
    };

    return (
        <>
            <section className={styles["section-adicionar-agenda"]}>
                <div>
                    <Header nomeUser={nomeUser} />
                </div>
                <div className={styles["container-adicionar-agenda"]}>
                    <div className={styles["content-adicionar-agenda"]}>
                        <div className={styles["header"]}>
                            <Titulo tamanho={"md"} titulo={isEditar ? "Editar Agendamento" : "Adicionar Agendamento"} />
                        </div>
                        <div className={styles["informations-adicionar-agenda"]}>

                            <SelectInput
                                id="cliente"
                                // valor={cliente}
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
                            />
                            <SelectInput
                                id={"tipoPerfil"}
                                tamanho={"lg"}
                                options={options}
                                valor={tipoPerfil}
                                alterarValor={setTipoPerfil}
                                titulo={"Profissional"}

                            />

                            <Input
                                id="data"
                                valor={data}
                                type={"date"}
                                alterarValor={setData}
                                titulo={"Data"}
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
                        titulo={tituloModal}
                        tituloBotaoConfirmar={tituloBotao}
                        funcaoBotaoConfirmar={adicionarCliente}
                    />
                </div>
            </section>

        </>
    );
};

export default AdicionarAgendamento;
