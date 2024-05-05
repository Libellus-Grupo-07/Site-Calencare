import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import styles from "./Cadastro.module.css"
import { HiOutlineArrowLeft } from "react-icons/hi";
import Imagem from "../../utils/assets/cadastro.svg";
import Logo from "../../components/logo/Logo";
import CadastroEtapa1 from "../../components/cadastro-etapa-1/CadastroEtapa1";
import CadastroEtapa2 from "../../components/cadastro-etapa-2/CadastroEtapa2";
import CadastroEtapa3 from "../../components/cadastro-etapa-3/CadastroEtapa3";
import CadastroEtapa4 from "../../components/cadastro-etapa-4/CadastroEtapa4";
import isVazio from "../../utils/global";
import { useState } from "react";
import { toast } from "react-toastify"; // Importa toast para exibir mensagens de sucesso ou erro
import api from "../../api";
import dayjs from "dayjs";

// hooks
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Cadastro = () => {

    const [cadastrou, setCadastrou] = useState(false)
    const [razaoSocial, setRazaoSocial] = useState("")
    const [cnpj, setCNPJ] = useState("")
    const [telefonePrincipal, setTelefonePrincipal] = useState("")
    const [emailPrincipal, setEmailPrincipal] = useState("")

    const [cep, setCep] = useState("")
    const [logradouro, setLogradouro] = useState("")
    const [bairro, setBairro] = useState("")
    const [cidade, setCidade] = useState("")
    const [uf, setUF] = useState("")
    const [numero, setNumero] = useState("")
    const [complemento, setComplemento] = useState("")

    const [nome, setNome] = useState("")
    const [telefone, setTelefone] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const [horario1Segunda, setHorario1Segunda] = useState(dayjs('2022-04-17T15:30'))
    const [horario2Segunda, setHorario2Segunda] = useState(dayjs('2022-04-17T15:30'))
    const [horario1Terca, setHorario1Terca] = useState(dayjs('2022-04-17T15:30'))
    const [horario2Terca, setHorario2Terca] = useState(dayjs('2022-04-17T15:30'))
    const [horario1Quarta, setHorario1Quarta] = useState(dayjs('2022-04-17T15:30'))
    const [horario2Quarta, setHorario2Quarta] = useState(dayjs('2022-04-17T15:30'))
    const [horario1Quinta, setHorario1Quinta] = useState(dayjs('2022-04-17T15:30'))
    const [horario2Quinta, setHorario2Quinta] = useState(dayjs('2022-04-17T15:30'))
    const [horario1Sexta, setHorario1Sexta] = useState(dayjs('2022-04-17T15:30'))
    const [horario2Sexta, setHorario2Sexta] = useState(dayjs('2022-04-17T15:30'))
    const [horario1Sabado, setHorario1Sabado] = useState(dayjs('2022-04-17T15:30'))
    const [horario2Sabado, setHorario2Sabado] = useState(dayjs('2022-04-17T15:30'))
    const [horario1Domingo, setHorario1Domingo] = useState(dayjs('2022-04-17T15:30'))
    const [horario2Domingo, setHorario2Domingo] = useState(dayjs('2022-04-17T15:30'))

    const formComponents = [<CadastroEtapa1
        RazaoSocial={razaoSocial}
        setRazaoSocial={setRazaoSocial}

        CNPJ={cnpj}
        setCNPJ={setCNPJ}

        TelefoneDaEmpresa={telefonePrincipal}
        setTelefoneDaEmpresa={setTelefonePrincipal}

        EmailDaEmpresa={emailPrincipal}
        setEmailDaEmpresa={setEmailPrincipal}
    />, <CadastroEtapa2
        Cep={cep}
        setCep={setCep}

        Logradouro={logradouro}
        setLogradouro={setLogradouro}

        Bairro={bairro}
        setBairro={setBairro}

        Cidade={cidade}
        setCidade={setCidade}

        UF={uf}
        setUF={setUF}

        Numero={numero}
        setNumero={setNumero}

        Complemento={complemento}
        setComplemento={setComplemento}
    />, <CadastroEtapa3
        horario1Segunda={horario1Segunda}
        setHorario1Segunda={setHorario1Segunda}

        horario2Segunda={horario2Segunda}
        setHorario2Segunda={setHorario2Segunda}

        horario1Terca={horario1Terca}
        setHorario1Terca={setHorario1Terca}

        horario2Terca={horario2Terca}
        setHorario2Terca={setHorario2Terca}

        horario1Quarta={horario1Quarta}
        setHorario1Quarta={setHorario1Quarta}

        horario2Quarta={horario2Quarta}
        setHorario2Quarta={setHorario2Quarta}

        horario1Quinta={horario1Quinta}
        setHorario1Quinta={setHorario1Quinta}

        horario2Quinta={horario2Quinta}
        setHorario2Quinta={setHorario2Quinta}

        horario1Sexta={horario1Sexta}
        setHorario1Sexta={setHorario1Sexta}

        horario2Sexta={horario2Sexta}
        setHorario2Sexta={setHorario2Sexta}

        horario1Sabado={horario1Sabado}
        setHorario1Sabado={setHorario1Sabado}

        horario2Sabado={horario2Sabado}
        setHorario2Sabado={setHorario2Sabado}

        horario1Domingo={horario1Domingo}
        setHorario1Domingo={setHorario1Domingo}

        horario2Domingo={horario2Domingo}
        setHorario2Domingo={setHorario2Domingo}

    />, <CadastroEtapa4
        Nome={nome}
        setNome={setNome}

        Telefone={telefone}
        setTelefone={setTelefone}

        Email={email}
        setEmail={setEmail}

        Senha={senha}
        setSenha={setSenha}
    />]

    const { currentStep, currentComponent, changeStep, isLastStep } = useForm(formComponents)

    const navigate = useNavigate()

    const validarCadastrastro1 = () => {
        if (!isVazio(razaoSocial, "Razão Social")
            && !isVazio(cnpj, "CNPJ")
            && !isVazio(telefonePrincipal, "Telefone da Empresa")
            && !isVazio(emailPrincipal, "Email da Empresa")) {
            return true
        }
        return false
    }

    const cadastrarEmpresa1 = () => {
        setCadastrou(false)

        let body = {
            razaoSocial,
            cnpj,
            telefonePrincipal,
            emailPrincipal
        }

        api.post("/empresas", body).then((response) => {
            console.log(response);
            setCadastrou(true)


        }).catch(() => {
            toast.error("Houve um erro ao tentar avançar")
            console.log("houve um erro ao tentar avançar")

        });

        return cadastrou
    }


    const cadastrarEmpresa2 = () => {
        if (!isVazio(cep, "cep")
            && !isVazio(logradouro, "Logradouro")
            && !isVazio(bairro, "Bairro")
            && !isVazio(cidade, "Cidade")
            && !isVazio(uf, "UF")
            && !isVazio(numero, "Número")
        ) {

            let body = {
                cep,
                logradouro,
                bairro,
                cidade,
                uf,
                numero,
                complemento
            }

            api.post("/enderecos", body).then((response) => {
                console.log(response);
                return true

            }).catch(() => {
                toast.error("Houve um erro ao tentar avançar")
                console.log("houve um erro ao tentar avançar")
            });
        }
    }


    const cadastrarEmpresa3 = () => {
        if (
            !isVazio(horario1Segunda, "Horário de Abertura Segunda ")
            && !isVazio(horario2Segunda, "Horário de Fechamento Segunda")
            && !isVazio(horario1Terca, "Horário de Abertura Terça")
            && !isVazio(horario2Terca, "Horário de Fechamento Terça")
            && !isVazio(horario1Quarta, "Horário de Abertura Quarta")
            && !isVazio(horario2Quarta, "Horário de Fechamento Quarta")
            && !isVazio(horario1Quinta, "Horário de Abertura Quinta")
            && !isVazio(horario2Quinta, "Horário de Fechamento Quinta")
            && !isVazio(horario1Sexta, "Horário de Abertura Sexta")
            && !isVazio(horario2Sexta, "Horário de Fechamento Sexta")
            && !isVazio(horario1Sabado, "Horário de Abertura Sábado")
            && !isVazio(horario2Sabado, "Horário de Fechamento Sábado")
            && !isVazio(horario1Domingo, "Horário de Abertura Domingo")
            && !isVazio(horario2Domingo, "Horário de Fechamento Domingo")
        ) {

            const dias = ["Segunda", "Terca", "Quarta", "Quinta", "Sexta", "Sabado", "Domingo"]

            // for (let index = 0; index < dias.length; index++) {
            //     api.post("/funcionarios", body).then((response) => {
            //         console.log(response);
            //         return true

            //     }).catch(() => {
            //         toast.error("Houve um erro ao tentar avançar")
            //         console.log("houve um erro ao tentar avançar")
            //     });
            // }
        }
    }


    const cadastrarEmpresa4 = () => {
        if (!isVazio(nome, "Nome")
            && !isVazio(telefone, "Telefone")
            && !isVazio(email, "Email")
            && !isVazio(senha, "Senha")) {

            let body = {
                nome,
                telefone,
                email,
                senha
            }

            api.post("/funcionarios", body).then((response) => {
                console.log(response);
                return true

            }).catch(() => {
                toast.error("Houve um erro ao tentar avançar")
                console.log("houve um erro ao tentar avançar")
            });
        }
    }

    const funcoes = [cadastrarEmpresa1, cadastrarEmpresa2, cadastrarEmpresa3, cadastrarEmpresa4]

    const avancar = (e) => {
        const funcao = funcoes[currentStep](e)
        console.log(funcao)


    }

    return (
        <>
            <div>
                <div className={styles["tela-cadastro"]}>
                    <div className={styles["container-imagem-cadastro"]}>
                        {/* <div><Navbar/></div> */}
                        <div className={styles["logo-cadastro"]}><Logo /></div>
                        <img className={styles["imagem-cadastro"]} src={Imagem} alt="imagem cadastro" />
                    </div>
                    <div className={styles["formulario-cadastro"]}>
                        <div className={styles["engloba-formulario"]}>
                            <div className="texto">
                                <h1> Cadastro </h1>
                                <p>Informe os {currentStep == 2 ? "dias" : "dados"} da <b>{currentStep < 2 ? "empresa" : currentStep == 2 ? "funcionamento" : "usuário"}</b> para começar a realizar os agendamentos.</p>
                            </div>
                            <div className={styles["inputs-container"]}>
                                <div className={styles["form"]}>
                                    {currentComponent}
                                </div>
                                <div className={styles["container-buttons"]}>
                                    <Button funcaoButton={() => changeStep(currentStep - 1, null)} titulo="Voltar" cor={"branco"} icone={<HiOutlineArrowLeft />}></Button>
                                    {!isLastStep ?
                                        <Button
                                            funcaoButton={(e) => avancar(e)}
                                            titulo="Avançar"
                                            cor={"roxo"}
                                        /> :
                                        <Button
                                            titulo="Cadastrar"
                                            cor={"roxo"}
                                        />}
                                </div>
                            </div>

                            <div className={styles["text-entrar"]}>
                                <span>Já possui uma conta? <b className={styles["link-entrar"]} onClick={() => navigate("/login")}>Entrar</b></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}


export default Cadastro;