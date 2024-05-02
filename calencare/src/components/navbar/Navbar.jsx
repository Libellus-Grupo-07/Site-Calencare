 import React from "react";
 import Logo from "../../utils/assets/logo_calencare.png";
 import styles from "./Navbar.module.css";

const Navbar = ({ tipo }) => {
    return(
    <nav className={styles["navbar"]}>
    <img src={Logo} className={styles["logo-inicio"]} alt="Logo Início"/>
    </nav>
);
};
 export default Navbar;

<<<<<<< HEAD
=======
    return (
        <>
            <header>
                <div className={styles["nav"]}>
                    <div className={styles["logo"]}>
                        <img className={styles["img-logo"]} src={Logo} alt="Logo da Calencare" onClick={() => navigate("#inicio")}/>
                    </div>
                    <ul className={styles["list"]}>
                        <li className={styles["list-item"]}>
                            <span className={styles["link-item"]} onClick={() => navigate("#inicio")}> Início </span> </li>
                        <li className={styles["list-item"]}>
                            <span className={styles["link-item"]} onClick={() => navigate("#produto")}> Produto </span>
                        </li>
                        <li className={styles["list-item"]}>
                            <span className={styles["link-item"]} onClick={() => navigate("#beneficios")}> Benefícios </span>
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
>>>>>>> origin/feat-home

