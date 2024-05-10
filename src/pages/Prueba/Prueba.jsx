import { bringAllArtist, bringAllJobs, bringDates, bringProfile, updateDate } from "../../services/apiCalls";
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { getUserData } from "../../app/slice/userSlice";
import { MyInput } from "../../components/MyInput/MyInput";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

//------------------------------------------------------------

export const Dates = (id) => {
    const navigate = useNavigate()
    const [isEditing, setIsEditing] = useState(false);
    const [appDates, setAppDates] = useState({
        id: "",
        userId: "",
        appointmentDate: "",
        jobId: "",
        tattoArtistId: "",
    })
    const [userData, setUserData] = useState([]);

    // const [dataReady,setDataReady] = useState(false)

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const res = await bringProfile(token)
    //         setDataReady(true)
    //     }
    //     fetchData()
    // })

    useEffect(() => {
        const fetchDates = async () => {
          const res = await bringDates(token);
          console.log(res.clientDates);
          setUserData(res.clientDates);
        };
        if (userData.length === 0) {
          fetchDates();
        }
      }, [userData]);

    const userReduxData = useSelector(getUserData)
    const token = userReduxData.token

    const [jobs, setJobs] = useState([])
    const [Artists, setArtists] = useState([])

    useEffect(() => {
        const fetchArtist = async () => {
            const res = await bringAllArtist(token)
            console.log(res.data.artist);
            setArtists(res.data.artist)
        }
        fetchArtist()
    }, [])


    useEffect(() => {
        const fetchJobs = async () => {
            const res = await bringAllJobs(token)
            console.log(res.data.jobs);
            setJobs(res.data.jobs)
        }
        fetchJobs()
    }, [])

    const inputHandlerDate = (e) => {
        console.log(e.target.value, e.target.name);
        setAppDates((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const dateForUpgrade = async () => {
        try {
            const res = await updateDate(appDates, token);

            navigate("/profile");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <MyInput
                typeProp="text"
                nameProp="id"
                // isDisabled={!isEditing}
                value={userData.id}
                handlerProp={inputHandlerDate}

                // readOnly
            />
            <MyInput
                typeProp="text"
                nameProp="userId"
                // isDisabled={!isEditing}
                value={userData.userId}
                handlerProp={inputHandlerDate}

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
                {Artists.map((art) => {
                    return (
                        <option value={art.id} key={art.id}>{art.firstName}</option>
                    )
                })}
            </select>

            <Button onClick={dateForUpgrade}>
                Update Appointment
            </Button>

        </>
    )
};
export default Dates