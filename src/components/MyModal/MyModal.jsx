import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { MyInput } from "../MyInput/MyInput";
import Modal from "react-bootstrap/Modal";
import { bringAllArtist, bringAllJobs, updateDate } from "../../services/apiCalls";

//-----------------------------------------------------------

const MyModal = ({ dates, appDates, inputHandlerDate, token }) => {
    const [show, setShow] = useState(false)
    const [jobs, setJobs] = useState([])
    const [Artists, setArtists] = useState([])
    const [isEditing, setIsEditing] = useState(false);


    useEffect(() => {
        const fetchArtist = async () => {
            const res = await bringAllArtist(token)
            // console.log(res.data.artist);
            setArtists(res.data.artist)
        }
        fetchArtist()
    }, [])


    useEffect(() => {
        const fetchJobs = async () => {
            const res = await bringAllJobs(token)
            // console.log(res.data.jobs);
            setJobs(res.data.jobs)
        }
        fetchJobs()
    }, [])

    const navigate = useNavigate();

    const handleClose = () => {
        setTimeout(() => {
            navigate("/Profile")
        });
        console.log("close");
        setShow(false);
    }
    // const handleUpdate = async () => {
    //     try {
    //         await updateDate(appDates, token);
    //         console.log("datos actualizados");
    //         setTimeout(() => {
    //         navigate("/Profile")
    //             setShow(false);
    //         },[2000])
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    // Lógica para enviar los datos al backend
const dateForUpgrade = async () => {
    try {
        // Agregar la id al objeto de datos antes de enviarlo al backend
        const dataToSend = {
            ...appDates,
            // Puedes acceder a la id almacenada en el estado interno del componente
        };

        // Enviar los datos al backend
        const res = await updateDate(dataToSend, token);
        console.log(res);
        navigate("/profile");
    } catch (error) {
        console.log(error);
    }
};


    return (
        <>
            <Button variant="primary" onClick={() => setShow(true)}>
                modify
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edita tus datos!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MyInput
                        typeProp="text"
                        nameProp="id"
                        isDisabled={!isEditing}
                        value={appDates.id}
                        readOnly
                    />
                    <MyInput
                        typeProp="text"
                        nameProp="userId"
                        isDisabled={isEditing}
                        value={dates.userId}
                        handlerProp={inputHandlerDate}
                    />
                    <MyInput
                        typeProp="datetime-local"
                        nameProp="appointmentDate"
                        placeholderProp="date"
                        value={appDates.appointmentDate}
                        handlerProp={inputHandlerDate}
                        disabled=""
                    />
                    <select name="jobId"
                        value={dates.jobId}
                        disabled=""
                        onChange={(e) => inputHandlerDate(e)}
                        className="select">
                        <option value="">Select Job</option>
                        {jobs.map((job) => {
                            return (
                                <option value={job.id} key={job.id}>{job.jobs}</option>
                            )
                        })}
                    </select>
                    <select name="tattoArtistId"
                        value={dates.tattoArtistId}
                        disabled=""
                        onChange={(e) => inputHandlerDate(e)}
                        className="select">
                        <option value="">Select Artist</option>

                        {Artists.map((art) => {
                            return (
                                <option value={art.id} key={art.id}>{art.firstName}</option>
                            )
                        })}
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => {
                        dateForUpgrade()
                        handleClose()
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default MyModal