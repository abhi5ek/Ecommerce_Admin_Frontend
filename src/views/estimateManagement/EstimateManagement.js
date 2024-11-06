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
import React, { useState } from 'react';

const EstimateManagement = () => {

    const [estimates, setEstimates] = useState([
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            mobile: '123-456-7890',
            message: 'Looking for an estimate on product A'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            mobile: '987-654-3210',
            message: 'Need an estimate for service B'
        },
        {
            id: 3,
            name: 'Sam Johnson',
            email: 'sam.johnson@example.com',
            mobile: '555-123-4567',
            message: 'Requesting an estimate for custom project'
        },
    ]);

    const [selectedEstimate, setSelectedEstimate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleView = (estimate) => {
        setSelectedEstimate(estimate);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        setEstimates(estimates.filter(estimate => estimate.id !== id));
        console.log(`Estimate with ID ${id} deleted`);
    };

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
                            {estimates.map((estimate, index) => (
                                <CTableRow key={estimate.id}>
                                    <CTableDataCell style={{ textAlign: 'center' }}>{index + 1}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>{estimate.name}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>{estimate.email}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>{estimate.mobile}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>{estimate.message}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>
                                        <CButton onClick={() => handleView(estimate)}>
                                            <FontAwesomeIcon style={{ color: 'blue' }} icon={faEye} />
                                        </CButton>
                                        <CButton onClick={() => handleDelete(estimate.id)}>
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
