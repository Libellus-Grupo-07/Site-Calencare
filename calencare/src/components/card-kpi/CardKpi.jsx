import React from "react";
import styles from "./CardKpi.module.css";
import { FaDove } from "react-icons/fa6";

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
                            <div>
                                <a id="tooltip">
                                    {valor}
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