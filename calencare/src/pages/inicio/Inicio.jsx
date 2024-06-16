import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Titulo from "../../components/titulo/Titulo";
import Header from "../../components/header/Header";
import api from "../../api";
import styles from "./Inicio.module.css";
import { IconlyProvider, Notification, Calendar, Work } from "react-iconly";
import { Icon } from '@iconify-icon/react';
import CardKpi from "../../components/card-kpi/CardKpi";
import CardAgendamento from './../../components/card-agendamento/CardAgendamento';
import { logado, transformarDataBd, transformarDouble } from "../../utils/global";
import ModalTemplate from "../../components/modal-template/ModalTemplate";
import Input from "../../components/input/Input";
import SelectInput from "../../components/select-input/SelectInput";

const Inicio = () => {
    const navigate = useNavigate();
    const idEmpresa = sessionStorage.getItem("idEmpresa");
    const nome = sessionStorage.getItem("nomeUser");
    const [totalAgendamentosDia, setTotalAgendamentosDia] = useState("");
    const [potencialLucroDia, setPotencialLucroDia] = useState("");
    const [servicoMaisProcuradoDia, setServicoMaisProcuradoDia] = useState("");
    const [proximosAgendamentos, setProximosAgendamentos] = useState([]);
    const [agendamentosEmAndamento, setAgendamentosEmAndamento] = useState([]);
    const [modalFinalizarAgendamento, setModalFinalizarAgendamento] = useState([]);
    const [metodoPagamento, setmetodoPagamento] = useState("");
    const [optionsMetodoPagamento, setOptionsMetodoPagamento] = useState([
        {
            label: "Cartão de Crédito",
            value: "Cartão de Crédito"
        },
        {
            label: "Cartão de Débito",
            value: "Cartão de Débito"
        },
        {
            label: "Dinheiro",
            value: "Dinheiro"
        },
        {
            label: "PIX",
            value: "PIX"
        }
    ]);

    const cancelar = (idAgendamento) => {
        alert(idAgendamento)
        // const swalWithBootstrapButtons = Swal.mixin({
        //     customClass: {
        //         confirmButton: "btn-roxo",
        //         cancelButton: "btn-branco",
        //         title: "title-modal",
        //         text: "text-modal",
        //     },
        //     buttonsStyling: false
        // });
        // swalWithBootstrapButtons.fire({
        //     title: "Cancelamento de Agendamento",
        //     text: `Você realmente deseja cancelar o agendamento?`,
        //     icon: "warning",
        //     showCancelButton: true,
        //     confirmButtonText: "Sim",
        //     cancelButtonText: "Não",
        //     showCloseButton: true,
        //     reverseButtons: true,
        //     width: "35vw",
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         // api.delete(`/funcionarios/${idUser}`).then((response) => {
        //         //     swalWithBootstrapButtons.fire({
        //         //         title: "Exclusão de Conta",
        //         //         text: "Agendamento cancelado com sucesso.",
        //         //         icon: "success"
        //         //     });
        //         // }).catch((error) => {
        //         //     swalWithBootstrapButtons.fire({
        //         //         title: "Exclusão de Conta",
        //         //         text: "Não foi possível cancelar o agendamento.",
        //         //         icon: "error"
        //         //     });
        //         //     console.error("Houve um erro ao tentar excluir a conta")
        //         //     console.log(error)
        //         // })
        //     }
        // });
    }

    const finalizar = (idAgendamento) => {

    }

    const corpoModalFinalizar = (
        <>
            <SelectInput
                titulo={"Método de Pagamento"}
                id={"metodoPagamento"}

                options={optionsMetodoPagamento}
            />
        </>
    )

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }

        const data = transformarDataBd(new Date());

        api.get(`/agendamentos/total/empresa?data=${data}&empresaId=${idEmpresa}`).then((response) => {
            const { data } = response;
            setTotalAgendamentosDia(data)
        }).catch((error) => {
            console.log("Houve um erro ao tentar buscar quantidade de agendamentos do dia");
            console.log(error);
        })

        api.get(`/agendamentos/potencial-lucro?data=${data}&empresaId=${idEmpresa}`).then((response) => {
            const { data } = response;
            console.log("potencial lucro")
            console.log(data);
            setPotencialLucroDia(data)
        }).catch((error) => {
            console.log("Houve um erro ao tentar buscar potencial lucro do dia");
            console.log(error);
        })

        api.get(`/agendamentos/proximos/empresa?empresaId=${idEmpresa}`).then((response) => {
            const { data } = response;
            setProximosAgendamentos(data);
        }).catch((error) => {
            console.log("Houve um erro ao buscar próximos agendamentos")
            console.log(error);
        });

        api.get(`/agendamentos/pendentes/${idEmpresa}`).then((response) => {
            const { data } = response;
            setAgendamentosEmAndamento(data);
        }).catch((error) => {
            console.log(error);
        });


        api.get(`/agendamentos/servico-mais-procurado/empresa?empresaId=${idEmpresa}`).then((response) => {
            const { data } = response;
            setServicoMaisProcuradoDia(data);
        }).catch((error) => {
            console.log(error);
        });


    }, [idEmpresa]);

    return (
        <>
            <section className={styles["section-inicio"]}>
                <div>
                    <Header />
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
                            <div className={styles["card-kpi"]}>
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
                            </div>
                            <div className={styles["card-kpi"]}>
                                <CardKpi
                                    icon={
                                        <Icon
                                            icon="fluent:money-16-regular" width="40" height="40" />
                                    }
                                    legenda={"Potencial Lucro Para Hoje"}
                                    valor={potencialLucroDia.length === 0 ? "R$ 0,00" : "R$" + transformarDouble(potencialLucroDia)}
                                />
                            </div>
                            <div className={styles["card-kpi"]}>
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
                        </div>
                        <div className={styles["container-agendamentos"]}>
                            <div className={styles["proximos-agendamentos"]}>
                                <div className={styles["titulo"]}>
                                    <Titulo tamanho={"md"} titulo={"Próximos Agendamentos"} />
                                </div>
                                {
                                    proximosAgendamentos.length === 0 ?
                                        <span className={styles["text-sem-agendamentos"]}>
                                            Sem agendamentos marcados
                                        </span> :
                                        <div className={styles["group-proximos-agendamentos"]}>
                                            {
                                                proximosAgendamentos.map((agendamento, index) => (
                                                    <div style={{ width: "95%" }} key={index}>
                                                        <CardAgendamento
                                                            cor={"branco"}
                                                            // tamanho={"md"}
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
                                    <Titulo tamanho={"sm"} titulo={"Pendentes de Conclusão"} cor={"branco"} />
                                </div>
                                {agendamentosEmAndamento.length === 0 ?
                                    <span className={styles["text-sem-agendamentos"]}>
                                        Sem agendamentos pendentes de conclusão
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
                                                        horaFinalizacao={agendamento.horarioFinalizacao}
                                                        funcaoCancelar={() => cancelar(agendamento.id)}
                                                        funcaoBotaoConfirmar={() => cancelar(agendamento.id)}
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
            <ModalTemplate
                aberto={modalFinalizarAgendamento}
                setAberto={() => setModalFinalizarAgendamento(!modalFinalizarAgendamento)}
                funcaoBotaoConfirmar={finalizar}
                corpo={corpoModalFinalizar}
                titulo={"Finaliar Agendamento"}
                tituloBotaoConfirmar={"Finalizar"}
                tamanho={"lg"}
            />
        </>
    )
}

export default Inicio;