import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { MyInput } from "../MyInput/MyInput";
import Modal from "react-bootstrap/Modal";
import { bringAllArtist, bringAllJobs, updateDate, } from "../../services/apiCalls";

//-----------------------------------------------------------

const MyModal = ({ dates, token }) => {
    const [show, setShow] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [artists, setArtists] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const [appDates, setAppDates] = useState({
        id: "",
        userId: "",
        appointmentDate: "",
        jobId: "",
        tattoArtistId: "",
    })

    useEffect(() => {
        const fetchArtistAndJobs = async () => {
            const resp = await bringAllArtist(token);
            setArtists(resp.data.artist);
            const res = await bringAllJobs(token);
            setJobs(res.data.jobs);
        };
        fetchArtistAndJobs();
    }, [token]);
    
    const dateForUpgrade = async () => {
      try {
          // Enviando al backend los valores de id y userId 
          const dataToSend = { ...appDates, id: dates.id, userId: dates.userId };
          const res = await updateDate(dataToSend, token);
          navigate("/profile");
      } catch (error) {
      }
    };

    const handleClose = () => {
        setShow(false);
        navigate("/Profile");
    };

    const inputHandlerDate = (e) => {
        setAppDates((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <>
            <Button variant="primary" onClick={() => setShow(true)}>
                Modify
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit your data!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <MyInput
                typeProp="hidden"
                nameProp="id"
                isDisabled={!isEditing}
                value={dates.id}
                readOnly
            />
            <MyInput
                typeProp="hidden"
                nameProp="userId"
                value={dates.userId}
                readOnly
            />
            <MyInput
                typeProp="datetime-local"
                nameProp="appointmentDate"
                placeholderProp="date"
                value={appDates.appointmentDate}
                handlerProp={(e) => inputHandlerDate(e)}
            />
            <select name="jobId" onChange={(e) => inputHandlerDate(e)}
                className="select">
                <option value="">Select Job</option>
                {jobs.map((job) => {
                    return (
                        <option value={job.id} key={job.id}>{job.jobs}</option>
                    )
                })}
            </select>
            <select name="tattoArtistId" onChange={(e) => inputHandlerDate(e)}
                className="select">
                <option value="">Select Artist</option>
                {artists.map((art) => {
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
                        window.location.reload()
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default MyModal;
