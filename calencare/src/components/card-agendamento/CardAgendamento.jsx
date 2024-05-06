import React from "react";
import styles from "./CardAgendamento.module.css";
import imgPerfilGradiente from "./../../utils/assets/perfil_gradiente.svg";
import imgPerfilRoxo from "./../../utils/assets/perfil_roxo.svg";

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
            <div className={styles[`card-agendamento ${tamanho} ${cor}`]}>
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
                            { nomeFuncionario }
                        </span>
                        <span className={styles["text-horario"]}>
                            { dataHora }
                        </span>
                    </div>
                    <div className={styles["info-servico"]}>
                        {nomeCliente ?
                            <span className={styles["text-cliente"]}> {nomeCliente} </span>
                            : ""
                        }
                        <span className={styles["text-servico"]}>
                            {nomeServico} / R$ {precoServico}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardAgendamento;