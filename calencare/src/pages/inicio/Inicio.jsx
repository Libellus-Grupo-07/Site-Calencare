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
import { isVazio, logado, transformarData, transformarDataBd, transformarDataHora, transformarDouble, transformarHora } from "../../utils/global";
import ModalTemplate from "../../components/modal-template/ModalTemplate";
import Input from "../../components/input/Input";
import SelectInput from "../../components/select-input/SelectInput";
import { toast } from "react-toastify";

const Inicio = () => {
    const navigate = useNavigate();
    const idEmpresa = sessionStorage.getItem("idEmpresa");
    const nome = sessionStorage.getItem("nomeUser");
    const [totalAgendamentosDia, setTotalAgendamentosDia] = useState("");
    const [potencialLucroDia, setPotencialLucroDia] = useState("");
    const [servicoMaisProcuradoDia, setServicoMaisProcuradoDia] = useState("");
    const [proximosAgendamentos, setProximosAgendamentos] = useState([]);
    const [agendamentosEmAndamento, setAgendamentosEmAndamento] = useState([]);
    const [modalFinalizarAberto, setModalFinalizarAberto] = useState(false);
    const [modalCancelarAberto, setModalCancelarAberto] = useState(false);
    const [descricaoAgendamento, setDescricaoAgendamento] = useState("");
    const [metodoPagamento, setMetodoPagamento] = useState("");
    const [agendamento, setAgendamento] = useState({});
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

    const abrirModalCancelar = (idAgendamento) => {
        if (!modalCancelarAberto) {
            let agendamento = agendamentosEmAndamento.length > 0 ? agendamentosEmAndamento.find(agendamento => agendamento.id === idAgendamento) ? agendamentosEmAndamento.find(agendamento => agendamento.id === idAgendamento) : proximosAgendamentos.find(agendamento => agendamento.id === idAgendamento) : proximosAgendamentos.find(agendamento => agendamento.id === idAgendamento);
            setAgendamento(agendamento);
            setDescricaoAgendamento(`${transformarData(agendamento.dtHora)} das ${transformarHora(agendamento.dtHora.substring(11, 16)).substring(0, 5)} às ${transformarHora(agendamento.horarioFinalizacao).substring(0, 5)}`);
        } else {
            setAgendamento({});
            setDescricaoAgendamento("");
        }

        setModalCancelarAberto(!modalCancelarAberto);
    }
    
    const abrirModalFinalizar = (idAgendamento) => {
        if (!modalFinalizarAberto) {
            let agendamento = agendamentosEmAndamento.find(agendamento => agendamento.id === idAgendamento);
            setAgendamento(agendamento)
        } else {
            setMetodoPagamento("");
        }

        setModalFinalizarAberto(!modalFinalizarAberto);
    }

    const cancelar = () => {
        api.put(`/agendamentos/cancelar/${agendamento.id}`).then(() => {
            toast.success("Agendamento cancelado com sucesso!");
            buscarAgendamentos(transformarDataBd(new Date()));
            abrirModalCancelar();
        }).catch((error) => {
            toast.error("Ocorreu um erro ao tentar cancelar agendamento. Tente novamente mais tarde.");
            console.log(error);
        });
    }


    const finalizar = () => {
        if (!isVazio(metodoPagamento, "Método de pagamento")) {	
            api.patch(`/agendamentos/finalizar/${agendamento.id}`, { metodoPagamento: metodoPagamento.value }).then(() => { 
                buscarAgendamentos(transformarDataBd(new Date()));
                toast.success("Agendamento finalizado com sucesso!");
                abrirModalFinalizar();
            }).catch((error) => {
                toast.error("Ocorreu um erro ao tentar finalizar agendamento. Tente novamente mais tarde.");
                console.log(error);
            })
        }
    }

    const corpoModalFinalizar = (
        <>
            <SelectInput
                titulo={"Método de Pagamento"}
                id={"metodoPagamento"}
                valor={metodoPagamento}
                alterarValor={setMetodoPagamento}
                options={optionsMetodoPagamento}
            />
        </>
    )

    const corpoModalCancelar = (
        <>
            <span style={{
                lineHeight: "1.5rem",
            }}>
                Você realmente deseja cancelar o agendamento que seria realizado na data "<b>{descricaoAgendamento}</b>"?
            </span>
        </>
    )

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }

        const data = transformarDataBd(new Date());

        buscarAgendamentos(data);

    }, [idEmpresa, navigate]);

    const buscarAgendamentos = (data) => { 
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
    }

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
                                                            funcaoConfirmar={() => navigate(`/agenda/editar/${agendamento.id}`)}
                                                            funcaoCancelar={() => abrirModalCancelar(agendamento.id)}
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
                                                        tituloBotaoConfirmar={"Finalizar"}
                                                        funcaoCancelar={() => abrirModalCancelar(agendamento.id)}
                                                        funcaoConfirmar={() => abrirModalFinalizar(agendamento.id)}
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
                aberto={modalFinalizarAberto}
                setAberto={abrirModalFinalizar}
                funcaoBotaoConfirmar={finalizar}
                corpo={corpoModalFinalizar}
                titulo={"Finalizar Agendamento"}
                tituloBotaoConfirmar={"Finalizar"}
                tamanho={"lg"}
            />
            <ModalTemplate
                aberto={modalCancelarAberto}
                setAberto={abrirModalCancelar}
                funcaoBotaoConfirmar={cancelar}
                corpo={corpoModalCancelar}
                titulo={"Cancelar Agendamento"}
                tituloBotaoCancelar={"Voltar"}
                tituloBotaoConfirmar={"Confirmar"}
                tamanho={"lg"}
            />
        </>
    )
}

export default Inicio;