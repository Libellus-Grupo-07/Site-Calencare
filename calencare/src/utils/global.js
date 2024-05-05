import { toast } from "react-toastify"

function isVazio(campo, nome) {
    if (campo == "") {
        toast.error(`O campo ${nome} deve ser preenchido!`)
        return true
    }
    return false
}
export default isVazio