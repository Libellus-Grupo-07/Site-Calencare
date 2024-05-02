import React from "react";
import styles from "./Input.module.css";

const Input = ({ valor, titulo, type, id }) => {
    return (
        <>
            <div className={styles["componet-input"]}>
                <label>
                    <span className={styles["titulo-input"]}>{titulo}</span>
                </label>
                <input
                    id={id}
                    type={type}
                    value={valor}
                    placeholder={titulo}

                />
            </div>

        </>
    );
}

export default Input;