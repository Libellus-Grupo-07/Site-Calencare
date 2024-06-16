import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import AgendaDoDia from "../../components/agenda-do-dia/AgendaDoDia";
import api from "../../api";
import styles from "./Agenda.module.css";
import { logado, transformarDataBd } from "../../utils/global";
import { useNavigate } from "react-router-dom";
import { AddUser, Edit, IconlyProvider } from "react-iconly";
import Button from "../../components/button/Button";
import Titulo from "../../components/titulo/Titulo";
import CardAgendamento from "../../components/card-agendamento/CardAgendamento";
import Swal from "sweetalert2";
import { Tooltip } from 'react-tooltip'
import Input from "../../components/input/Input";
import fechado from "../../utils/assets/fechado.svg";



const Agenda = () => {
    const navigate = useNavigate();
    const idEmpresa = sessionStorage.getItem("idEmpresa");
    const [matriz, setMatriz] = useState([]);
    const [agendamento, setAgendamento] = useState({});
    const [dadosAgendamento, setDadosAgendamento] = useState({});

    const [nomeFuncionario, setNomeFuncionario] = useState("");
    const [dataHora, setDataHora] = useState(new Date());
    const [nomeServico, setNomeServico] = useState("");
    const [precoServico, setPrecoServico] = useState(0);
    const [horaFinalizacao, setHoraFinalizacao] = useState(new Date());
    const [funcaoCancelar, setFuncaoCancelar] = useState(0);
    const [ident, setIdent] = useState(0);

    const [dataSelecionada, setDataSelecionada] = useState(new Date());

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }

        buscarAgenda(dataSelecionada);
    }, [dataSelecionada]);

    const buscarAgenda = (dia) => {
        setDataSelecionada(dia)
        setMatriz([]);
        let dataFormatada = transformarDataBd(dia);

        api.get(`/agendamentos/matriz/empresa/${idEmpresa}/data/${dataFormatada}`).then((response) => {
            const { data } = response;
            console.log(data);
            setMatriz(data);
        }).catch((error) => {
            console.error("Houve um erro ao buscar agendamentos");
            console.error(error)
        })
    }

    const buscarInfoAgenda = (id) => {
        api.get(`/agendamentos/empresa/${idEmpresa}/id/${id}`).then((response) => {
            const { data } = response;
            console.log("Exibir card do agendamento de id: " + id);
            setAgendamento(data);
            const { nomeFuncionario, dtHora, nomeServico, preco, ident, horarioFinalizacao } = data;
            setNomeFuncionario(nomeFuncionario);
            setDataHora(dtHora);
            setNomeServico(nomeServico);
            setPrecoServico(preco);
            setIdent(ident);
            setHoraFinalizacao(horarioFinalizacao);
            //console.log(this)

            //document.getElementById("card").style.visibility = "visible";
        }).catch((error) => {
            console.error("Houve um erro ao buscar agendamento");
            console.error(error)
        })


    }

    const cancelar = (idAgendamento) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn-roxo",
                cancelButton: "btn-branco",
                title: "title-modal",
                text: "text-modal",
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Cancelamento de Agendamento",
            text: `Você realmente deseja cancelar o agendamento?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
            showCloseButton: true,
            reverseButtons: true,
            width: "35vw",
        }).then((result) => {
            if (result.isConfirmed) {
                // api.delete(`/funcionarios/${idUser}`).then((response) => {
                //     swalWithBootstrapButtons.fire({
                //         title: "Exclusão de Conta",
                //         text: "Agendamento cancelado com sucesso.",
                //         icon: "success"
                //     });
                // }).catch((error) => {
                //     swalWithBootstrapButtons.fire({
                //         title: "Exclusão de Conta",
                //         text: "Não foi possível cancelar o agendamento.",
                //         icon: "error"
                //     });
                //     console.error("Houve um erro ao tentar excluir a conta")
                //     console.log(error)
                // })
            }
        });
    }

    return (
        <>
            <section className={styles["section-agenda"]}>
                <div>
                    <Header />
                </div>
                <div className={styles["container-agenda"]}>

                    <div className={styles["content-agenda"]}>
                        <div className={styles["header"]}>
                            <Titulo tamanho={"md"} titulo={"Agenda"} />
                            <div className={styles["group-button"]}>
                                <Button
                                    funcaoButton={() => navigate("/agenda/adicionar")}
                                    cor="roxo"
                                    titulo={"Adicionar"}
                                    icone={<IconlyProvider
                                        stroke="bold"
                                        size="small"
                                    >
                                        <AddUser />
                                    </IconlyProvider>
                                    }
                                />

                                <Input
                                    valor={dataSelecionada}
                                    type={"date"}
                                    alterarValor={buscarAgenda}
                                    cor={"roxo"} 
                                />

                            </div>
                        </div>
                        <div className={styles["table-agenda"]}>
{
                                matriz.length === 0 ?
                                <div className={styles["sem-agendamentos"]}>
                                    <div>
                                    <img className={styles["imagem"]} src={fechado} alt="" />
                                    </div>
                                    <div>
                                        <span>Empresa fechada para o dia selecionado!</span>
                                    </div>
                                </div>
                                :
                                <AgendaDoDia
                                agenda={matriz}
                                buscarInfoAgenda={buscarInfoAgenda}
                            />
}

                            
                        </div>
                    </div>
                </div>

                <Tooltip
                    id="my-tooltip"
                    style={{ backgroundColor: "rgba(91, 91, 91, 0.0)" }}
                    opacity={1}
                    clickable
                    className={styles["example-no-radius"]}>
                    <CardAgendamento
                        tamanho={"md"}
                        cor={"branco"}
                        nomeFuncionario={nomeFuncionario}
                        dataHora={dataHora}
                        nomeServico={nomeServico}
                        precoServico={precoServico}
                        horaFinalizacao={horaFinalizacao}
                        funcaoCancelar={() => cancelar(ident)}
                    />
                </Tooltip>
            </section>
        </>
    );
};

export default Agenda;