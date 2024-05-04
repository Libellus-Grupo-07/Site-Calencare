import React from "react";
import styles from "./CadastroEtapa3.module.css"
import DiaDaSemanaComponente from "../input-funcionamento/InputFuncionamento"
  
  const CadastroEtapa3 = () => {
    return (
      <div className={styles["tela-cadastro"]}>
        <div className={styles["container-cadastro"]}>
          <div className={styles["text"]}>
            <DiaDaSemanaComponente diaSemana="Segunda" />
            <DiaDaSemanaComponente diaSemana="Terça" />
            <DiaDaSemanaComponente diaSemana="Quarta" />
            <DiaDaSemanaComponente diaSemana="Quinta" />
            <DiaDaSemanaComponente diaSemana="Sexta" />
            <DiaDaSemanaComponente diaSemana="Sábado" />
            <DiaDaSemanaComponente diaSemana="Domingo" />
          </div>
        </div>
      </div>
    );
  }

export default CadastroEtapa3;
