import { useSelector } from "react-redux"
import { getUserData } from "../../app/slice/userSlice"
import { useEffect, useState } from "react"
import { bringAllUsers, bringAllappointment, deleteUserId, getUserById } from "../../services/apiCalls"
import './Admin.css'

//---------------------------------------------------------------------------------

export const Admin = () => {
    const [users, setUsers] = useState([])
    const [dates, setDates] = useState([])


    const userReduxData = useSelector(getUserData)
    const token = userReduxData.token
    
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await bringAllUsers(token)
            setUsers(res.data.users)
        }
        fetchUsers()
    }, [])

    
    useEffect(() => {
        console.log(users);
    }, [users])

    // useEffect(() => {
        const fetchDates = async () => {
            const res = await bringAllappointment(token)
            console.log(res);
            setDates(res.dates)
            // console.log(res.data.dates);
        }
    //     fetchDates()
    // }, [])

    
    useEffect(() => {
        console.log(dates);
    }, [dates])
    
    // useEffect(() => {
    //     const fetchUserId = async () => {
    //         const res = await getUserById(token)
    //         setAppointmentId(res.data.dates)
    //     }
    //     fetchUserId()
    // }, [])

    // useEffect(() => {
    //     console.log(dates);
    // },[dates])

    const deleteUser = async (id) => {
        const res = await deleteUserId(id.params, token)
        console.log(res);
    };

    const getUser = async (id) => {
        const res = await getUserById(id,dates, token)
        console.log(res,);
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
                                    {user.firstName} {user.email}{user.dates}
                                    <div className="showButton" onClick={() => {
                                        // getUser(user.id)
                                        fetchDates()
                                    }}></div>
                                    <div className="deleteButton" onClick={() => deleteUser(user.id)}></div>

                                </li>
                            );
                        })}
                    </ol>
                ) : null}
            </div>
        </>
    )

}