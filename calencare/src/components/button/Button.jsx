import React from "react";
import styles from "./Button.module.css" ;

const Button = ({ funcaoButton, titulo, cor, icone}) => {
    return (
        <>
            <button onClick={funcaoButton} className={styles[cor]}> {icone ?  icone : ""} {titulo}  </button>
        </>
    );
}

export default Button;