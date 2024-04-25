import React from "react";
import Logo from "./../../utils/assets/logo_calencare.png";
import styles from "./Navbar.module.css";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

const Navbar = ({ tipo }) => {
    const navigate = useNavigate();

    return (
        <>
            <header>
                <div className={styles["nav"]}>
                    <div className={styles["logo"]}>
                        <img className={styles["img-logo"]} src={Logo} alt="Logo da Calencare" />
                    </div>
                    <ul className={styles["list"]}>
                        <li className={styles["list-item"]}>
                            <span className={styles["link-item"]}> Início </span> </li>
                        <li className={styles["list-item"]}>
                            <span className={styles["link-item"]}> Produto </span>
                        </li>
                        <li className={styles["list-item"]}>
                            <span className={styles["link-item"]}> Benefícios </span>
                        </li>
                        <li className={styles["list-item"]}>
                            <span className={styles["link-item"]}>Preços</span>
                        </li>
                    </ul>
                    <div className={styles["group-button"]}>
                        <span className={styles["link-item"]}> Entrar </span>
                        <Button funcaoButton={() => navigate("/cadastro")}  titulo="Cadastre-se" cor="roxo" />
                    </div>
                </div>
            </header>
        </>
    );
}

export default Navbar;