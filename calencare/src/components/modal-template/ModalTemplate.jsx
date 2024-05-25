import styles from './ModalTemplate.module.css'
import { IoClose } from "react-icons/io5";
import Input from './../input/Input';
import Button from './../button/Button';
import { FaCheck } from 'react-icons/fa6';
import { TiCancel } from 'react-icons/ti';
import Titulo from '../titulo/Titulo';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const ModalTemplate = ({ aberto, setAberto, titulo, corpo, tituloBotaoConfirmar, funcaoBotaoConfirmar }) => {

    const handleClose = () => setAberto(false);
    const handleShow = () => setAberto(true);

    return (
        <>
            <Modal
                open={aberto}
                onClose={handleClose}
                center
                showCloseIcon={false}
                classNames={{
                    modal: styles['modal']
                }}
            >
                <div className={styles["container-modal"]}>
                    <div className={styles["header-modal"]}>
                        <Titulo titulo={ titulo || "Título Modal" } tamanho={"md"} />
                        <IoClose
                            className={styles["icon"]}
                            onClick={handleClose}
                        />
                    </div>
                    <div className={styles['form']}>
                       { corpo }
                    </div>
                    <div className={styles['group-button']}>
                        <Button
                            funcaoButton={handleClose}
                            titulo={"Cancelar"}
                            cor={"branco"}
                            icone={
                                <TiCancel />
                            } />
                        <Button
                            funcaoButton={funcaoBotaoConfirmar || handleClose}
                            titulo={tituloBotaoConfirmar || "Confirmar"}
                            icone={

                                <FaCheck />
                            }
                            cor={"roxo"}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default ModalTemplate;