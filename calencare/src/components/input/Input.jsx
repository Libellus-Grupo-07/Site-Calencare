import React from "react";
import styles from "./Input.module.css";

const Input = ({ valor, titulo, type, alterarValor }) => {
    const mudarValor = (e) => {
        alterarValor(e.target.value);
    }

    return (
        <>
            <div className={styles["componet-input"]}>
                <label>
                    <span className={styles["titulo-input"]}>{titulo}</span>
                </label>
                <input
                    type={type}
                    value={valor}
                    placeholder={titulo}
                    onChange={(e) => mudarValor(e)}
                    required
                />
            </div>

        </>
    );
}

export default Input;