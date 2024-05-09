import { createSlice } from "@reduxjs/toolkit";

//--------------------------------------------------------------

export const appointmentSlice = createSlice({
    name: "appointment",
    initialState: {
        token:"",
        decodificado: {
            id:"",
            dates:"",
            jobId:""
        }
    },
    reducers: {
        appointmentDetail: (state, action) => {
            return action.payload
        }
    }
})

export const getAppointmentId = (state) => state.appointment
export default appointmentSlice.reducer;