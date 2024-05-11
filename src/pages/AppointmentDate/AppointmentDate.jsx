import { appointmentCreate, bringAllArtist, bringAllJobs } from "../../services/apiCalls";
import { useEffect, useState } from 'react'
import './AppointmentDate.css'
import dayjs from "dayjs"
import 'react-day-picker/dist/style.css';
import { useSelector } from "react-redux";
import { getUserData } from "../../app/slice/userSlice";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import { MyInput } from "../../components/MyInput/MyInput";
//------------------------------------------------------------

export const Dates = () => {
    const [isEditing, setIsEditing] = useState();
    const navigate = useNavigate()

    const [appCreate, setAppCreate] = useState({
        appointmentDate: "",
        tattoArtistId: "",
        jobId: "",
    })
    const [jobs, setJobs] = useState([])
    const [Artists, setArtists] = useState([])
    const [now, setNow] = useState(Date())
    const [selected, setSelected] = useState();
    const [msg, setMsg] = useState("")

    const userReduxData = useSelector(getUserData)
    const token = userReduxData.token

    const inputHandlerDates = (e) => {
        setAppCreate((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,

        }));
    };

    useEffect(() => {
        const fetchArtistAndJobs = async () => {
            const res = await bringAllArtist(token)
            setArtists(res.data.artist)
            const resp = await bringAllJobs(token)
            setJobs(resp.data.jobs)
        }
        fetchArtistAndJobs()
    }, [])

    const dateForMe = async () => {
        try {
            const res = await appointmentCreate(appCreate, token);
        } catch (error) {
        }
    }

    return (
        <>
            <div className='calendar'><h4>Actual Date:{dayjs(now).format
                ("dddd, MMMM D, YYYY h:mm A")}</h4>
            <MyInput
                typeProp="datetime-local"
                nameProp="appointmentDate"
                value={selected}
                placeholderProp="date"
                handlerProp={(e) => inputHandlerDates(e)}
                />
            <select name="jobId" onChange={(e) => inputHandlerDates(e)}
                className="select">
                <option value="">Select Job</option>
                {jobs.map((job) => {
                    return (
                        <option value={job.id} key={job.id}>{job.jobs}</option>
                    )
                })}
            </select>
            <select name="tattoArtistId" onChange={(e) => inputHandlerDates(e)}
                className="select">
                <option value="">Select Artist</option>
                {Artists.map((art) => {
                    return (
                        <option value={art.id} key={art.id}>{art.firstName}</option>
                    )
                })}
            </select>



            <Button onClick={() => {
                dateForMe(),
                navigate("/profile")
            }}>
                Send Appointment
            </Button>
                </div>
        </>
    )
};
export default Dates