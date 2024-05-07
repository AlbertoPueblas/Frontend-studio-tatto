import { updateDate } from "../../services/apiCalls";
import { useState } from 'react'
import { useSelector } from "react-redux";
import { getUserData } from "../../app/slice/userSlice";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

//------------------------------------------------------------

export const Dates = () => {
    const navigate = useNavigate()

    const [appDates, setAppDates] = useState({
        id:"",
        appointmentDate: "",
        jobId: "",
        tattoArtistId: "",
    })

    const userReduxData = useSelector(getUserData)
    const token = userReduxData.token

    const inputHandlerDate = (e) => {
        console.log(typeof (e.target.value), e.target.name);
        setAppDates((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const dateForUpgrade = async () => {
        try {
            const res = await updateDate(appDates, token);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <CustomInput
                typeProp="text"
                nameProp="id"
                placeholderProp="id"
                handlerProp={(e) => inputHandlerDate(e)}
            />
            <CustomInput
                typeProp="date"
                nameProp="appointmentDate"
                placeholderProp="date"
                handlerProp={(e) => inputHandlerDate(e)}
            />
            <CustomInput
                typeProp="text"
                nameProp="jobId"
                placeholderProp="jobId"
                handlerProp={(e) => inputHandlerDate(e)}
            />

            <CustomInput
                typeProp="text"
                nameProp="tattoArtistId"
                placeholderProp="tattoArtistId"
                handlerProp={(e) => inputHandlerDate(e)}
            />


            <Button onClick={() => {
                dateForUpgrade(),
                    setTimeout(() => {
                        navigate("/profile")
                    }, [1000])
            }}>
                Update Appointment
            </Button>
        </>
    )
};
export default Dates