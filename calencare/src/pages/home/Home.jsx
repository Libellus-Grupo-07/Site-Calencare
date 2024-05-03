import React from "react";
import styles from "./Home.module.css";
import Titulo from "../../components/titulo/Titulo";
import Navbar from "../../components/navbar/Navbar";
import imgInicio from "../../utils/assets/img_inicio.png";
import Footer from "../../components/footer/Footer";
import Button from "../../components/button/Button";
import imgBeneficios1 from "../../utils/assets/beneficios_1.png";
import imgBeneficios2 from "../../utils/assets/beneficios_2.png";
import imgBeneficios3 from "../../utils/assets/beneficios_3.png";
import CardBeneficios from './../../components/card-beneficios/CardBeneficios';
import { SiGooglecalendar, SiSpring, SiMicrosoftsqlserver } from "react-icons/si";
import { FaReact } from "react-icons/fa6";
import CardPrecos from './../../components/card-precos/CardPrecos';
import CarouselProduto from './../../components/carousel-produto/CarouselProduto';

const Home = () => {
  return (
    <>
      <div className={styles["page-home"]}>
        <Navbar />
        <section className={styles["section-inicio"]} id="inicio">
          <div className={styles["container-inicio"]}>
            <div className={styles["text"]}>
              <h1 className={styles["title"]}> Organizando seu negócio, sempre <br /> que <span className={styles["title-roxo"]}> você </span> quiser </h1>
              <div className={styles["button"]}>
                <Button titulo="Começar" cor="roxo" />
              </div>
            </div>
            <div className={styles["image"]}>
              <img src={imgInicio} alt="Ilustração mulher realizando agendamento" className={styles["img-inicio"]} />
            </div>
          </div>
        </section>
        <section className={styles["section-produto"]} id="produto">
          <div className={styles["container-produto"]}>
            <Titulo titulo="Produto" />
            <div className="carousel">
              <CarouselProduto/>
            </div>
          </div>
        </section>
        <section className={styles["section-beneficios"]} id="beneficios">
          <div className={styles["beneficios"]}>
            <Titulo titulo="Benefícios" />
            <div className={styles["container-cards"]}>
              <CardBeneficios
                titulo="Atendimento Otimizados"
                imagem={imgBeneficios1}
                texto="Gerenciar os agendamentos e otimizar tempo e recursos, aumentando a produtividade e o alcance de objetivos."
              />
              <CardBeneficios
                titulo="Controle de Finanças"
                imagem={imgBeneficios2}
                texto="Gerenciar o fluxo de receitas e despesas de forma eficiente na mesma ferramenta para alcançar objetivos financeiros."
              />
              <CardBeneficios
                titulo="Organização dos Atendimentos"
                imagem={imgBeneficios3}
                texto="
                Gerenciar o fluxo de clientes de forma eficiente, otimizando o tempo e melhorando a experiência do cliente."
              />
            </div>
          </div>
          <div className={styles["tecnologias"]}>
            <Titulo titulo="Tecnologias Utilizadas" />
            <div className={styles["container-cards"]}>
              <div className={styles["card-tecnologias"]}>
                <div className={styles["icon"]}>
                  <SiGooglecalendar />
                </div>
                <span className={styles["card-title"]}>
                  Google Calendar
                </span>
              </div>
              <div className={styles["card-tecnologias"]}>
                <div className={styles["icon"]}>
                  <FaReact />
                </div>
                <span className={styles["card-title"]}>
                  React
                </span>
              </div>
              <div className={styles["card-tecnologias"]}>
                <div className={styles["icon"]}>
                  <SiSpring />
                </div>
                <span className={styles["card-title"]}>
                  Spring Boot
                </span>
              </div>
              <div className={styles["card-tecnologias"]}>
                <div className={styles["icon"]}>
                  <SiMicrosoftsqlserver />
                </div>
                <span className={styles["card-title"]}>
                  MS SQL Server
                </span>
              </div>

            </div>
          </div>
        </section>
        <section className={styles["section-precos"]}>
          <Titulo titulo="Preços" />
          <div className={styles["container-precos"]}>
            <CardPrecos
              classe="branco"
              nome="Plano Básico"
              texto="A escolha perfeita para aquele que mora sozinho."
              preco="39,99"
              vantagem1="XXXXXX"
              vantagem2="XXXXXX"
              vantagem3="XXXXXX"
              vantagem4="XXXXXX"
            />
            <CardPrecos
              classe="preto"
              nome="Plano Profissional"
              texto="A escolha perfeita para aquele que mora sozinho."
              preco="69,99"
              vantagem1="XXXXXX"
              vantagem2="XXXXXX"
              vantagem3="XXXXXX"
              vantagem4="XXXXXX"
            />
            <CardPrecos
              classe="branco"
              nome="Plano Empreendedor"
              texto="A escolha perfeita para aquele que mora sozinho."
              preco="109,99"
              vantagem1="XXXXXX"
              vantagem2="XXXXXX"
              vantagem3="XXXXXX"
              vantagem4="XXXXXX"
            />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Home;