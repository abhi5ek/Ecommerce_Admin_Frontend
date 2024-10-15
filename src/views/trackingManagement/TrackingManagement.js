import React, { useState } from 'react';
import {
    CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
    CFormSelect
} from '@coreui/react';

const TrackingManagement = () => {
    const [orderTrackingData, setOrderTrackingData] = useState([
        {
            orderId: 12345,
            orderedDate: '2024-10-01',
            status: 'Order Confirmed',
            expectedDeliveryDate: '2024-10-15'
        },
        {
            orderId: 12346,
            orderedDate: '2024-10-03',
            status: 'Shipped',
            expectedDeliveryDate: '2024-10-17'
        },
        {
            orderId: 12347,
            orderedDate: '2024-10-05',
            status: 'Out for Delivery',
            expectedDeliveryDate: '2024-10-18'
        },
        {
            orderId: 12348,
            orderedDate: '2024-10-07',
            status: 'Delivered',
            expectedDeliveryDate: '2024-10-09'
        }
    ]);

    const handleStatusChange = (orderId, newStatus) => {
        setOrderTrackingData(prevData =>
            prevData.map(order =>
                order.orderId === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Order Confirmed':
                return { color: 'blue' };
            case 'Shipped':
                return { color: 'orange' };
            case 'Out for Delivery':
                return { color: 'purple' };
            case 'Delivered':
                return { color: 'green' };
            default:
                return {};
        }
    };

    return (
        <>
            <CTable hover responsive>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Order ID</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Ordered Date</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Status</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Expected Delivery Date</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {orderTrackingData.map((order) => (
                        <CTableRow key={order.orderId}>
                            <CTableDataCell style={{ textAlign: 'center' }}>{order.orderId}</CTableDataCell>
                            <CTableDataCell style={{ textAlign: 'center' }}>{order.orderedDate}</CTableDataCell>
                            <CTableDataCell style={{ textAlign: 'center' }}>
                                <CFormSelect
                                    value={order.status}
                                    style={getStatusStyle(order.status)}
                                    onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                                >
                                    <option>Order Confirmed</option>
                                    <option>Shipped</option>
                                    <option>Out for Delivery</option>
                                    <option>Delivered</option>
                                </CFormSelect>
                            </CTableDataCell>
                            <CTableDataCell style={{ textAlign: 'center' }}>{order.expectedDeliveryDate}</CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </>
    );
};

export default TrackingManagement;
