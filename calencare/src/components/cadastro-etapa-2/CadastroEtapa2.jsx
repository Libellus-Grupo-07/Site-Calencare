import React from "react";
import Input from "../input/Input";
import styles from "./CadastroEtapa2.module.css"
import { toast } from "react-toastify"; // Importa toast para exibir mensagens de sucesso ou erro

const CadastroEtapa2 = () => {
    const  [Logradouro, setLogradouro] = useState("")
    const  [Bairro, setBairro] = useState("")
    const  [Cidade, setCidade] = useState("")
    const  [UF, setUF] = useState("")

    




    return (

        <div className={styles["tela-cadastro"]}>
            <div className={styles["container-cadastro"]}>
                <Input titulo={"Logradouro"}></Input>
                <Input titulo={"Bairro"}></Input>
                <div className={styles["container-adrress"]}>
                <Input titulo={"Cidade"}></Input>
                <div className={styles["uf"]}>
                <Input titulo={"UF"}></Input>
                </div>
                </div>
               
                <div className={styles["container-adrress"]}>
                    <Input titulo={"Número"}></Input>
                    <Input titulo={"Complemento"}></Input>
                </div>


            </div>
        </div>

    );
}

export default CadastroEtapa2;

