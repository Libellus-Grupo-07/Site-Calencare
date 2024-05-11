import React from "react";
import styles from "./CardAgendamento.module.css";
import imgPerfilGradiente from "./../../utils/assets/perfil_gradiente.svg";
import imgPerfilRoxo from "./../../utils/assets/perfil_roxo.svg";
import { transformarDataHora, transformarDouble, transformarHora } from "../../utils/global";
import Button from './../button/Button';
import { TiCancel } from "react-icons/ti";
import { Ticket, IconlyProvider } from "react-iconly"

const CardAgendamento = ({
    tamanho,
    cor,
    imgFuncionario,
    nomeFuncionario,
    dataHora,
    nomeCliente,
    nomeServico,
    precoServico,
    funcaoCancelar
}) => {
    const imgPerfil = cor === "branco" ? imgPerfilGradiente : imgPerfilRoxo;

    return (
        <>
                <div
                    className={styles[`card-agendamento`]}
                    id={styles[cor]}
                    style={
                        {

                        }
                    }
                >
                    <div className={styles["informations-agendamento"]}>
                        <div className={styles["photo-funcionario"]}>
                            <img
                                className={styles["img-funcionario"]}
                                src={
                                    imgFuncionario || imgPerfil
                                }
                                alt="Foto de perfil do funcionário"
                                style={{
                                    width: tamanho ? "48px" : "",
                                    height: tamanho ? "48px" : "",
                                    borderRadius: tamanho ? "0.3rem" : ""
                                }}
                            />
                        </div>
                        <div
                            className={styles["text-agendamento"]}
                            style={{
                                rowGap: tamanho ? "4px" : ""
                            }}
                        >
                            <div
                                className={styles["info-agendamento"]}
                            >
                                <span
                                    className={styles["text-funcionario"]}
                                    style={{
                                        fontSize: tamanho ? "16px" : ""
                                    }}
                                >
                                    {nomeFuncionario}
                                </span>
                                <span
                                    className={styles["text-horario"]}
                                    style={{
                                        padding: tamanho ? "8px 0" : "",
                                        backgroundColor: tamanho ? "transparent" : ""
                                    }}
                                >
                                    {tamanho ?
                                        transformarHora(dataHora.toString().substring(11, 16)).substring(0, 5) : transformarDataHora(dataHora)}

                                    {tamanho ?
                                        " às " + transformarHora(dataHora.toString().substring(11, 16)).substring(0, 5) : ""}
                                </span>
                            </div>
                            <div
                                className={styles["info-servico"]}
                            >
                                {nomeCliente ?
                                    <span className={styles["text-cliente"]}> {nomeCliente} </span>
                                    : ""
                                }
                                <span
                                    className={styles["text-servico"]}
                                    style={{
                                        fontSize: tamanho ? "14px" : "",
                                        letterSpacing: tamanho ? "-0.02rem" : ""
                                    }}>
                                    {nomeServico} / R${transformarDouble(precoServico)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div
                        className={styles["group-buttons"]}
                        style={{
                            padding: tamanho ? "12px 0 0 0" : ""
                        }}
                    >
                        <Button
                            funcaoButton={funcaoCancelar}
                            tamanho={tamanho}
                            titulo="Cancelar"
                            cor={cor === "branco" ? cor : "cinza"}
                            icone=
                            {tamanho ? "" :
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
                            titulo="Ver Agendamento"
                            cor="roxo"
                            tamanho={tamanho}
                            icone={tamanho ? "" :
                                <IconlyProvider
                                    stroke="bold"
                                    size="small"
                                >
                                    <Ticket />
                                </IconlyProvider>
                            } />
                    </div>
                </div>
        </>
    );
}

export default CardAgendamento;