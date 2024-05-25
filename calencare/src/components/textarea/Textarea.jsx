import React from "react";
import styles from "./Textarea.module.css";

const Textarea = ({ id, valor, titulo, type, alterarValor, validarEntrada, funcao, readonly, mascara }) => {
    const mudarValor = (e) => {
        alterarValor(e.target.value);
    }

    return (
        <>
            <div className={styles["componet-input"]}>
                <label for={id}>
                    <span
                        className={styles["titulo-input"]}
                    >{titulo}</span>
                </label>
                <textarea
                    id={id}
                    type={type}
                    value={valor}
                    placeholder={titulo}
                    onChange={(e) => mudarValor(e)}
                    onInput={validarEntrada ? (e) => validarEntrada(e) : null}
                    onKeyUp={funcao}
                    required
                    readOnly={readonly || false}
                />

            </div>

        </>
    );
}

export default Textarea;