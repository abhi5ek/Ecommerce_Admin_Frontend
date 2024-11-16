import {
    CCard,
    CCardBody,
    CCardHeader,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CButton,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EstimateManagement = () => {

    const [selectedEstimate, setSelectedEstimate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [estimate, setEstimate] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/estimate/`);
            setEstimate(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleView = (estimate) => {
        setSelectedEstimate(estimate);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/estimate/delete/${id}`)
            fetchData();
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            <CCard>
                <CCardHeader>
                    <h5>Estimate Management</h5>
                </CCardHeader>
                <CCardBody>
                    <CTable striped bordered hover responsive>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Index</CTableHeaderCell>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Name</CTableHeaderCell>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Email</CTableHeaderCell>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Mobile</CTableHeaderCell>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Message</CTableHeaderCell>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Actions</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {estimate.map((estimate, index) => (
                                <CTableRow key={estimate._id}>
                                    <CTableDataCell style={{ textAlign: 'center' }}>{index + 1}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>{estimate.name}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>{estimate.email}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>{estimate.mobile}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>{estimate.message}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>
                                        <CButton onClick={() => handleView(estimate)}>
                                            <FontAwesomeIcon style={{ color: 'blue' }} icon={faEye} />
                                        </CButton>
                                        <CButton onClick={() => handleDelete(estimate._id)}>
                                            <FontAwesomeIcon style={{ color: 'red' }} icon={faTrash} />
                                        </CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                </CCardBody>
            </CCard>

            <CModal visible={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <CModalHeader closeButton>Estimate Details</CModalHeader>
                <CModalBody>
                    {selectedEstimate && (
                        <>
                            <p><strong>Name:</strong> {selectedEstimate.name}</p>
                            <p><strong>Email:</strong> {selectedEstimate.email}</p>
                            <p><strong>Mobile:</strong> {selectedEstimate.mobile}</p>
                            <p><strong>Message:</strong> {selectedEstimate.message}</p>
                        </>
                    )}
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setIsModalOpen(false)}>
                        Close
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

export default EstimateManagement;
