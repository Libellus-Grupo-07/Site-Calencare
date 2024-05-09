import React from "react";
import styles from "./CardAgendamento.module.css";
import imgPerfilGradiente from "./../../utils/assets/perfil_gradiente.svg";
import imgPerfilRoxo from "./../../utils/assets/perfil_roxo.svg";
import { transformarDataHora, transformarDouble } from "../../utils/global";
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
}) => {
    const imgPerfil = cor === "branco" ? imgPerfilGradiente : imgPerfilGradiente;

    return (
        <>
            <div className={styles[`card-agendamento`]}>
                <div className={styles["informations-agendamento"]}>

                    <div className={styles["photo-funcionario"]}>
                        <img
                            className={styles["img-funcionario"]}
                            src={
                                imgFuncionario || imgPerfil
                            }
                            alt="Foto de perfil do funcionário"
                        />
                    </div>
                    <div className={styles["text-agendamento"]}>
                        <div className={styles["info-agendamento"]}>
                            <span className={styles["text-funcionario"]}>
                                {nomeFuncionario}
                            </span>
                            <span className={styles["text-horario"]}>
                                {transformarDataHora(dataHora)}
                            </span>
                        </div>
                        <div className={styles["info-servico"]}>
                            {nomeCliente ?
                                <span className={styles["text-cliente"]}> {nomeCliente} </span>
                                : ""
                            }
                            <span className={styles["text-servico"]}>
                                {nomeServico} / R$ {transformarDouble(precoServico)}
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles["group-buttons"]}>
                    <Button titulo="Cancelar" cor="branco" icone=
                        {
                            <div style={{
                                fontSize: "18px",
                                display: "flex",
                                alignItens: "center",
                                justifyContent: "center"
                            }}>
                                <TiCancel />
                            </div>
                        } />
                    <Button titulo="Ver Agendamento" cor="roxo" icone=
                        {
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