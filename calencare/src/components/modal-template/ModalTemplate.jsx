import styles from './ModalTemplate.module.css'
import { IoClose } from "react-icons/io5";
import Input from './../input/Input';
import Button from './../button/Button';
import { FaCheck } from 'react-icons/fa6';
import { TiCancel } from 'react-icons/ti';
import Titulo from '../titulo/Titulo';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const ModalTemplate = ({ aberto, setAberto }) => {

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
                        <Titulo titulo={"Adicionar Cliente"} tamanho={"md"} />
                        <IoClose
                            className={styles["icon"]}
                            onClick={handleClose}
                        />
                    </div>
                    <div className={styles['form']}>
                        <Input
                            id={"nomeCliente"}
                            titulo={"Nome"}
                        />

                        <Input
                            titulo={"Sobrenome"}
                        />
                        <Input
                            titulo={"Email (Opcional)"}
                        />
                        <Input
                            titulo={"Telefone"}
                            mascara={"(00) 00000-0000"}
                        />
                    </div>
                    <div className={styles['group-button']}>
                        <Button
                            titulo={"Cancelar"}
                            cor={"branco"}
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
                            titulo={"Adicionar"}
                            icone={<FaCheck />}
                            cor={"roxo"}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default ModalTemplate;