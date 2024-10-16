import React, { useState } from 'react';
import {
    CCard,
    CCardHeader,
    CCardBody,
    CTable,
    CTableHead,
    CTableHeaderCell,
    CTableBody,
    CTableRow,
    CTableDataCell,
    CRow,
    CCol,
    CButton,
    CBadge,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const OrderManagement = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const orders = [
        {
            orderId: '12345',
            fullName: 'John Doe',
            email: 'john.doe@example.com',
            country: 'USA',
            address: '123 Main St',
            landmark: 'Near Central Park',
            quantity: 2,
            productId: 'P001',
        },
        {
            orderId: '12346',
            fullName: 'Jane Smith',
            email: 'jane.smith@example.com',
            country: 'Canada',
            address: '456 Maple Ave',
            landmark: 'Next to the library',
            quantity: 1,
            productId: 'P002',
        },
        {
            orderId: '12347',
            fullName: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            country: 'UK',
            address: '789 Pine Rd',
            landmark: 'Behind the school',
            quantity: 3,
            productId: 'P003',
        },
        {
            orderId: '12348',
            fullName: 'Michael Brown',
            email: 'michael.brown@example.com',
            country: 'Australia',
            address: '135 Oak St',
            landmark: 'Near the beach',
            quantity: 4,
            productId: 'P004',
        },
    ];

    const handleViewClick = (order) => {
        setSelectedOrder(order); 
        setModalVisible(true); 
        console.log("button");
    };

    const handleCloseModal = () => {
        setModalVisible(false); // Hide the modal
        setSelectedOrder(null); // Clear the selected order
    };

    return (
        <>
        <CCard>
            <CCardHeader>
                <h5>Order Management</h5>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol>
                        <CTable striped bordered hover responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>Order ID</CTableHeaderCell>
                                    <CTableHeaderCell>Full Name</CTableHeaderCell>
                                    <CTableHeaderCell>Email</CTableHeaderCell>
                                    <CTableHeaderCell>Country</CTableHeaderCell>
                                    <CTableHeaderCell>Address</CTableHeaderCell>
                                    <CTableHeaderCell>Landmark</CTableHeaderCell>
                                    <CTableHeaderCell>Quantity</CTableHeaderCell>
                                    <CTableHeaderCell>Product ID</CTableHeaderCell>
                                    <CTableHeaderCell>Action</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {orders.map((order, index) => (
                                    <CTableRow key={index} hover>
                                        <CTableDataCell>{order.orderId}</CTableDataCell>
                                        <CTableDataCell>{order.fullName}</CTableDataCell>
                                        <CTableDataCell>{order.email}</CTableDataCell>
                                        <CTableDataCell>
                                            <CBadge color="primary">{order.country}</CBadge>
                                        </CTableDataCell>
                                        <CTableDataCell>{order.address}</CTableDataCell>
                                        <CTableDataCell>{order.landmark}</CTableDataCell>
                                        <CTableDataCell>{order.quantity}</CTableDataCell>
                                        <CTableDataCell>{order.productId}</CTableDataCell>
                                        <CTableDataCell style={{ textAlign: 'center' }}>
                                            <CButton style={{ margin: '0 2px', padding: '4px' }} onClick={() => handleViewClick(order)}>
                                                <FontAwesomeIcon style={{ color: 'blue' }} icon={faEye} />
                                            </CButton>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>

            <CModal visible={modalVisible} onClose={handleCloseModal} >
                <CModalHeader closeButton>
                    <CModalTitle>Order Details</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {selectedOrder && (
                        <div>
                            <h5>Order ID: {selectedOrder.orderId}</h5>
                            <p><strong>Full Name:</strong> {selectedOrder.fullName}</p>
                            <p><strong>Email:</strong> {selectedOrder.email}</p>
                            <p><strong>Country:</strong> {selectedOrder.country}</p>
                            <p><strong>Address:</strong> {selectedOrder.address}</p>
                            <p><strong>Landmark:</strong> {selectedOrder.landmark}</p>
                            <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
                            <p><strong>Product ID:</strong> {selectedOrder.productId}</p>
                        </div>
                    )}
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleCloseModal}>
                        Close
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

export default OrderManagement;
