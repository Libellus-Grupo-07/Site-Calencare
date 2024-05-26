import React from "react";
import styles from "./Input.module.css";
// import InputMask from 'react-input-mask';
import { IMaskInput } from 'react-imask';

const Input = ({
    tamanho,
    id,
    valor,
    placeholder,
    titulo,
    type,
    alterarValor,
    validarEntrada,
    funcao,
    readonly,
    mascara,
    regex,
    maxlength,
    minlength,
    sobrepor
}) => {
    const mudarValor = (e) => {
        alterarValor(e.target.value);
    }

    return (
        <>
            <div className={styles["componet-input"]}>
                <label for={id}>
                    <span
                        className={styles["titulo-input"]}
                    >{titulo}</span>
                </label>
                {mascara ?
                    <IMaskInput
                        id={id}
                        value={valor}
                        placeholder={placeholder || titulo}
                        onChange={(e) => mudarValor(e)}
                        onInput={validarEntrada ? (e) => validarEntrada(e) : null}
                        mask={mascara}
                        style={{
                            height: tamanho ? "32px" : "",
                            fontSize: tamanho ? "14px" : "",
                            padding: tamanho ? "6px 28px" : "",
                        }}
                        type={type}
                        maxLength={maxlength}
                        minLength={minlength}
                    /> :
                    <input
                        id={id}
                        type={type}
                        value={valor}
                        placeholder={placeholder || titulo}
                        onChange={(e) => mudarValor(e)}
                        onInput={validarEntrada ? (e) => validarEntrada(e) : null}
                        required
                        readOnly={readonly || false}
                        style={{
                            height: tamanho ? "32px" : "",
                            fontSize: tamanho ? "14px" : "",
                            padding: tamanho ? "8px 28px" : "",
                            zIndex: sobrepor ? "99999" : ""
                        }}
                        pattern={regex}
                        maxLength={maxlength}
                        minLength={minlength}
                    />
                }
            </div>

        </>
    );
}

export default Input;