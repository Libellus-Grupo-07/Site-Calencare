import React from "react";
import Titulo from "../titulo/Titulo";
import styles from "./Table.module.css";

const Table = ({ titulos, linhas, icones }) => {
    return (
        <>
            <div className={styles["container-table"]}>
                <table className={styles["table"]}>
                    <thead className={styles["header-table"]}>
                        {
                            titulos.map((titulo, index) => (
                                <th scope="row" key={index}>
                                    <span>
                                        {titulo}
                                    </span>
                                </th>
                            ))
                        }
                    </thead>
                    <tbody className={styles["body-table"]}>
                        {
                            linhas.map((linha, index) => (
                                <tr className={styles[index % 2 === 0 ? "branco" : "roxo"]}  key={index}>
                                    {linha.map((dado, index2) => (
                                        index2 < dado.length ?
                                            <td key={index2}>
                                                {dado}
                                            </td>
                                            : icones ?
                                            icones.map((icone, index3) => (
                                                <td key={index3}>
                                                    {icone}
                                                </td>
                                            ))
                                            : ""
                                    ))}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Table;