import { useSelector } from "react-redux"
import { getUserData } from "../../app/slice/userSlice"
// import { getAppointmentId } from "../../app/slice/appointmentSlice"
import { useEffect, useState } from "react"
import { bringAllUsers, deleteUserId, getUserById, putUserId } from "../../services/apiCalls"
import './Admin.css'

//---------------------------------------------------------------------------------

export const Admin = () => {
    const [users, setUsers] = useState([])
    // const [appointmentId, setAppointmentId] = useState([])

    const userReduxData = useSelector(getUserData)
    // const appointmentData = useSelector(getAppointmentId)
    const token = userReduxData.token
    
    
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await bringAllUsers(token)
            setUsers(res.data.users)
        }
        fetchUsers()
    }, [])

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const res = await bringAllappointment(appointmentData)
    //         setAppointmentId(res.data.appointmentId)
    //         console.log(res.data.appointmentId)
    //     }
    //     fetchUsers()
    // }, [])

    useEffect(() => {
        console.log(users);
    }, [users])

    const deleteUser = async (id) => {
        const res = await deleteUserId(id, token)
        console.log(res);
    };

    const getUser = async (id) => {
        const res = await getUserById(id, token)
        console.log(res);
    };

    // const putUser = async (id) => {
    //     const res = await putUserId(id, token)
    //     console.log(res);
    // };

    return (
        <>
            <div className="userList">
                {users.length > 0 ? (
                    <ol>
                        {users.map((user) => {
                            return (
                                <li key={user.id} className="flex-row">
                                    {user.firstName} {user.email}
                                    <div className="deleteButton" onClick={() => deleteUser(user.id)}></div>
                                    {/* <div className="upgradeButton" onClick={() => putUser(user.id)}></div> */}
                                    <div className="showButton" onClick={() => getUser(user.id)}></div>

                                </li>
                            );
                        })}

                    </ol>
                ) : null}
            </div>
        </>
    )

}