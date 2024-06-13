import React from "react";
import styles from "./Table.module.css";
import { Delete, Edit, IconlyProvider } from "react-iconly";

const Table = ({ titulos, linhas, showEditIcon, showDeleteIcon, funcaoEditar, funcaoDeletar }) => {
    return (
        <>
            <div className={styles["container-table"]}>
                <table className={styles["table"]}>
                    <thead className={styles["header-table"]}>
                        <tr>
                            {
                                titulos.map((titulo, index) => (
                                    <th scope="row" key={index}>
                                        <span>
                                            {titulo}
                                        </span>
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody className={styles["body-table"]}>
                        {
                            linhas.map((linha, index) => (
                                <tr className={styles[index % 2 === 0 ? "branco" : "roxo"]} key={index}

                                >
                                    {linha.map((dado, index2) => (
                                        <td key={index2} onClick={() => funcaoEditar(index)}>
                                            <div className={styles["td-div"]}>
                                                {dado}
                                            </div>
                                        </td>
                                    ))
                                    }
                                    {showEditIcon || showDeleteIcon ?
                                        <td key={index}>
                                            <div className={styles["group-icon"]}>
                                                {showEditIcon ?
                                                    <div className={styles["td-div-icon"]} onClick={() => funcaoEditar(index)}>
                                                        <IconlyProvider>
                                                            <Edit />
                                                        </IconlyProvider>
                                                    </div>
                                                    : ""
                                                }

                                                {showDeleteIcon ?
                                                    <div className={styles["td-div-icon"]} onClick={() => funcaoDeletar(index)}>
                                                        <IconlyProvider>
                                                            <Delete />
                                                        </IconlyProvider>
                                                    </div>
                                                    : ""
                                                }


                                            </div>
                                        </td>
                                        : ""}
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