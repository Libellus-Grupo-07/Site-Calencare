import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import api from "../../api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import Titulo from "../../components/titulo/Titulo";
import Input from "../../components/input/Input";
import { inputSomenteTexto, logado,isVazio } from "../../utils/global";
import styles from "./AdicionarAgendamento.module.css";
import Ul from "../../components/ul/Ul";
import { TickSquare } from "react-iconly";
import SelectInput from "../../components/select-input/SelectInput";
import { FaCheck } from "react-icons/fa6";
import { TiCancel } from "react-icons/ti";


const AdicionarAgendamento = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isEditar = location.pathname === "/agendas";
    const { idAgenda } = useParams();
    const [nomeUser, setNomeUser] = useState("");
    const [cliente, setCliente] = useState("");
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

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }
        api.get(`/agendas/${idAgenda}`).then((response) => {
            const { data } = response;
            console.log(response);
            const {cliente, dataAgenda } = data;
            setCliente(cliente);
            setDataAgenda(dataAgenda);
        }).catch((error) => {
            console.log("Houve um erro ao buscar o agendamento");
            console.log(error);
        });
    }, [idAgenda]);

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

                            <Input
                                id="cliente"
                                valor={cliente}
                                alterarValor={setCliente}
                                titulo={"Cliente"}
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
            </section>

        </>
    );
};

export default AdicionarAgendamento;
