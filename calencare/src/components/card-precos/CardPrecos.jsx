import React from "react";
import styles from "./CardPrecos.module.css"
import { FaCircleCheck } from "react-icons/fa6";


const CardPrecos = ({ classe, nome, texto, preco, vantagem1, vantagem2, vantagem3, vantagem4 }) => {
    return (
        <>
            <div className={styles[`card-precos`]} id={styles[classe]}>
            {/* <div className={styles[`card-precos`]}> */}
                <div className={styles["card-text"]}>
                    <span className={styles["card-name"]}> {nome} </span>
                    <span className={styles["card-description"]}> {texto} </span>
                    <span className={styles["card-price"]}>
                        R$ {preco} 
                        <span className={styles["card-price-text"]}> / por mês </span>
                    </span>
                </div>
                <div className={styles["card-vantagens"]}>
                    <ul className={styles["card-list"]}>
                        <li className={styles["list-item"]}>
                            <FaCircleCheck className={styles["card-icon"]} />
                            <span className={styles["card-text"]}>
                                {vantagem1}
                            </span>
                        </li>
                        <li className={styles["list-item"]}>
                            <FaCircleCheck className={styles["card-icon"]} />
                            <span className={styles["card-text"]}>
                                {vantagem2}
                            </span>
                        </li>
                        <li className={styles["list-item"]}>
                            <FaCircleCheck className={styles["card-icon"]} />
                            <span className={styles["card-text"]}>
                                {vantagem3}
                            </span>
                        </li>
                        <li className={styles["list-item"]}>
                            <FaCircleCheck className={styles["card-icon"]} />
                            <span className={styles["card-text"]}>
                                {vantagem4}
                            </span>
                        </li>
                    </ul>

                </div>
                <div className={styles["card-assinar"]}>
                    <button className={styles["card-button"]}>
                        Assinar
                    </button>
                </div>
            </div>
        </>
    );
}

export default CardPrecos;