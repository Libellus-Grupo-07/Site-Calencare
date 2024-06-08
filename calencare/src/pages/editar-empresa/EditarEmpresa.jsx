import React, { useEffect, useState } from "react";
import styles from "./EditarEmpresa.module.css"
import Header from "../../components/header/Header";
import api from "../../api";
import Titulo from '../../components/titulo/Titulo';
import Button from "../../components/button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { inputSomenteNumero, inputSomenteTexto, logado } from "../../utils/global";
import Input from "../../components/input/Input";
import { FaCheck } from "react-icons/fa6";
import { TiCancel } from "react-icons/ti";
import { toast } from "react-toastify";
import DiaDaSemanaComponente from './../../components/dia-da-semana/DiaDaSemanaComponente';

const EditarEmpresa = () => {
    const navigate = useNavigate();

    const { idEmpresa } = useParams();
    const hora = new Date();

    const [razaoSocial, setRazaoSocial] = useState("")
    const [cnpj, setCNPJ] = useState("")
    const [telefonePrincipal, setTelefonePrincipal] = useState("")
    const [emailPrincipal, setEmailPrincipal] = useState("")

    const [diaSegundaAberto, setDiaSegundaAberto] = useState(true);
    const [horario1Segunda, setHorario1Segunda] = useState(hora)
    const [horario2Segunda, setHorario2Segunda] = useState(hora)

    const [diaTercaAberto, setDiaTercaAberto] = useState(true);
    const [horario1Terca, setHorario1Terca] = useState(hora)
    const [horario2Terca, setHorario2Terca] = useState(hora)

    const [diaQuartaAberto, setDiaQuartaAberto] = useState(true);
    const [horario1Quarta, setHorario1Quarta] = useState(hora)
    const [horario2Quarta, setHorario2Quarta] = useState(hora)

    const [diaQuintaAberto, setDiaQuintaAberto] = useState(true);
    const [horario1Quinta, setHorario1Quinta] = useState(hora)
    const [horario2Quinta, setHorario2Quinta] = useState(hora)

    const [diaSextaAberto, setDiaSextaAberto] = useState(true);
    const [horario1Sexta, setHorario1Sexta] = useState(hora)
    const [horario2Sexta, setHorario2Sexta] = useState(hora)

    const [diaSabadoAberto, setDiaSabadoAberto] = useState(true);
    const [horario1Sabado, setHorario1Sabado] = useState(hora)
    const [horario2Sabado, setHorario2Sabado] = useState(hora)

    const [diaDomingoAberto, setDiaDomingoAberto] = useState(true);
    const [horario1Domingo, setHorario1Domingo] = useState(hora)
    const [horario2Domingo, setHorario2Domingo] = useState(hora)

    const [dias, setDias] = useState([]);
    const vetorSetters = [
        [setDiaSegundaAberto, setHorario1Segunda, setHorario2Segunda, diaSegundaAberto, horario1Segunda, horario2Segunda],
        [setDiaTercaAberto, setHorario1Terca, setHorario2Terca, diaTercaAberto, horario1Terca, horario2Terca],
        [setDiaQuartaAberto, setHorario1Quarta, setHorario2Quarta, diaQuartaAberto, horario1Quarta, horario2Quarta],
        [setDiaQuintaAberto, setHorario1Quinta, setHorario2Quinta, diaQuintaAberto, horario1Quinta, horario2Quinta],
        [setDiaSextaAberto, setHorario1Sexta, setHorario2Sexta, diaSextaAberto, horario1Sexta, horario2Sexta],
        [setDiaSabadoAberto, setHorario1Sabado, setHorario2Sabado, diaSabadoAberto, horario1Sabado, horario2Sabado],
        [setDiaDomingoAberto, setHorario1Domingo, setHorario2Segunda, diaDomingoAberto, horario1Domingo, horario2Domingo],
    ];

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }

        api.get(`/empresas/${idEmpresa}`).then((response) => {
            const { data } = response
            const { razaoSocial, cnpj, emailPrincipal, telefonePrincipal, horariosFuncionamentos } = data;

            setRazaoSocial(razaoSocial);
            setCNPJ(cnpj);
            setEmailPrincipal(emailPrincipal);
            setTelefonePrincipal(telefonePrincipal);
            const ordemDias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
            const vetorDias = [];

            horariosFuncionamentos.forEach((h) => {
                vetorDias.push({
                    id: h.id,
                    diaSemana: h.diaSemana.replace("-Feira", ""),
                    fim: h.fim,
                    inicio: h.inicio,
                    aberto: h.status === 0 ? false : true
                })
            });

            for (let i = 0; i < ordemDias.length; i++) {
                let posicaoTroca = i;

                for (let j = i; j < ordemDias.length; j++) {
                    if (vetorDias[j].diaSemana === ordemDias[i]) {
                        posicaoTroca = j;
                    }
                }

                console.log(posicaoTroca);
                let proximoDia = vetorDias[i];
                vetorDias[i] = vetorDias[posicaoTroca];
                vetorDias[posicaoTroca] = proximoDia;
            }

            vetorToSetters(vetorDias);
            setDias(vetorDias);

            console.log(vetorDias)
        }).catch((error) => {
            console.log("Houve um erro ao buscar o funcionário");
            console.log(error);
        })
    }, [idEmpresa]);



    const voltar = () => {
        navigate(-1);
    }

    const editar = () => {
        let body = {
            "id": idEmpresa,
            razaoSocial,
            emailPrincipal,
            telefonePrincipal,
            // dtCriacao,  
            // empresa
        }
        api.put(`/empresas/${idEmpresa}`, body).then((response) => {
            console.log(response);
            toast.success("Informações atualizadas com sucesso!")
            navigate("/perfil");
        }).catch((error) => {
            console.log("Houve um erro ao atualizar o funcionário");
            console.log(error);
        });
    }

    const vetorToSetters = (vetor) => {
        setDiaSegundaAberto(vetor[0].aberto);
        setHorario1Segunda(vetor[0].inicio)
        setHorario2Segunda(vetor[0].fim)

        setDiaTercaAberto(vetor[1].aberto);
        setHorario1Terca(vetor[1].inicio);
        setHorario2Terca(vetor[1].fim)

        setDiaQuartaAberto(vetor[2].aberto);
        setHorario1Quarta(vetor[2].inicio)
        setHorario2Quarta(vetor[2].fim)

        setDiaQuintaAberto(vetor[3].aberto);
        setHorario1Quinta(vetor[3].inicio)
        setHorario2Quinta(vetor[3].fim)

        setDiaSextaAberto(vetor[4].aberto);
        setHorario1Sexta(vetor[4].inicio)
        setHorario2Sexta(vetor[4].fim)

        setDiaSabadoAberto(vetor[5].aberto);
        setHorario1Sabado(vetor[5].inicio)
        setHorario2Sabado(vetor[5].fim)

        setDiaDomingoAberto(vetor[6].aberto);
        setHorario1Domingo(vetor[6].inicio)
        setHorario2Domingo(vetor[6].fim)
    }


    return (
        <>
            <section className={styles["section-empresa"]}>
                <div>
                    <Header />
                </div>
                <div className={styles["container-empresa"]}>
                    <div className={styles["content-empresa"]}>
                        <div className={styles["header"]}>
                            <Titulo
                                tamanho={"md"}
                                titulo={"Editar Informações da Empresa"}
                            />
                        </div>
                        <div className={styles["informations-empresa"]}>
                            <Input
                                tamanho={"lg"}
                                valor={razaoSocial}
                                alterarValor={setRazaoSocial}
                                titulo={"Razão Social"}
                                validarEntrada={(e) => inputSomenteTexto(e)}
                            />
                            <Input
                                tamanho={"lg"}
                                valor={cnpj}
                                alterarValor={setCNPJ}
                                titulo={"CNPJ"}
                                mascara={"00.000.000/0000-00"}
                            />
                            <Input
                                tamanho={"lg"}
                                valor={emailPrincipal}
                                alterarValor={setEmailPrincipal}
                                titulo={"Email"}
                                type={"email"}
                            />
                            <Input
                                tamanho={"lg"}
                                valor={telefonePrincipal}
                                alterarValor={setTelefonePrincipal}
                                titulo={"Telefone Principal"}
                                mascara={"(00) 0000-0000"}
                            />
                            <div className={styles["dias-funcionamento"]}>
                                <div style={{ width: "100%" }}>
                                    <Titulo titulo={"Dias de Funcionamento"} tamanho={"md"} />
                                </div>
                                <div className={styles["card-horarios"]}>
                                    <div className={styles["card-container"]}>
                                        {
                                            dias.map((d, index) => (
                                                <div key={index}>
                                                    <DiaDaSemanaComponente
                                                        diaSemana={d.diaSemana}
                                                        setAberto={vetorSetters[index][0]}
                                                        setHorario1={vetorSetters[index][1]}
                                                        setHorario2={vetorSetters[index][2]}
                                                        aberto={vetorSetters[index][3]}
                                                        horario1={vetorSetters[index][4]}
                                                        horario2={vetorSetters[index][5]}
                                                        // funcaoClickSwitch={() => navigate(`/editar-empresa/${idEmpresa}`)}
                                                    />
                                                </div>

                                            ))
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={styles["group-button"]}>
                            <Button
                                titulo={"Cancelar"}
                                cor={"branco"}
                                funcaoButton={() => voltar()}
                                icone={
                                    <div style={{
                                        fontSize: "18px",
                                        display: "flex",
                                        alignItens: "center",
                                        justifyContent: "center"
                                    }}>
                                        <TiCancel />
                                    </div>
                                } />
                            <Button
                                titulo={"Editar"}
                                icone={<FaCheck />}
                                cor={"roxo"}
                                funcaoButton={() => editar()}
                            />
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default EditarEmpresa;