import React, { useEffect, useState } from "react";
import Input from "../input/Input";
import styles from "./CadastroEtapa2.module.css"
import { toast } from "react-toastify"; // Importa toast para exibir mensagens de sucesso ou erro
import api from "../../api";

const CadastroEtapa2 = ({
    Cep, setCep,
    Logradouro, setLogradouro,
    Bairro, setBairro,
    Cidade, setCidade,
    UF, setUF,
    Numero, setNumero,
    Complemento, setComplemento
}) => {
    const [disabled, setDisabled] = useState();

    const buscarCep = () => {
        if (Cep.length >= 8) {
            api.post(`/enderecos/address/${Cep}`).then((response) => {
                const { data } = response;
                const { logradouro, bairro, localidade, uf } = data;
                setLogradouro(logradouro);
                setBairro(bairro);
                setCidade(localidade);
                setUF(uf);

            }).catch((error) => {
                console.log("Houve um erro ao buscar o CEP");
                console.log(error);
            });
        }
    }

    return (

        <div className={styles["tela-cadastro"]}>
            <div className={styles["container-cadastro"]}>
                <Input
                    valor={Cep}
                    alterarValor={setCep}
                    titulo={"CEP"}
                    funcao={() => buscarCep()}
                />
                <Input
                    valor={Logradouro}
                    alterarValor={setLogradouro}
                    titulo={"Logradouro"}
                />
                <div className={styles["container-adrress"]}>
                    <Input
                        valor={Numero}
                        alterarValor={setNumero}
                        titulo={"Número"}
                    />
                    <Input
                        valor={Complemento}
                        alterarValor={setComplemento}
                        titulo={"Complemento"}
                    />
                </div>
                <Input
                    valor={Bairro}
                    alterarValor={setBairro}
                    titulo={"Bairro"}
                />
                <div className={styles["container-adrress"]}>
                    <Input
                        valor={Cidade}
                        alterarValor={setCidade}
                        titulo={"Cidade"}
                    />
                    <div className={styles["uf"]}>
                        <Input
                            valor={UF}
                            alterarValor={setUF}
                            titulo={"UF"}
                        />
                    </div>
                </div>
            </div>
        </div>

    );
}


export default CadastroEtapa2;

