import React, { useEffect, useState } from "react";
import styles from "./Perfil.module.css"
import Header from "../../components/header/Header";
import api from "../../api";
import Button from "../../components/button/Button";
import { Delete, IconlyProvider, Logout } from "react-iconly";
import { useNavigate, useParams } from "react-router-dom";
import imgPerfil from "./../../utils/assets/perfil_padrao.svg";
import Row from './../../components/row/Row';
import { logado, logoutUsuario, transformarData } from "../../utils/global";
import Swal from 'sweetalert2'
import DiaDaSemanaComponente from './../../components/dia-da-semana/DiaDaSemanaComponente';
import { toast } from "react-toastify";
import ModalTemplate from "../../components/modal-template/ModalTemplate";
import Titulo from './../../components/titulo/Titulo';

const Perfil = () => {

    const navigate = useNavigate();
    const hora = new Date();

    const { idUser } = useParams();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [dtCriacao, setDtCriacao] = useState("");

    const [idEmpresa, setIdEmpresa] = useState(0);
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

    const [secaoPerfil, setSecaoPerfil] = useState(sessionStorage.getItem("sessaoPerfil") || "informacoes-pessoais");

    const mudarSecao = (secao) => {
        setSecaoPerfil(secao);
        sessionStorage.setItem("sessaoPerfil", secao)
    }

    const sair = (url) => {
        logoutUsuario();
        sessionStorage.removeItem("sessaoPerfil");
        sessionStorage.removeItem("token");
        navigate(url);
    }

    const abrirModal = () => {
        setModalAberto(!modalAberto);
    }

    const excluir = () => {
        api.delete(`/funcionarios/${idUser}`).then(() => {
            abrirModal();
            toast.sucess("Sua conta foi excluída com sucesso.");
            sessionStorage.removeItem("idUser");
            sair("/login");
        }).catch((error) => {
            toast.error("Não foi possível excluir sua conta.")
            console.error("Houve um erro ao tentar excluir a conta")
            console.log(error)
        })
    }

    const tituloModal = "Excluir Conta";
    const tituloBotao = "Excluir";
    const corpoModal = (
        <>
            <span style={{
                lineHeight: "1.5rem",
            }}>
                Você realmente deseja excluir a sua conta?
            </span>
        </>
    )

    const [modalAberto, setModalAberto] = useState(false);

    useEffect(() => {
        if (!logado(sessionStorage.getItem("token"))) {
            navigate("/login");
            return;
        }

        api.get(`/funcionarios/${idUser}`).then((response) => {
            const { data } = response;
            const { nome, email, telefone, dtCriacao, empresa } = data;
            const { id, razaoSocial, cnpj, emailPrincipal, telefonePrincipal } = empresa;

            setIdEmpresa(id);
            setNome(nome);
            setEmail(email);
            setTelefone(telefone);
            setDtCriacao(dtCriacao);

            setRazaoSocial(razaoSocial);
            setCNPJ(cnpj);
            setEmailPrincipal(emailPrincipal);
            setTelefonePrincipal(telefonePrincipal);

            api.get(`/empresas/${id}`).then((response) => {
                const { data } = response
                const { horariosFuncionamentos } = data;
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
                
                abc(vetorDias);
                setDias(vetorDias);

                console.log(vetorDias)
            }).catch((error) => {
                console.log("Houve um erro ao buscar o funcionário");
                console.log(error);
            })


        }).catch((error) => {
            console.log("Houve um erro ao buscar o funcionário");
            console.log(error);
        }, [])
    }, []);

    const abc = (vetor) => {
        console.log(vetor);
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
            <section className={styles["section-perfil"]}>
                <div>
                    <Header nomeUser={nome} />
                </div>
                <div className={styles["container-perfil"]}>
                    <div className={styles["content-perfil"]}>
                        <div className={styles["header"]}>
                            <div className={styles["group-button"]}>
                                <Button
                                    cor="branco"
                                    titulo={"Excluir conta"}
                                    funcaoButton={() => abrirModal()}
                                    icone={
                                        <IconlyProvider
                                            stroke="bold"
                                            size="small"
                                        >
                                            <Delete />
                                        </IconlyProvider>
                                    }
                                />
                                <Button
                                    funcaoButton={() => sair("/login")}
                                    cor={"roxo"}
                                    titulo={"Sair da conta"}
                                    icone={
                                        <IconlyProvider
                                            stroke="bold"
                                            size="small"
                                        >
                                            <Logout />
                                        </IconlyProvider>
                                    }
                                />
                            </div>
                        </div>
                        <div className={styles["informations-perfil"]}>
                            <div className={styles["photo-perfil"]}>
                                <img
                                    src={imgPerfil}
                                    alt="Foto de perfil do usuário"
                                    className={styles["img-perfil"]}
                                />
                            </div>
                            <div className={styles["group-button"]}>
                                <button
                                    onClick={() => mudarSecao("informacoes-empresa")}
                                    className={
                                        styles[
                                        secaoPerfil === "informacoes-empresa" ?
                                            "roxo" : "sem-fundo"
                                        ]
                                    }
                                >
                                    Informações da Empresa
                                </button>
                                <button
                                    onClick={() => mudarSecao("informacoes-pessoais")}
                                    className={
                                        styles[
                                        secaoPerfil === "informacoes-pessoais" ?
                                            "roxo" : "sem-fundo"
                                        ]
                                    }
                                >
                                    Informações Pessoais
                                </button>
                            </div>{
                                secaoPerfil === "informacoes-empresa" ?
                                    <div className={styles["info-empresa"]}>
                                        <div className={styles["grid-info"]}>

                                            <Row
                                                titulo="Razão Social"
                                                valor={razaoSocial}
                                                funcao={() => navigate(`/editar-perfil/${idUser}`)}
                                            />
                                            <Row
                                                titulo="CNPJ"
                                                valor={cnpj}
                                                funcao={() => navigate(`/editar-perfil/${idUser}`)}
                                            />
                                            <Row
                                                titulo="Email Principal"
                                                valor={emailPrincipal}
                                                funcao={() => navigate(`/editar-perfil/${idUser}`)}
                                            />
                                            <Row
                                                titulo="Telefone Principal"
                                                valor={telefonePrincipal}
                                            />

                                        </div>
                                        <div className={styles["dias-funcionamento"]}>
                                            <div style={{ width: "100%" }}>
                                                <Titulo titulo={"Dias de Funcionamento"} />
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
                                                                    funcaoClickSwitch={() => navigate(`/editar-empresa/${idEmpresa}`)}
                                                                />
                                                            </div>

                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div> :
                                    <div className={styles[""]}>
                                        <div>
                                            <Row
                                                titulo="Nome"
                                                valor={nome}
                                                funcao={() => navigate(`/editar-perfil/${idUser}`)}
                                            />
                                            <Row
                                                titulo="Telefone"
                                                valor={telefone}
                                                funcao={() => navigate(`/editar-perfil/${idUser}`)}
                                            />
                                            <Row
                                                titulo="Email"
                                                valor={email}
                                                funcao={() => navigate(`/editar-perfil/${idUser}`)}
                                            />
                                            <Row
                                                titulo="Data de Cadastro"
                                                valor={transformarData(dtCriacao)}
                                            />
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
            <ModalTemplate
                aberto={modalAberto}
                setAberto={setModalAberto}
                funcaoBotaoConfirmar={excluir}
                corpo={corpoModal}
                titulo={tituloModal}
                tituloBotaoConfirmar={tituloBotao}
            />

        </>
    );
}

export default Perfil;