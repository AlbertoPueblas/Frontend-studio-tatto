import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { MyInput } from "../MyInput/MyInput";
import Modal from "react-bootstrap/Modal";
import { bringAllArtist, bringAllJobs, bringOneDate,} from "../../services/apiCalls";

//-----------------------------------------------------------

const MyModal = ({ dates, appDates, inputHandlerDate, token }) => {
    const [show, setShow] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [artists, setArtists] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchArtist = async () => {
            const res = await bringAllArtist(token);
            setArtists(res.data.artist);
        };
        fetchArtist();
    }, [token]);

    useEffect(() => {
        const fetchJobs = async () => {
            const res = await bringAllJobs(token);
            setJobs(res.data.jobs);
        };
        fetchJobs();
    }, [token]);

    const navigate = useNavigate();

    const handleClose = () => {
        setShow(false);
        navigate("/Profile");
    };

    const bringMeDate = async (id) => {
        const res = await bringOneDate(id, token)
      };
      const dateForUpgrade = async () => {
        try {
            const res = await updateDate(appDates, token);
            console.log(res);
            navigate("/profile");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={() => setShow((true),
                 bringMeDate(dates.id))}>
                Modify
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit your data!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <MyInput
                        typeProp="text"
                        nameProp="id"
                        value={dates.id}
                        isDisabled={!isEditing}
                        handlerProp={inputHandlerDate}
                    />

                    <MyInput
                        typeProp="datetime-local"
                        nameProp="appointmentDate"
                        value={dates.appointmentDate}
                        handlerProp={inputHandlerDate}
                    />

                    <select
                        name="jobId"
                        value={dates.jobId}
                        onChange={inputHandlerDate}
                        className="select"
                    >
                        <option value="">Select Job</option>
                        {jobs.map((job) => (
                            <option value={job.id} key={job.id}>
                                {job.jobs}
                            </option>
                        ))}
                    </select>
                    <select
                        name="tattoArtistId"
                        value={dates.tattoArtistId}
                        onChange={inputHandlerDate}
                        className="select"
                    >
                        <option value="">Select Artist</option>
                        {artists.map((art) => (
                            <option value={art.id} key={art.id}>
                                {art.firstName}
                            </option>
                        ))}
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={dateForUpgrade}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default MyModal;
