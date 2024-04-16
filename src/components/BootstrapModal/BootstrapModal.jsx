import { useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { CustomInput } from "../CustomInput/CustomInput";
import Modal from "react-bootstrap/Modal";
import { updateProfile } from "../../services/apiCalls";



//-----------------------------------------------------------

function BootstrapModal({ profileData, inputHandler, token }) {
    const [show, setShow] = useState(false)
    const [logOut, setLogOut] = useTransition(false)


    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/");
        setTimeout(() => {
            navigate("/Profile")
        });
        console.log("close");
        setShow(false);
    }
    const handleUpdate = async () => {
        try {
            await updateProfile(profileData, token);
            console.log("datos actualizados");
            navigate("/")
            setTimeout(() => {
                setShow(false);
            }, 2000)
        } catch (error) {
            console.log(error);
        }
    };
   
    const handleLogOut = async () => {
        try {
            await logOutProfile(profileData, token);
            console.log("datos borrado");
            console.log(typeof(logOutProfile));
            setTimeout(() => {
                logOut(false)
            }, 2000)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={() => setShow(true)}>
                Modificar
            </Button>
            <Button variant="primary" onClick={() =>setLogOut(true)}>
                LogOut
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edita tus datos!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CustomInput
                        typeProp="text"
                        nameProp="firstName"
                        placeholderProp="firstName"
                        value={profileData.name}
                        isDisabled=""
                        handlerProp={inputHandler}
                    />
                    <CustomInput
                        typeProp="email"
                        nameProp="email"
                        placeholderProp="email"
                        value={profileData.email}
                        isDisabled=""
                        handlerProp={inputHandler}
                    />
                    <CustomInput
                        typeProp="text"
                        nameProp="lastName"
                        placeholderProp="lastName"
                        value={profileData.lastName}
                        isDisabled=""
                        handlerProp={inputHandler}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Guardar cambios
                    </Button>
                    <Button variant="primary" onClick={handleLogOut}>
                        borrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default BootstrapModal