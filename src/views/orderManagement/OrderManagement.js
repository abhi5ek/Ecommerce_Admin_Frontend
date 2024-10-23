import React, { useEffect, useState } from 'react';
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
import { faEnvelope, faEye } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const OrderManagement = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const orders = [
        {
            orderId: '12345',
            fullName: 'John Doe',
            email: 'abhishekpandey7676@gmail.com',
            country: 'USA',
            address: '123 Main St',
            landmark: 'Near Central Park',
            quantity: 2,
            productId: 'P001',
        },
        {
            orderId: '12346',
            fullName: 'Jane Smith',
            email: 'abhishekpandey7676@gmail.com',
            country: 'Canada',
            address: '456 Maple Ave',
            landmark: 'Next to the library',
            quantity: 1,
            productId: 'P002',
        },
        {
            orderId: '12347',
            fullName: 'Alice Johnson',
            email: 'sumitksingh1166@gmail.com',
            country: 'UK',
            address: '789 Pine Rd',
            landmark: 'Behind the school',
            quantity: 3,
            productId: 'P003',
        },
        {
            orderId: '12348',
            fullName: 'Michael Brown',
            email: 'abhishekpandey7676@gmail.com',
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

    const handleEmail = (order) => {
        const confirmation = window.confirm(`Are you sure you want to send an email to ${order.email}?`);

        if (confirmation) {
            toast.info("Email getting sent...", {
                autoClose: 2000, 
                position: "top-right",
            });
            sendEmailToServer(order);
        } else {
            toast.error("Email not sent.", {
                autoClose: 2000, 
                position: "top-right",
            });
        }
    };

    const sendEmailToServer = async (order) => {
        console.log("Sending order:", order); 
    
        try {
            const response = await axios.post(`http://44.196.192.232:5000/api/orders/send-email`, order, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            console.log("Response:", response); // Log the response from the server
    
            if (response.status === 200) {
                toast.success("Email sent successfully!", {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "colored"
                });
            } else {
                toast.error("Failed to send email.", {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "colored"
                });
            }
        } catch (error) {
            console.error("Error while sending email:", error); // Log detailed error
            toast.error("Error occurred while sending email.", {
                position: "top-right",
                autoClose: 2000,
                theme: "colored"
            });
        }
    };
    

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedOrder(null);
    };

    return (
        <>
            <ToastContainer />
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
                                        <CTableHeaderCell>Send Email</CTableHeaderCell>
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
                                                <CButton onClick={() => handleEmail(order)}>
                                                    <FontAwesomeIcon style={{ color: 'red' }} icon={faEnvelope} />
                                                </CButton>
                                            </CTableDataCell>
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
