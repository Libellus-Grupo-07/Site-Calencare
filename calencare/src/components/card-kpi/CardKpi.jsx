import React from "react";
import styles from "./CardKpi.module.css";
import { AiFillQuestionCircle } from "react-icons/ai";


const CardKpi = ({ icon, legenda, valor, tooltip }) => {
    return (
        <>
            <div className={styles["card-kpi"]}>
                {icon ?
                    <div className={styles["icon-kpi"]}>
                        {icon}
                    </div> : ""
                }
                <div className={styles["text-kpi"]}>
                    <span className={styles["label-kpi"]}>
                        {legenda}
                    </span>
                    <span className={styles["value-kpi"]}>
                        {tooltip ?
                            <div style={{ display: "flex", alignItems: "center", columnGap: "0.3rem" }}>
                                {valor}
                                <a id="tooltip" style={{ color: "var(--cinza-claro)", cursor: "pointer", fontSize: "1rem"}}>
                                    <AiFillQuestionCircle />
                                </a>
                                {tooltip}
                            </div>
                        : valor
                        }
                    </span>
                </div>
            </div>
        </>
    );
};

export default CardKpi;