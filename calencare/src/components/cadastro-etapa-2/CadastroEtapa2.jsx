import React from "react";
import Input from "../../components/input/Input";
import styles from "./CadastroEtapa2.module.css"
import CustomSwitch from "../button-switch/Switch"
import DiaDaSemanaComponente from "../input-funcionamento/InputFuncionamento"


const CadastroEtapa2 = () => {
    return (

        <div className={styles["tela-cadastro"]}>
                    <div className={styles["container-cadastro"]}>
                        
                    <p>Informe os dados da <b>funcionamento</b> para começar a realizar os agendamentos.</p>
                    <CustomSwitch/>
                    <DiaDaSemanaComponente
  diaSemana="Segunda-feira"
  horario1={new Date()}
  horario2={new Date()}
  onChange={(horario) => console.log('Horário selecionado:', horario)}
/>
                    </div>
                    </div>

);
}

export default CadastroEtapa2;
