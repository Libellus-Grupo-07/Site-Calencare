import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Titulo from "../../components/titulo/Titulo";
import Header from "../../components/header/Header";
import api from "../../api";
import styles from "./Inicio.module.css";
import { IconlyProvider, Notification, Calendar, Buy, Work } from "react-iconly";
import { CiMoneyBill } from "react-icons/ci";
import { Icon } from '@iconify-icon/react';
import CardKpi from "../../components/card-kpi/CardKpi";
import CardAgendamento from './../../components/card-agendamento/CardAgendamento';
import { logado, transformarDataBd, transformarDouble } from "../../utils/global";
import Swal from "sweetalert2";

const Inicio = () => {
    const navigate = useNavigate();
    const idUser = sessionStorage.getItem("idUser");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [totalAgendamentosDia, setTotalAgendamentosDia] = useState("");
    const [potencialLucroDia, setPotencialLucroDia] = useState("");
    const [servicoMaisProcuradoDia, setServicoMaisProcuradoDia] = useState("");
    const [proximosAgendamentos, setProximosAgendamentos] = useState([]);
    const [agendamentosEmAndamento, setAgendamentosEmAndamento] = useState([]);

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

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }

        const data = transformarDataBd(new Date());

        api.get(`/funcionarios/${idUser}`).then((response) => {
            const { data } = response;
            const { nome, email, telefone } = data;
            setNome(nome);
            setEmail(email);
            setTelefone(telefone);
        }).catch((error) => {
            console.log("Houve um erro ao buscar o funcionário");
            console.log(error);
        });

        api.get(`/agendamentos/total?data=${data}`).then((response) => {
            const { data } = response;
            setTotalAgendamentosDia(data)
        }).catch((error) => {
            console.log("Houve um erro ao tentar buscar quantidade de agendamentos do dia");
            console.log(error);
        })

        api.get(`/agendamentos/lucro?data=${data}`).then((response) => {
            const { data } = response;
            console.log("potencial lucro")
            console.log(data);
            setPotencialLucroDia(data)
        }).catch((error) => {
            console.log("Houve um erro ao tentar buscar potencial lucro do dia");
            console.log(error);
        })

        api.get(`/agendamentos/proximos`).then((response) => {
            const { data } = response;
            console.log(data);
            setProximosAgendamentos(data);
        }).catch((error) => {
            console.log("Houve um erro ao buscar próximos agendamentos")
            console.log(error);
        });

        api.get(`/agendamentos/em-andamento`).then((response) => {
            const { data } = response;
            console.log("em andamento")
            console.log(data);
            setAgendamentosEmAndamento(data);
        }).catch((error) => {
            console.log("Houve um erro ao buscar agendamentos em andamentos")
            console.log(error);
        });


        api.get(`/aservico-mais-procurado`).then((response) => {
            const { data } = response;
            console.log(data);
            setServicoMaisProcuradoDia(data);
        }).catch((error) => {
            console.log("Houve um erro ao buscar agendamentos em andamentos")
            console.log(error);
        });


    }, [idUser]);

    return (
        <>
            <section className={styles["section-inicio"]}>
                <div>
                    <Header nomeUser={nome} />
                </div>
                <div className={styles["container-inicio"]}>
                    <div className={styles["content-inicio"]}>
                        <div className={styles["titulo-inicio"]}>
                            <Titulo tamanho={"md"} titulo={`Olá, ${nome}!`} />
                            <IconlyProvider
                                stroke="bold"
                                size={"large"}
                            >
                                <Notification />
                            </IconlyProvider>
                        </div>
                        <div className={styles["group-kpis"]}>
                            <CardKpi
                                icon={
                                    <IconlyProvider
                                        stroke="bold"
                                        size="large"
                                    >
                                        <Calendar />
                                    </IconlyProvider>
                                }
                                legenda={"Total De Agendamentos Hoje"}
                                valor={totalAgendamentosDia}
                            />
                            <CardKpi
                                icon={
                                    <Icon
                                        icon="fluent:money-16-regular" width="40" height="40" />
                                }
                                legenda={"Potencial Lucro Para Hoje"}
                                valor={potencialLucroDia.length == 0 ? "R$ 0,00" : "R$" + transformarDouble(potencialLucroDia)}
                            />
                            <CardKpi
                                icon={
                                    <IconlyProvider
                                        stroke="bold"
                                        size="large"
                                    >
                                        <Work />
                                    </IconlyProvider>
                                }
                                legenda={"Serviço Mais Procurado Hoje"}
                                valor={servicoMaisProcuradoDia || "Nenhum"}
                            />
                        </div>
                        <div className={styles["container-agendamentos"]}>
                            <div className={styles["proximos-agendamentos"]}>
                                <div className={styles["titulo"]}>
                                    <Titulo tamanho={"md"} titulo={"Próximos Agendamentos"} />
                                </div>
                                {
                                    proximosAgendamentos.length == 0 ?
                                        <span className={styles["text-sem-agendamentos"]}>
                                            Sem agendamentos marcados
                                        </span> :
                                        <div className={styles["group-proximos-agendamentos"]}>
                                            {
                                                proximosAgendamentos.map((agendamento, index) => (
                                                    <div key={index}>
                                                        <CardAgendamento
                                                            cor={"branco"}
                                                            nomeFuncionario={agendamento.nomeFuncionario}
                                                            dataHora={agendamento.dtHora}
                                                            nomeCliente={agendamento.nomeCliente}
                                                            nomeServico={agendamento.nomeServico}
                                                            precoServico={agendamento.preco}
                                                        />
                                                    </div>

                                                ))
                                            }
                                        </div>
                                }
                            </div>
                            <div className={styles["agendamentos-em-andamento"]}>
                                <div className={styles["titulo"]} >
                                    <Titulo tamanho={"sm"} titulo={"Agendamentos em andamento"} cor={"branco"} />
                                </div>
                                {agendamentosEmAndamento.length === 0 ?
                                    <span className={styles["text-sem-agendamentos"]}>
                                        Sem agendamentos em andamento
                                    </span> :
                                    <div className={styles["group-agendamentos-em-andamento"]}>
                                        {
                                            agendamentosEmAndamento.map((agendamento, index) => (
                                                <div className={styles["container-card"]} key={index}>
                                                    <CardAgendamento
                                                        tamanho={"md"}
                                                        cor={"cinza"}
                                                        nomeFuncionario={agendamento.nomeFuncionario}
                                                        dataHora={agendamento.dtHora}
                                                        nomeServico={agendamento.nomeServico}
                                                        precoServico={agendamento.preco}
                                                        funcaoCancelar={() => cancelar(agendamento.id)}
                                                    />
                                                </div>

                                            ))
                                        }
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default Inicio;