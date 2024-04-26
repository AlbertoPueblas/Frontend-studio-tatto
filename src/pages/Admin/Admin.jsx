import { useSelector } from "react-redux"
import { getUserData } from "../../app/slice/userSlice"
import { useEffect, useState } from "react"
import { bringAllUsers, bringAppointment, deleteUserId, getUserById} from "../../services/apiCalls"
import Table from 'react-bootstrap/Table';
import './Admin.css'

//---------------------------------------------------------------------------------

export const Admin = () => {
    const [users, setUsers] = useState([])
    const [userData, setUserData] = useState({})


    const userReduxData = useSelector(getUserData)
    const token = userReduxData.token
    
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await bringAllUsers(token)
            console.log(res.data.users);
            setUsers(res.data.users)
        }
        fetchUsers()
    }, [])

    // useEffect(() => {

        const fetchUser = async (id) => {
            const res = await bringAppointment(id, token)
            setUserData(res)
        }
    //     fetchUser()
    // },[])

    
    useEffect(() => {
        console.log(userData);
    }, [userData])
    

    const deleteUser = async (id) => {
        const res = await deleteUserId(id, token)
        console.log(res);
    };

    const getUser = async (id) => {
        const res = await getUserById(id, token)
        console.log(res,);
    };

      return (
        <>
        <Table striped>   
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
                <tr>
            <th key={user.id}>

            {user.firstName}</th>
            <th>{user.lastName}</th>
            <th>{user.email}</th>
            <th>
                <div className="userList">
                <div className="showButton" onClick={() => {
                    fetchUser(user.id)
                }}></div>
                <div className="deleteButton" onClick={
                    () => deleteUser(user.id)}></div>
                                    <div className="upgradeButton" onClick={
                    () => getUser(user.id)}></div>
                </div>                                    
                </th>
            </tr>
        ))}

            </tbody>
        </Table>
        </>
      );
    }
    
            {/* {users.map((date) => (
                <tr>
                    <th key={date.id}>{date.firstName}</th>
                    <th>{date.lastName}</th>
                    <th>{date.email}</th>
                    <th>{date.username}</th>
                    <div className="showButton" onClick={() => {
                        fetchDates(date.id)
                    }}></div>
                    </tr>
                ))} */}