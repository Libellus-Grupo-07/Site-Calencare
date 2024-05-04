import React, { useState } from "react";
import Input from "../../components/input/Input";
import styles from "./CadastroEtapa4.module.css"
import { toast } from "react-toastify";

const CadastroEtapa4 = () => {
    const  [Nome, setNome] = useState("")
    const [Telefone, setTelefone] = useState("")
    const [Email, setEmail] = useState("")
    const [Senha, setSenha] = useState("")

    const alertas = () =>{
       if(Nome.length == 0){
        toast.error("O Nome deve ser preenchido")
       }
       if(Telefone.length == 0){
        toast.error("O Telefone deve ser preenchido")
       }
       if(Email.length == 0){
        toast.error("O Email deve ser preenchido")
       }
       if(Senha.length == 0){
        toast.error("A Senha deve ser preenchida")
       }
    }
    return (

        <div className={styles["tela-cadastro"]}>
                    <div className={styles["container-cadastro"]}>
                    <Input titulo={"Nome"} ></Input>
                    <Input titulo={"Telefone"}></Input>
                    <Input titulo={"Email"}></Input>
                    <Input titulo={"Senha"} type={"password"}></Input>

                    </div>
                    </div>

);
}


export default CadastroEtapa4;
