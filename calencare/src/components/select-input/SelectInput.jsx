import React from "react";
import styles from "./SelectInput.module.css";
import Select from 'react-select';

const SelectInput = ({ titulo, id, options, alterarValor, valor }) => {
    const mudarValor = (e) => {
        alterarValor(e.value)
    }

    return (
        <>
            <div className={styles["component-select"]}>
                <label for={id}>
                    <span
                        className={styles["titulo-select"]}
                    >{titulo}</span>
                </label>
                <Select
                    id={id}
                    defaultValue={valor}
                    onChange={(e) => mudarValor(e)}
                    isSearchable={true}
                    options={options}
                    styles={{
                        control: (state) => ({
                            padding: "0px 24px",
                            height: "44px",
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "100px",
                            fontSize: "14.5px",
                            border: "1.5px solid",
                            letterSpacing: "-0.03rem",
                            color: "var(--texto-preto)",
                            fontWeight: 500,
                            borderColor: state.isFocused ? "var(--preto)" : "var(--texto-cinza)",
                            borderWidth: state.isFocused ? "2px" : "1.5px"
                        }),
                    }}
                />
            </div>
        </>
    );
}

export default SelectInput;