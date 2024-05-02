import React from "react";
import Input from "../input/Input";
import styles from "./CadastroEtapa3.module.css"
import CustomSwitch from "../button-switch/Switch"
import DiaDaSemanaComponente from "../input-funcionamento/InputFuncionamento"


const CadastroEtapa3 = () => {
  return (

    <div className={styles["tela-cadastro"]}>
      <div className={styles["container-cadastro"]}>
        <CustomSwitch />
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

export default CadastroEtapa3;
