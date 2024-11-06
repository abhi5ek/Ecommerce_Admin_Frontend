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
    CBadge,
    CButton,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

const InquiryManagement = () => {

    const [inquiries, setInquiries] = useState([
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            mobile: '123-456-7890',
            subject: 'Product Inquiry',
            message: 'Looking for product details',
            status: 'Pending'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            mobile: '987-654-3210',
            subject: 'Order Issue',
            message: 'Need support for my order',
            status: 'Resolved'
        },
        {
            id: 3,
            name: 'Sam Johnson',
            email: 'sam.johnson@example.com',
            mobile: '555-123-4567',
            subject: 'Callback Request',
            message: 'Request for a callback',
            status: 'In Progress'
        },
    ]);

    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleView = (inquiry) => {
        setSelectedInquiry(inquiry);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        setInquiries(inquiries.filter(inquiry => inquiry.id !== id));
        console.log(`Inquiry with ID ${id} deleted`);
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Pending':
                return 'warning';
            case 'In Progress':
                return 'primary';
            case 'Resolved':
                return 'success';
            default:
                return 'secondary';
        }
    };

    return (
        <>
            <CCard>
                <CCardHeader>
                    <h5>Inquiry Management</h5>
                </CCardHeader>
                <CCardBody>
                    <CTable striped bordered hover responsive>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Index</CTableHeaderCell>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Name</CTableHeaderCell>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Subject</CTableHeaderCell>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Status</CTableHeaderCell>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Actions</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {inquiries.map((inquiry, index) => (
                                <CTableRow key={inquiry.id}>
                                    <CTableDataCell style={{ textAlign: 'center' }}>{index + 1}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>{inquiry.name}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>{inquiry.subject}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>
                                        <CBadge color={getStatusBadge(inquiry.status)}>{inquiry.status}</CBadge>
                                    </CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>
                                        <CButton onClick={() => handleView(inquiry)}>
                                            <FontAwesomeIcon style={{ color: 'blue' }} icon={faEye} />
                                        </CButton>
                                        <CButton onClick={() => handleDelete(inquiry.id)}>
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
                <CModalHeader closeButton>Inquiry Details</CModalHeader>
                <CModalBody>
                    {selectedInquiry && (
                        <>
                            <p><strong>Name:</strong> {selectedInquiry.name}</p>
                            <p><strong>Email:</strong> {selectedInquiry.email}</p>
                            <p><strong>Mobile:</strong> {selectedInquiry.mobile}</p>
                            <p><strong>Subject:</strong> {selectedInquiry.subject}</p>
                            <p><strong>Message:</strong> {selectedInquiry.message}</p>
                            <p><strong>Status:</strong> {selectedInquiry.status}</p>
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

export default InquiryManagement;
