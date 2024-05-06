import React from "react";
import styles from "./CardKpi.module.css";

const CardKpi = ({ icon, legenda, valor }) => {
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
                        { legenda }
                    </span>
                    <span className={styles["value-kpi"]}>
                        { valor }
                    </span>
                </div>
            </div>
        </>
    );
};

export default CardKpi;