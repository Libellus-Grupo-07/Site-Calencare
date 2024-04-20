import React from "react";
import styles from "./Input.module.css";

const Input = ({valor,titulo}) => {
    return (
        <>
         <div className={styles["componet-input"]}>
         <label>
            <span className={styles["titulo-input"]}>{titulo}</span>
         </label>
            <input
                type="text"
                value={valor}
                placeholder={titulo}
                
            />
         </div>

        </>
    );
}

export default Input;