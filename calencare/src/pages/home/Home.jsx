import React from "react";
import styles from "./Home.module.css";
import Titulo from "../../components/titulo/Titulo";
import Navbar from "../../components/navbar/Navbar";
import imgInicio from "../../utils/assets/inicio.svg";


const Home = () => {
  return (
    <>
      <div className={styles["page-home"]}>
        <Navbar />
        <section className={styles["section-inicio"]}>
          <div className={styles["text"]}>
            <h1 className={styles["title"]}> Organizando seu negócio, sempre que <span className={styles["title-roxo"]}> você </span> quiser </h1>
          </div>
          <div className={styles["image"]}>
            <img src={imgInicio} alt="Ilustração mulher realizando agendamento" className={styles["img-inicio"]} />
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;