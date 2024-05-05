import React, { useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import Button from "../../components/button/Button";
import styles from "./Cadastro.module.css"
import { HiOutlineArrowLeft } from "react-icons/hi";
import Imagem from "../../utils/assets/cadastro.svg";
import Logo from "../../components/logo/Logo";
import CadastroEtapa1 from "../../components/cadastro-etapa-1/CadastroEtapa1";
import CadastroEtapa2 from "../../components/cadastro-etapa-2/CadastroEtapa2";
import CadastroEtapa3 from "../../components/cadastro-etapa-3/CadastroEtapa3";
import CadastroEtapa4 from "../../components/cadastro-etapa-4/CadastroEtapa4";
import { isVazio, aberturaMaiorFechamento } from "../../utils/global";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import dayjs from "dayjs";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
    const [id, setId] = useState(0);
    const [dtCriacao, setDtCriacao] = useState(new Date());
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

    const [diaSegundaAberto, setDiaSegundaAberto] = useState(true);
    const [horario1Segunda, setHorario1Segunda] = useState(new Date())
    const [horario2Segunda, setHorario2Segunda] = useState(new Date())

    const [diaTercaAberto, setDiaTercaAberto] = useState(true);
    const [horario1Terca, setHorario1Terca] = useState(new Date())
    const [horario2Terca, setHorario2Terca] = useState(new Date())

    const [diaQuartaAberto, setDiaQuartaAberto] = useState(true);
    const [horario1Quarta, setHorario1Quarta] = useState(new Date())
    const [horario2Quarta, setHorario2Quarta] = useState(new Date())

    const [diaQuintaAberto, setDiaQuintaAberto] = useState(true);
    const [horario1Quinta, setHorario1Quinta] = useState(new Date())
    const [horario2Quinta, setHorario2Quinta] = useState(new Date())

    const [diaSextaAberto, setDiaSextaAberto] = useState(true);
    const [horario1Sexta, setHorario1Sexta] = useState(new Date())
    const [horario2Sexta, setHorario2Sexta] = useState(new Date())

    const [diaSabadoAberto, setDiaSabadoAberto] = useState(true);
    const [horario1Sabado, setHorario1Sabado] = useState(new Date())
    const [horario2Sabado, setHorario2Sabado] = useState(new Date())

    const [diaDomingoAberto, setDiaDomingoAberto] = useState(true);
    const [horario1Domingo, setHorario1Domingo] = useState(new Date())
    const [horario2Domingo, setHorario2Domingo] = useState(new Date())

    const [empresa, setEmpresa] = useState({});

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
    />,
    <CadastroEtapa3
        diaSegundaAberto={diaSegundaAberto}
        setDiaSegundaAberto={setDiaSegundaAberto}
        horario1Segunda={horario1Segunda}
        setHorario1Segunda={setHorario1Segunda}
        horario2Segunda={horario2Segunda}
        setHorario2Segunda={setHorario2Segunda}

        diaTercaAberto={diaTercaAberto}
        setDiaTercaAberto={setDiaTercaAberto}
        horario1Terca={horario1Terca}
        setHorario1Terca={setHorario1Terca}
        horario2Terca={horario2Terca}
        setHorario2Terca={setHorario2Terca}

        diaQuartaAberto={diaQuartaAberto}
        setDiaQuartaAberto={setDiaQuartaAberto}
        horario1Quarta={horario1Quarta}
        setHorario1Quarta={setHorario1Quarta}
        horario2Quarta={horario2Quarta}
        setHorario2Quarta={setHorario2Quarta}

        diaQuintaAberto={diaQuintaAberto}
        setDiaQuintaAberto={setDiaQuintaAberto}
        horario1Quinta={horario1Quinta}
        setHorario1Quinta={setHorario1Quinta}
        horario2Quinta={horario2Quinta}
        setHorario2Quinta={setHorario2Quinta}

        diaSextaAberto={diaSextaAberto}
        setDiaSextaAberto={setDiaSextaAberto}
        horario1Sexta={horario1Sexta}
        setHorario1Sexta={setHorario1Sexta}
        horario2Sexta={horario2Sexta}
        setHorario2Sexta={setHorario2Sexta}

        diaSabadoAberto={diaSabadoAberto}
        setDiaSabadoAberto={setDiaSabadoAberto}
        horario1Sabado={horario1Sabado}
        setHorario1Sabado={setHorario1Sabado}
        horario2Sabado={horario2Sabado}
        setHorario2Sabado={setHorario2Sabado}

        diaDomingoAberto={diaDomingoAberto}
        setDiaDomingoAberto={setDiaDomingoAberto}
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

    const validarCadastro1 = () => {
        if (
            !isVazio(razaoSocial, "Razão Social") &&
            !isVazio(cnpj, "CNPJ") &&
            !isVazio(telefonePrincipal, "Telefone da Empresa") &&
            !isVazio(emailPrincipal, "Email da Empresa")) {
            return true
        }

        return false
    }

    const validarCadastro2 = () => {
        if (!isVazio(cep, "CEP")
            && !isVazio(logradouro, "Logradouro")
            && !isVazio(bairro, "Bairro")
            && !isVazio(cidade, "Cidade")
            && !isVazio(uf, "UF")
            && !isVazio(numero, "Número")
        ) {
            return true;
        }

        return false;

    }

    const validarCadastro3 = () => {
        if (
            !isVazio(horario1Segunda, "Horário de Abertura Segunda ")
            && !isVazio(horario2Segunda, "Horário de Fechamento Segunda")
            && !aberturaMaiorFechamento(horario1Segunda, horario2Segunda)
            && !isVazio(horario1Terca, "Horário de Abertura Terça")
            && !isVazio(horario2Terca, "Horário de Fechamento Terça")
            && !aberturaMaiorFechamento(horario1Terca, horario2Terca)
            && !isVazio(horario1Quarta, "Horário de Abertura Quarta")
            && !isVazio(horario2Quarta, "Horário de Fechamento Quarta")
            && !aberturaMaiorFechamento(horario1Quarta, horario2Quarta)
            && !isVazio(horario1Quinta, "Horário de Abertura Quinta")
            && !isVazio(horario2Quinta, "Horário de Fechamento Quinta")
            && !aberturaMaiorFechamento(horario1Quinta, horario2Quinta)
            && !isVazio(horario1Sexta, "Horário de Abertura Sexta")
            && !isVazio(horario2Sexta, "Horário de Fechamento Sexta")
            && !aberturaMaiorFechamento(horario1Sexta, horario2Sexta)
            && !isVazio(horario1Sabado, "Horário de Abertura Sábado")
            && !isVazio(horario2Sabado, "Horário de Fechamento Sábado")
            && !aberturaMaiorFechamento(horario1Sabado, horario2Sabado)
            && !isVazio(horario1Domingo, "Horário de Abertura Domingo")
            && !isVazio(horario2Domingo, "Horário de Fechamento Domingo")
            && !aberturaMaiorFechamento(horario1Domingo, horario2Domingo)
        ) {
            return true;
        }

        return false;
    }

    const validarCadastro4 = () => {
        if (!isVazio(nome, "Nome")
            && !isVazio(telefone, "Telefone")
            && !isVazio(email, "Email")
            && !isVazio(senha, "Senha")) {
            return true;
        }

        return false;
    }

    const cadastrarEmpresa1 = () => {
        let body = {
            razaoSocial,
            cnpj,
            telefonePrincipal,
            emailPrincipal
        }

        api.post("/empresas", body).then((response) => {
            console.log("cadastro de empresa feito com sucesso")
            console.log(response);
            const { data } = response;
            const { id, dtCriacao } = data;
            setId(id);
            setDtCriacao(dtCriacao)

        }).catch(() => {
            toast.error("Houve um erro ao cadastrar a empresa")
            console.log("houve um erro ao tentar cadastrar a empresa")

        });
    }

    const cadastrarEmpresa2 = () => {
        api.post(`/enderecos/${empresa.id}/${cep}/${numero}`).then((response) => {
            console.log(response);
            return true

        }).catch((error) => {
            toast.error("Houve um erro ao tentar cadastrar o endereço")
            console.log(error)
        });
    }

    const cadastrarEmpresa3 = () => {
        const dias = [
            {
                diaSemana: "Segunda-Feira",
                inicio: horario1Segunda,
                fim: horario2Segunda,
                status: diaSegundaAberto ? 1 : 0
            },
            {
                diaSemana: "Terça-Feira",
                inicio: horario1Terca,
                fim: horario2Terca,
                status: diaTercaAberto ? 1 : 0
                ,
            },
            {
                diaSemana: "Quarta-Feira",
                inicio: horario1Quarta,
                fim: horario2Quarta,
                status: diaQuartaAberto ? 1 : 0
            },
            {
                diaSemana: "Quinta-Feira",
                inicio: horario1Quinta,
                fim: horario2Quinta,
                status: diaQuintaAberto ? 1 : 0
            },
            {

                diaSemana: "Sexta-Feira",
                inicio: horario1Sexta,
                fim: horario2Sexta,
                status: diaSextaAberto ? 1 : 0
                ,
            },
            {
                diaSemana: "Sábado",
                inicio: horario1Sabado,
                fim: horario2Sabado,
                status: diaSabadoAberto ? 1 : 0
            },
            {
                diaSemana: "Domingo",
                inicio: horario1Domingo,
                fim: horario2Domingo,
                status: diaDomingoAberto ? 1 : 0
            }
        ];

        for (let i = 0; i < dias.length; i++) {
            let body = {
                "diaSemana": dias[i].diaSemana,
                "inicio": dias[i].inicio,
                "fim": dias[i].fim,
                "status": dias[i].status,
                "empresa": empresa
            };

            api.post("/horarios-funcionamento", body).then((response) => {
                console.log("deu certo o cadastro dos horários de funcionamento")
                console.log(response);
            }).catch((error) => {
                console.log("houve um erro ao tentar cadastrar o horario de funcionamento");
                toast.error("houve um erro ao tentar cadastrar o horario de funcionamento dia:" + body.diaSemana);
                console.log(error);
            })
        }
    }

    const cadastrarEmpresa4 = () => {
        let body = {
            nome,
            telefone,
            email,
            senha,
            empresa
        }

        api.post("/funcionarios", body).then((response) => {
            console.log("cadastro de funcionario com sucesso")
            console.log(response);
            toast.success("Cadastro realizado com sucesso!");
            navigate("/login");

        }).catch((error) => {
            console.log("houve um erro ao tentar cadatrar funcionario")
            console.log(error);
        });
    }

    const funcoes = [cadastrarEmpresa1, cadastrarEmpresa2, cadastrarEmpresa3, cadastrarEmpresa4]

    const validacoes = [validarCadastro1, validarCadastro2, validarCadastro3, validarCadastro4];

    const avancar = (e) => {
        if (validacoes[currentStep]()) {
            changeStep(currentStep + 1, e)
        }
    }

    const cadastrar = () => {
        cadastrarEmpresa1();
        cadastrarEmpresa2();
        cadastrarEmpresa3();
        cadastrarEmpresa4();
    }

    return (
        <>
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
                            <p>Informe {currentStep == 2 ? "os dias" : currentStep == 1 ? "a localidade" : "os dados"} da <b>{currentStep < 2 ? "empresa" : currentStep == 2 ? "funcionamento" : "usuário"}</b> para começar a realizar os agendamentos.</p>
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
                                        funcaoButton={() => cadastrar()}
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


        </>
    );
}


export default Cadastro;