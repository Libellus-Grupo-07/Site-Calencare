import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import styles from "./Dashboard.module.css";
import Titulo from './../../components/titulo/Titulo';
import Button from './../../components/button/Button';
import { Download, IconlyProvider, Ticket, Work, User } from "react-iconly";
import CardKpi from './../../components/card-kpi/CardKpi';
import { CiMoneyBill } from "react-icons/ci";
import Input from "../../components/input/Input";
import api from "../../api";
import { logado } from "../../utils/global";
import { useNavigate } from "react-router-dom";
import CardTop3 from '../../components/card-top-3/CardTop3';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import { Bar } from "react-chartjs-2"

Chart.register(CategoryScale);

const Dashboard = () => {
    const navigate = useNavigate();
    const idEmpresa = sessionStorage.idEmpresa;
    const [agendamentosTotalDoDia, setAgendamentosTotalDoDia] = useState(0);
    const [lucroTotalDoDia, setLucroTotalDoDia] = useState(0);
    const [servicoMaisAgendado, setServicoMaisAgendado] = useState("");
    const [dataSelecionada, setDataSelecionada] = useState(new Date());
    const [top3Servicos, setTop3Servicos] = useState([]);
    const [top3Profissionais, setTop3Profissionais] = useState([]);
    const [top3Clientes, setTop3Clientes] = useState([]);
    const [calendarioAberto, setCalendarioAberto] = useState(false);
    const [dadosAgendamentosPorProfissional, setDadosAgendamentosPorProfissional] = useState(false);
    const [dadosGraficoBarra, setDadosGraficoBarra] = useState([])

    const [chartData, setChartData] = useState({
        labels: ["Nome"],
        datasets: [
            {
                label: "Agendamentos no Dia",
                data: [0],
                backgroundColor: [
                    "#9F35F0",
                    "#3545F0",
                    "#6134EF",
                    "#C085EF",
                    "#8758EA",
                    "#F036A5",
                    "#DB35EF",
                    "#51BDE9",
                    "#5EA4EA",
                    "#35F0E9",
                    "#F1AA36"
                ],
                borderColor: "transparent",
                borderWidth: 2
            }
        ]
    });

    // const abrirCalendario = () => {
    //     setCalendarioAberto(!calendarioAberto);
    // }

    useEffect(() => {
        if (!logado(sessionStorage.token)) {
            navigate("/login")
        }

        api.get(`/dashboard/agendamentos-por-profissional/${idEmpresa}`).then((response) => {
            const { data } = response;
            console.log(data)
            // setDadosGraficoBarra(data)
            gerarGraficoBarra(data);
        }).catch((error) => {
            console.error(error);
        })

        api.get(`/dashboard/lucro-total/${idEmpresa}`).then((response) => {
            const { data } = response;
            const { AgendamentosConfirmados, LucroTotalDoDia } = data;
            setAgendamentosTotalDoDia(AgendamentosConfirmados);
            setLucroTotalDoDia(LucroTotalDoDia || 0)
        }).catch((error) => {
            console.error(error);
        })

        api.get(`/dashboard/servico-mais-procurado-rentabilidade/${idEmpresa}`).then((response) => {
            const { data } = response;
            const { servico } = data[0]
            setServicoMaisAgendado(servico);
        }).catch((error) => {
            console.error(error);
        })

        api.get(`/dashboard/top3-servicos/${idEmpresa}`).then((response) => {
            const { data } = response;
            setTop3Servicos(data || [])
            console.log(data)
        }).catch((error) => {
            console.error(error);
        })

        api.get(`/dashboard/top3-profissionais/${idEmpresa}`).then((response) => {
            const { data } = response;
            setTop3Profissionais(data || []);
        }).catch((error) => {
            console.error(error);
        })

        api.get(`/dashboard/top3-clientes/${idEmpresa}`).then((response) => {
            const { data } = response;
            setTop3Clientes(data || []);
        }).catch((error) => {
            console.error(error);
        })

    }, [idEmpresa, navigate]);

    const gerarGraficoBarra = (dadosAgendamentosPorProfissional) => {
        setChartData({
            labels: dadosAgendamentosPorProfissional.map((s) => s.nome),
            datasets: [
                {
                    label: "Agendamentos no Dia",
                    data: dadosAgendamentosPorProfissional.map((s) => s.count),
                    backgroundColor: [
                        "rgba(159, 53, 240, 0.15)",
                        "rgba(53, 69, 240, 0.15)",

                        "rgba(97, 52, 239, 0.15)",

                        "rgba(192, 133, 239, 0.15)",
                        "rgba(135, 88, 234, 0.15)",
                        "rgba(240, 54, 165, 0.15)",
                        "rgba(219, 53, 239, 0.15)",
                        "rgba(81, 189, 233, 0.15)",
                        "rgba(94, 164, 234, 0.15)",
                        "rgba(53, 240, 233, 0.15)",
                        "rgba(241, 170, 54, 0.15)"
                    ],
                    borderColor: [
                        "#9F35F0",
                        "#3545F0",
                        "#6134EF",
                        "#C085EF",
                        "#8758EA",
                        "#F036A5",
                        "#DB35EF",
                        "#51BDE9",
                        "#5EA4EA",
                        "#35F0E9",
                        "#F1AA36"
                    ],
                    borderWidth: 2
                }
            ]
        })
    }


    return (
        <>
            <section className={styles["section-dashboard"]}>
                <div>
                    <Header />
                </div>
                <div className={styles["container-dashboard"]}>
                    <div className={styles["content-dashboard"]}>
                        <div className={styles["titulo-dashboard"]}>
                            <Titulo titulo="Dashboard" tamanho={"md"} />
                            <div className={styles["group-button"]}>
                                <Button
                                    titulo={"Baixar Relatório"}
                                    cor={"branco"}
                                    icone={
                                        <IconlyProvider
                                            size={"medium"}
                                        >
                                            <Download />
                                        </IconlyProvider>
                                    }
                                />
                                <div>
                                    <Input
                                        valor={dataSelecionada}
                                        type={"date"}
                                        alterarValor={setDataSelecionada}
                                        cor={"roxo"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles["group-kpis"]}>
                            <div className={styles["card-kpi"]}>
                                <CardKpi
                                    legenda={"Agendamentos Total do Dia"}
                                    valor={agendamentosTotalDoDia}
                                    icon={
                                        <IconlyProvider
                                            stroke="bold"
                                            size={"large"}
                                        >
                                            <Ticket />
                                        </IconlyProvider>
                                    }
                                />
                            </div>
                            <div className={styles["card-kpi"]}>
                                <CardKpi
                                    legenda={"Lucro Total do Dia"}
                                    valor={lucroTotalDoDia.toFixed(2).replace(".", ",")}
                                    icon={
                                        <CiMoneyBill style={{
                                            fontSize: "2.5rem",
                                            textAlign: "center",
                                            display: "flex",
                                            stroke: "var(--roxo-principal)",
                                            strokeWidth: "0.5px"
                                        }} />
                                    }
                                />
                            </div>
                            <div className={styles["card-kpi"]}>
                                <CardKpi
                                    legenda={"Serviço Mais Agendado"}
                                    valor={servicoMaisAgendado}
                                    icon={
                                        <IconlyProvider
                                            stroke="bold"
                                            size={"large"}
                                        >
                                            <Work />
                                        </IconlyProvider>
                                    }
                                />
                            </div>
                        </div>
                        <div className={styles["group-dashboard"]}>
                            <div className={styles["card-dashboard"]}>
                                <span className={styles["title-chart"]}>
                                    Agendamentos no Dia Por Profissional
                                </span>
                                <Bar
                                    data={chartData}
                                    options={{
                                        plugins: {
                                            title: {
                                                display: false
                                            },
                                            legend: {
                                                display: false,
                                            },
                                            subtitle: {
                                                display: false
                                            },
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className={styles["group-top3"]}>
                            <div className={styles["card-top3"]}>
                                <CardTop3
                                    legenda={"Top 3 Serviços Mais Utilizados"}
                                    icon={
                                        <IconlyProvider
                                            stroke="bold"
                                            size={"medium"}
                                        >
                                            <Work />
                                        </IconlyProvider>
                                    }
                                    vetor={top3Servicos.map((itemAtual) => {
                                        return itemAtual.servico;
                                    })}
                                />
                            </div>
                            <div className={styles["card-top3"]}>
                                <CardTop3
                                    legenda={"Top 3 Profissionais Mais Agendados"}
                                    icon={
                                        <IconlyProvider
                                            stroke="bold"
                                            size={"medium"}
                                        >
                                            <User />
                                        </IconlyProvider>
                                    }
                                    vetor={top3Profissionais.map((itemAtual) => {
                                        return itemAtual.profissional ? itemAtual.profissional.slice(0, itemAtual.profissional.indexOf(" ") + 2) + "." : "";
                                        // return itemAtual.profissional;
                                    })}
                                />
                            </div>
                            <div className={styles["card-top3"]}>
                                <CardTop3
                                    legenda={"Top 3 Clientes Mais Frequentes"}
                                    icon={
                                        <IconlyProvider
                                            stroke="bold"
                                            size={"medium"}
                                        >
                                            <User />
                                        </IconlyProvider>
                                    }
                                    vetor={top3Clientes.map((itemAtual) => {
                                        return itemAtual.cliente ? itemAtual.cliente.indexOf(" ") !== -1 ? itemAtual.cliente.slice(0, itemAtual.cliente.indexOf(" ") + 2) + "." : itemAtual.cliente : "";
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </section >

        </>
    );
}

export default Dashboard;