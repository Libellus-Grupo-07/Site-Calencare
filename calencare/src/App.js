import Rotas from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { logado } from "./utils/global";

function App() {

  return (
    <>
      <Rotas />
      <ToastContainer />
    </>
  );
}

export default App;
