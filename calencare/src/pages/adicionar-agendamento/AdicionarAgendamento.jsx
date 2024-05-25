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
    const titulo = location.pathname === "/agenda/adicionar" ? "Adicionar Agendamento" : "Editar Agendamento";
    const [nomeUser, setNomeUser] = useState("");
    const idUser = sessionStorage.getItem("idUser");
    const [cliente, setCliente] = useState("");
    const [data, setData] = useState("");
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
    const [tipoPerfil, setTipoPerfil] = useState(options[0]);
    const [servicosSelecionados, setServicosSelecionados] = useState([]);
    const items = [
        "Coloração - R$ 45,00",
        "Hidratação - R$ 45,00",
        "Pé e Mão - R$ 57,00",
        "Corte - R$ 45,00",
        "Maquiagem - R$ 35,00",
        "Unha de Gel - R$ 100,00",
        "Depilação - R$ 45,00",
        "Massagem - R$ 200,00"
    ];

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
        api.get(`/agendas/${idUser}`).then((response) => {
            const { data } = response;
            console.log(response);
            const { nome } = data;
            setNomeUser(nome);
        }).catch((error) => {
            console.log("Houve um erro ao buscar o funcionário");
            console.log(error);
        });
    }, [idUser]);




    return (
        <>
            <section className={styles["section-adicionar-agenda"]}>
                <div>
                    <Header nomeUser={nomeUser} />
                </div>
                <div className={styles["container-adicionar-agenda"]}>
                    <div className={styles["content-adicionar-agenda"]}>
                        <div className={styles["header"]}>
                            <Titulo tamanho={"md"} titulo={titulo} />
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
};

export default AdicionarAgendamento;
