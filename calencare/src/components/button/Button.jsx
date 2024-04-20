import React from "react";
import styles from "./Button.module.css" ;




const Button = ({titulo,cor,icone}) => {
    return (
        <>
            <button className={styles[cor]}> {icone ?  icone : ""} {titulo}  </button>
        </>
    );
}

export default Button;