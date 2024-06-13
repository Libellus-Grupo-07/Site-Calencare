import React from "react";
import Header from "../../components/header/Header";
import styles from "./Dashboard.module.css";
import Titulo from './../../components/titulo/Titulo';
import Button from './../../components/button/Button';
import { Download, IconlyProvider } from "react-iconly";

const Dashboard = () => {
    return (
        <>
            <section className={styles["section-dashboard"]}>
                <div>
                    <Header />
                </div>
                <div className={styles["container-dashboard"]}>
                    <div className={styles["content-dashboard"]}>
                        <div className={styles["titulo-dashboard"]}>
                            <Titulo titulo="Dashboard" tamanho={"md"} />
                            <div className={styles["group-button"]}>
                                <Button
                                    titulo={"Baixar Relatório"}
                                    cor={"branco"}
                                    icone={
                                        <IconlyProvider
                                            size={"medium"}
                                        >
                                            <Download />
                                        </IconlyProvider>
                                    }
                                />
                                <Button
                                    titulo={"Abril"}
                                    cor={"roxo"}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </section>

        </>
    );
}

export default Dashboard;