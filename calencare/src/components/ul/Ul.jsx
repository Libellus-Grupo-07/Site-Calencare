import React from "react";
import styles from "./Ul.module.css";

const Ul = ({ items, titulo }) => {
    return (
        <>

            <div className={styles["componet-input"]}>
                    <span
                        className={styles["titulo-input"]}
                    >{titulo}</span>
            
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            </div>
        </>
    )
}
export default Ul;
