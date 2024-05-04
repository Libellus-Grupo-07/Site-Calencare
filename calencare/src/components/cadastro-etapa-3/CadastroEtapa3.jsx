import React from "react";
import Input from "../input/Input";
import styles from "./CadastroEtapa3.module.css"
import CustomSwitch from "../button-switch/Switch"
import DiaDaSemanaComponente from "../input-funcionamento/InputFuncionamento"


const CadastroEtapa3 = () => {

  
  return (

    <div className={styles["tela-cadastro"]}>
      <div className={styles["container-cadastro"]}>
        <DiaDaSemanaComponente
          diaSemana="Segunda"
        />
        <DiaDaSemanaComponente
          diaSemana="Terça"
        />
        <DiaDaSemanaComponente
          diaSemana="Quarta"
        />
        <DiaDaSemanaComponente
          diaSemana="Quinta"
        />
        <DiaDaSemanaComponente
          diaSemana="Sexta"
        />
        <DiaDaSemanaComponente
          diaSemana="Sábado"
        />
        <DiaDaSemanaComponente
          diaSemana="Domingo"
        />
      </div>
    </div>

  );
}

export default CadastroEtapa3;
