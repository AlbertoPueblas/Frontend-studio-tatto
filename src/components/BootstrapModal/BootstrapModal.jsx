import { useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { CustomInput } from "../CustomInput/CustomInput";
import Modal from "react-bootstrap/Modal";
import { updateProfile } from "../../services/apiCalls";



//-----------------------------------------------------------

function BootstrapModal({ profileData, inputHandler, token }) {
    const [show, setShow] = useState(false)
    
    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/");
        setTimeout(() => {
            navigate("/Profile")
        });
        console.log("close");
        setShow(false);
    }
    // const handleUpdate = async () => {
    //     try {
    //         await updateProfile(profileData, token);
    //         console.log("datos actualizados");
    //         navigate("/Profile")
    //         setTimeout(() => {
    //             setShow(false);
    //         }, 2000)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const handleUpdate = () => {
        updateProfile(profileData,token);
        console.log(profileData);
    };



    return (
        <>
            <Button variant="primary" onClick={() => setShow(true)}>
                Modificar
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
                        typeProp="text"
                        nameProp="lastName"
                        placeholderProp="lastName"
                        value={profileData.lastName}
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleUpdate()
                        handleClose()
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default BootstrapModal