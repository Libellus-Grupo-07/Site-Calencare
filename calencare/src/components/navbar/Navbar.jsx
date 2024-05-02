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


