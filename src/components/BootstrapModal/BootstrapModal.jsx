import { useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateProfile } from "../../services/apiCalls";
import { MyInput } from "../MyInput/MyInput";

//-----------------------------------------------------------

function BootstrapModal({ profileData, inputHandler, token }) {
    const [show, setShow] = useState(false)

    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/");
        setTimeout(() => {
            navigate("/Profile")
        });
        setShow(false);
    }
    const handleUpdate = async () => {
        try {
            await updateProfile(profileData, token);
            setTimeout(() => {
                navigate("/Profile")
                setShow(false);
            }, 2000)
        } catch (error) {
        }
    };

    return (
        <>
            <Button variant="primary" onClick={() => setShow(true)}>
                modify profile
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edita tus datos!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MyInput
                        typeProp="text"
                        nameProp="firstName"
                        // placeholderProp="firstName"
                        value={profileData.firstName}
                        isDisabled=""
                        handlerProp={inputHandler}
                    />
                    <MyInput
                        typeProp="text"
                        nameProp="lastName"
                        placeholderProp="lastName"
                        value={profileData.lastName}
                        isDisabled=""
                        handlerProp={inputHandler}
                    />
                    <MyInput
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