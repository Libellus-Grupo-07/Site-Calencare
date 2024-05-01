import React, { Component } from "react";
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import styles from "./CarouselProduto.module.css";
import imgCarrossel1 from "./../../utils/assets/carrossel_1.png";
import imgCarrossel2 from "./../../utils/assets/carrossel_2.png";
import imgCarrossel3 from "./../../utils/assets/carrossel_3.png";
import { Carousel } from 'react-responsive-carousel';

class CarouselProduto extends Component {
    
    render() {

        const indicatorStyles = {
            background: 'rgba(159, 53, 240, 0.15)',
            width: 10,
            height: 10,
            display: 'inline-block',
            margin: '0 8px',
            color: '#9F36F0',
            border: '1.5px solid rgba(159, 53, 240, 0.5)',
            borderRadius: '1rem',
            transition: '0.3s ease-in-out',
            cursor: 'pointer'
        };

        return (
            <Carousel
                showStatus={false}
                showArrows={false}
                autoPlay={true}
                interval={1000}
                renderIndicator={(onClickHandler, isSelected, index, label) => {
                    if (isSelected) {
                        return (
                            <li
                                style={{ ...indicatorStyles, background: '#9F36F0', width: 14, height: 14 }}
                                aria-label={`Selected: ${label} ${index + 1}`}
                                title={`Selected: ${label} ${index + 1}`}
                            />
                        );
                    }
                    return (
                        <li
                            style={indicatorStyles}
                            onClick={onClickHandler}
                            onKeyDown={onClickHandler}
                            value={index}
                            key={index}
                            role="button"
                            tabIndex={0}
                            aria-label={`${label} ${index + 1}`} />
                    )
                }}
            >
                <div className={styles["card-carousel"]}>
                    <div className={styles["image-carousel"]}>
                        <img src={imgCarrossel1} alt="Tela de Adicionar Profissional" />
                    </div>
                    <div className={styles["text-carousel"]}>
                        <span className={styles["text"]}>

                        Adicione e faça a gestão dos seus funcionários
                        </span>
                    </div>
                </div>
                <div className={styles["card-carousel"]}>
                    <div className={styles["image-carousel"]}>
                        <img src={imgCarrossel2} alt="Tela de Agenda da Semana" />
                    </div>
                    <div className={styles["text-carousel"]}>
                        <span className={styles["text"]}>

                        Adicione e faça a gestão dos seus funcionários
                        </span>
                    </div>
                </div>
                <div className={styles["card-carousel"]}>
                    <div className={styles["image-carousel"]}>
                        <img src={imgCarrossel3} alt="Tela de Dashboard de Agendamentos" />
                    </div>
                    <div className={styles["text-carousel"]}>
                        <span className={styles["text"]}>

                        Adicione e faça a gestão dos seus funcionários
                        </span>
                    </div>
                </div>
            </Carousel>
        );
    }
};

export default CarouselProduto;