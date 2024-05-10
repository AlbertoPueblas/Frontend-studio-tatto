import { useSelector } from "react-redux";
import { getUserData } from "../../app/slice/userSlice";
import { useEffect, useState } from "react";
import { bringAllUsers, bringAppointment, deleteUserId, getUserById
} from "../../services/apiCalls";
import Table from 'react-bootstrap/Table';
import './Admin.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import dayjs from "dayjs";
import { Navigate, useNavigate } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const [oneUser, setOneUser] = useState({});
  const [userData, setUserData] = useState({});
  const [show, setShow] = useState(false);
  const [areYouDeletingMe, setAreYouDeletingMe] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const userReduxData = useSelector(getUserData);
  const token = userReduxData.token;
  const userType = userReduxData.decoded.userRole;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await bringAllUsers(token, currentPage);
        setUsers(res.data.users);
        setTotalPages(res.data.total_pages);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchUsers();
  }, [currentPage, token]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchDates = async (userId) => {
    const res = await bringAppointment(userId, token);
    setUserData(res.data.clientDates);
  };

  const fetchProfile = async (userId) => {
    const res = await getUserById(userId, token);
    setOneUser(res.data);
  };

  const deleteUser = async (id) => {
    const res = await deleteUserId(id, token);
  };

  const handleClose = () => {
    navigate("/");
    setTimeout(() => {
      navigate("/Admin");
    });
    setShow(false);
  };

  const deleteUserStepOne = (id) => {
    if (areYouDeletingMe === id) {
      setAreYouDeletingMe(null);
    } else {
      setAreYouDeletingMe(id);
    }
  };


  return (
    <>
      {userType === "Admin" ? (
        <>
          <Table striped>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                <>
                  {users.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>
                          <div className="userList">
                            <div
                              className="showButton"
                              onClick={() => {
                                setShow(true);
                                fetchDates(user.id);
                                fetchProfile(user.id);
                              }}
                            >
                            </div>
                            <div
                              className="deleteButton"
                              onClick={() => deleteUserStepOne(user._id)}
                            >
                            </div>
                            <div
                              className={
                                areYouDeletingMe === user._id
                                  ? "deleteButton confirmDelete"
                                  : "deleteButton confirmDelete display-none"
                              }
                              onClick={() =>
                                deleteUser(user.id)
                                  .then(() => {
                                    navigate("/");
                                    setTimeout(() => {
                                      navigate("/Admin");
                                    });
                                  })
                                  .catch((error) => console.error(error))
                              }
                            >
                              Confirm Delete?
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : null}
            </tbody>
          </Table>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>User Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tabs defaultActiveKey="home" id="user-details-tab">
                <Tab eventKey="home" title="Profile">
                  <h6>User ID: {oneUser.id}</h6>
                  <h6>Name: {oneUser.firstName}</h6>
                  <h6>Last Name: {oneUser.lastName}</h6>
                  <h6>Email: {oneUser.email}</h6>
                </Tab>
                <Tab eventKey="dates" title="Dates">
                  {userData.length > 0 &&
                    userData.map((date) => (
                      <div key={date.id}>
                        <h6>Appointment ID: {date.id}</h6>
                        <h6>
                          Appointment Date:{" "}
                          {dayjs(date.appointmentDate).format(
                            "dddd, MMMM D, YYYY, h:mm A"
                          )}
                        </h6>
                        <h6>User ID: {date.userId}</h6>
                        <h6>Artist ID: {date.tattooArtistId}</h6>
                      </div>
                    ))}
                </Tab>
              </Tabs>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <div className="pagination">
            <Pagination>
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};