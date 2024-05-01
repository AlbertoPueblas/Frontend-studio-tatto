import { useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { CustomInput } from "../CustomInput/CustomInput";
import Modal from "react-bootstrap/Modal";
import { updateDate } from "../../services/apiCalls";

//-----------------------------------------------------------

function ModalDate({ appDates, inputHandlerDate, token }) {
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
    const handleUpdate = async () => {
        try {
            await updateDate(appDates, token);
            console.log("datos actualizados");
            setTimeout(() => {
                navigate("/Profile")
                setShow(false);
            }, 2000)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={() => setShow(true)}>
                modify Appointment
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edita tus Citas!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CustomInput
                        typeProp="date"
                        nameProp="appointmentDate"
                        placeholderProp="appointmentDate"
                        value={appDates.appointmentDate}
                        isDisabled=""
                        handlerProp={inputHandlerDate}
                    />
                    <CustomInput
                        typeProp="text"
                        nameProp="userId"
                        placeholderProp="userId"
                        value={appDates.userId}
                        isDisabled=""
                        handlerProp={inputHandlerDate}
                    />
                    <CustomInput
                        typeProp="text"
                        nameProp="jobId"
                        placeholderProp="jobId"
                        value={appDates.jobId}
                        isDisabled=""
                        handlerProp={inputHandlerDate}
                    />
                    <CustomInput
                        typeProp="text"
                        nameProp="tattoArtistId"
                        placeholderProp="tattoArtistId"
                        value={appDates.tattoArtistId}
                        isDisabled=""
                        handlerProp={inputHandlerDate}
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
export default ModalDate