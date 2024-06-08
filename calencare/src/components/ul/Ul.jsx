import React from "react";
import styles from "./Ul.module.css";
import { TickSquare, IconlyProvider } from "react-iconly";

const Ul = ({ items, titulo, servicosSelecionados, toggleServico, nomeCampo }) => {
    return (
        <div className={styles["servicos-container"]}>
            <span className={styles["titulo-input"]}>{titulo}</span>
            <div className={styles["servicos-input"]}>
                <div className={styles["servicos-grid"]}>
                    {items.map((item, index) => (
                        <div key={index}
                            className={`${styles["servico-item"]} ${servicosSelecionados.includes(item) ? styles["selected"] : ""}`}
                            onClick={() => toggleServico(item)}
                        >
                            <IconlyProvider
                                stroke="bold"
                            set={servicosSelecionados.includes(item) ? "bold" : "light border"}

                            
                            >
                                <TickSquare strokeColor={servicosSelecionados.includes(item) ? "#000000" : undefined} />
                            </IconlyProvider>
                            <span className={servicosSelecionados.includes(item) ? styles["selected-text"] : ""}>{ nomeCampo ? item.nomeServico : item.nome} - R$ {item.preco.toFixed(2).replace(".", ",")} </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Ul;
