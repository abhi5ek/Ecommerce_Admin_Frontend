import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

const UserManagement = () => {

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming you're storing the token in localStorage

      console.log(token)

      const response = await axios.get(`http://44.196.64.110:3000/api/user/`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
      });

      setUserData(response.data.data);
    } catch (error) {
      console.error("message:", error);
    }

  }

  return (
    <>
      <CTable>
        <CTableHead>
          <CTableRow color="primary">
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Age</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>

        <CTableBody>
          {userData.map((user, index) => (
            <CTableRow key={user.id}>
              <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
              <CTableDataCell>{user.firstName}</CTableDataCell>
              <CTableDataCell>{user.email}</CTableDataCell>
              <CTableDataCell>{user.age}</CTableDataCell>
              <CTableDataCell>
                <FontAwesomeIcon
                  icon={faPen}
                  title="Edit"
                  style={{ color: 'blue', cursor: 'pointer', marginRight: '8px' }}
                />
                <FontAwesomeIcon
                  icon={faEye}
                  title="View"
                  style={{ color: 'green', cursor: 'pointer', marginRight: '8px' }}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  title="Delete"
                  style={{ color: 'red', cursor: 'pointer', marginRight: '8px' }}
                />
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  );

}
export default UserManagement;