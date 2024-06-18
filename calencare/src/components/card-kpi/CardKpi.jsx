import React from "react";
import styles from "./CardKpi.module.css";
import { RiInformationFill } from "react-icons/ri";

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
                    <span 
                        className={styles["label-kpi"]}
                        style={{ 
                              display: tooltip ? "flex" : "",
                              alignItens: "center",                                justifyContent: "center",
                            columnGap: "4px",
                        }}
                    >
                        {legenda} { tooltip ? <div>
                             <a id="tooltip" style={{ color: "var(--texto-cinza)", cursor: "pointer", fontSize: "0.9rem"}}>
                                    <RiInformationFill />
                                </a>
                                {tooltip} </div>
                                : 
                    ""}
                    </span>
                    <span className={styles["value-kpi"]}>
                        {tooltip ?
                            <div style={{ display: "flex", alignItems: "center", columnGap: "0.3rem" }}>
                                {valor}
                                
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