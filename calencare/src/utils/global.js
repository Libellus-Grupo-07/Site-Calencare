import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function isVazio(campo, nome) {
  if (campo === "") {
    toast.error(`O campo ${nome} deve ser preenchido!`);
    return true;
  }
  return false;
}

export function transformarData(dataString) {
  const data = new Date(dataString);
  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

export function transformarDataBd(dataString) {
  const data = new Date(dataString);
  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear();
  return `${ano}-${mes}-${dia}`;
}

export const inputSomenteTexto = (e) => {
  e.target.value = e.target.value.replace(/[^A-Za-zÀ-ú\s]/g, "");
};

export const inputSomenteNumero = (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "");
};

export const inputSemCaracteresEspeciais = (e) => {
  e.target.value = e.target.value.replace(/[^A-Za-zÀ-ú0-9\s]/g, "");
};

export function aberturaMaiorFechamento(hora1, hora2) {
  console.log("Abc de natal");
  console.log(hora1);
  //   let horaAbertura = new Date()

  //   if (horaAbertura.getTime() >= horaFechadura.getTime()) {
  //     toast.error("A hora de fechamento deve ser maior que a hora de abertura!");
  //     return true;
  //   } else {
  //     return false;
  //   }
}
