import React from "react";
import Input from "../input/Input";
import styles from "./CadastroEtapa2.module.css"
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
                    id="cep"
                    valor={Cep}
                    alterarValor={setCep}
                    titulo={"CEP"}
                    funcao={() => buscarCep()}
                    mascara={"00000-000"}
                    minlength={9}
                    maxlength={9}
                />
                <Input
                    id="logradouro"
                    valor={Logradouro}
                    alterarValor={setLogradouro}
                    titulo={"Logradouro"}
                    minlength={5}
                    maxlength={50}
                />
                <div className={styles["container-adrress"]}>
                    <Input
                        id="numero"
                        valor={Numero}
                        alterarValor={setNumero}
                        titulo={"Número"}
                    />
                    <Input
                        id="complemento"
                        valor={Complemento}
                        alterarValor={setComplemento}
                        titulo={"Complemento"}
                    />
                </div>
                <Input
                    id="bairro"
                    valor={Bairro}
                    alterarValor={setBairro}
                    titulo={"Bairro"}
                />
                <div className={styles["container-adrress"]}>
                    <Input
                        id="cidade"
                        valor={Cidade}
                        alterarValor={setCidade}
                        titulo={"Cidade"}
                    />
                    <div className={styles["uf"]}>
                        <Input
                            id="UF"
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

