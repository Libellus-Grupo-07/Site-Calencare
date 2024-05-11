import React from "react";
import styles from "./Button.module.css";

const Button = ({ funcaoButton, tamanho, titulo, cor, icone }) => {
    return (
        <>
            <div className={styles["btn"]}>

                <button
                    onClick={funcaoButton}
                    className={styles[cor]}
                    style={{
                        fontSize: tamanho ? "13px" : "15px",
                        padding: tamanho ? "8px 20px" : ""
                    }}
                >
                    {icone ? icone : ""} {titulo}
                </button>
            </div>
        </>
    );
}
export default Button;