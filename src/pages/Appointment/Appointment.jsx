// import { useSelector } from "react-redux"
// import { getAppointmentId } from "../../app/slice/appointmentSlice"
// import { useEffect, useState } from "react"
// import {  bringAllappointment } from "../../services/apiCalls"

// //---------------------------------------------------------------------------------

// export const Appointment = () => {
//     const [dates, setDates] = useState([])

//     const userRedux = useSelector(getAppointmentId)
//     const token = userRedux.token
    
//     useEffect(() => {
//         const fetchDates = async () => {
//             const res = await bringAllappointment(token)
//             console.log(res);
//             setDates(res.dates.userId)
//         }
//         fetchDates()
//     }, [])

    
//     useEffect(() => {
//         console.log(dates);
//     }, [])
    

//     return (
//         <>
//             <div className="datesList">
//                 {dates.length > 0 ? (
//                     <ol>
//                         {dates.map((user) => {
//                             return (

//                                 <li key={user.id} className="flex-row">
//                                     {user.firstName} {user.email}{user.dates}
//                                     {/* <div className="showButton" onClick={() => getUser(user.id)}></div> */}
//                                     {/* <div className="deleteButton" onClick={() => deleteUser(user.id)}></div> */}
//                                 </li>
//                             );
//                         })}
//                     </ol>
//                 ) : null}
//             </div>
//         </>
//     )

// }