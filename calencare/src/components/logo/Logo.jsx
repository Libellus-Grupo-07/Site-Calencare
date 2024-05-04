import styles from "./Logo.module.css";
import imgLogo from "../../utils/assets/logo_calencare.png";
const Logo = () => {

    return (
        <>
            <div className={styles["logo"]}>
                <img className={styles["img-logo"]} src={imgLogo} alt="Logo da Calencare" />
            </div>
        </>
    );

}
export default Logo;