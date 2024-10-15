import React, { useState } from 'react'
import {
    CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
    CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
    CForm, CFormLabel, CFormSelect,
    CRow,
    CCol,
    CFormInput
} from '@coreui/react'
import image1 from '../../assets/brand/hardware1.jpg';
import image2 from '../../assets/brand/hardware2.jpg';
import image3 from '../../assets/brand/hardware3.jpg';
import image4 from '../../assets/brand/hardware4.jpg';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HardwareManagement = () => {
    const [visible, setVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);



    const doorSubcategories = [
        {
            image: image1,
            productName: "Heavy-Duty Hammer",
            description: "A durable hammer for heavy tasks.",
            price: "$16.99"
        },
        {
            image: image2,
            productName: "Precision Screwdriver Set",
            description: "A set of 3 precision screwdrivers for detailed work.",
            price: "$22.49"
        },
        {
            image: image3,
            productName: "Multi-Size Wrench",
            description: "A versatile wrench for various nut sizes.",
            price: "$25.00"
        }
    ];
    
    const handleViewClick = (subcategory) => {
        setSelectedSubcategory(subcategory);
        setViewModalVisible(true);
    };

    return (
        <>
            <div className="d-flex justify-content-end" style={{ margin: '10px 0' }}>
                <CButton
                    color="primary"
                    onClick={() => setVisible(!visible)}
                >
                    Add New
                </CButton>
            </div>

            {/* Table */}
            <CTable hover responsive>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Index</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Image</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Name</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Discription</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Price</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Actions</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {doorSubcategories.map((subcategory, index) => (
                        <CTableRow key={index}>
                            <CTableDataCell style={{ textAlign: 'center' }}>{index + 1}</CTableDataCell>
                            <CTableDataCell style={{ textAlign: 'center' }}>
                                <img src={subcategory.image} alt="subcategory" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                            </CTableDataCell>
                            <CTableDataCell style={{ textAlign: 'center' }}>{subcategory.productName}</CTableDataCell>
                            <CTableDataCell style={{ textAlign: 'center' }}>{subcategory.description}</CTableDataCell>
                            <CTableDataCell style={{ textAlign: 'center' }}>{subcategory.price}</CTableDataCell>
                            <CTableDataCell style={{ textAlign: 'center' }}>
                                <CButton style={{ margin: '0 2px', padding: '4px' }}>
                                    <FontAwesomeIcon style={{ color: 'blue' }}
                                        onClick={() => handleViewClick(subcategory)}
                                        icon={faEye} />
                                </CButton>
                                <CButton style={{ margin: '0 2px', padding: '4px' }}>
                                    <FontAwesomeIcon style={{ color: 'green' }}
                                        onClick={() => handleEditClick()}
                                        icon={faEdit} />
                                </CButton>
                                <CButton style={{ margin: '0 2px', padding: '4px' }}>
                                    <FontAwesomeIcon style={{ color: 'red' }}
                                        onClick={() => handleDelete()}
                                        icon={faTrash} />
                                </CButton>
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>

            {/* Add Subcategory Modal */}
            <CModal size='md' visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader>
                    <CModalTitle>Add New Product</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CRow>
                            <CCol xs={12}>
                                <CFormLabel htmlFor="name">Name</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="name"
                                    placeholder="Enter product name"
                                />
                            </CCol>

                            <CCol xs={12}>
                                <CFormLabel htmlFor="description">Description</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="description"
                                    placeholder="Enter product description"
                                />
                            </CCol>

                            <CCol xs={12}>
                                <CFormLabel htmlFor="price">Price</CFormLabel>
                                <CFormInput
                                    type="number"
                                    id="price"
                                    placeholder="Enter product price"
                                />
                            </CCol>

                            <CCol xs={12}>
                                <CFormLabel htmlFor="image">Image</CFormLabel>
                                <CFormInput
                                    type="file"
                                    id="image"
                                />
                            </CCol>
                        </CRow>

                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Cancel
                    </CButton>
                    <CButton color="primary" onClick={() => setVisible(false)}>
                        Save
                    </CButton>
                </CModalFooter>
            </CModal>

            <CModal size='lg' visible={viewModalVisible} onClose={() => setViewModalVisible(false)}>
                <CModalHeader>
                    <CModalTitle>View Product</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {selectedSubcategory && (
                        <CRow>
                            <CCol xs={6} className="d-flex align-items-center">
                                <img
                                    src={selectedSubcategory.image}
                                    alt={selectedSubcategory.productName}
                                    style={{
                                        width: '350px',
                                        height: '400px',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                                        objectFit: 'cover' // This will maintain the aspect ratio and fill the given dimensions
                                    }}
                                />

                            </CCol>

                            <CCol xs={6}>
                                <div style={{ marginLeft: '10px' }}>
                                    <h5 style={{ textAlign: 'center', marginBottom: '30px' }}>Product Details</h5>
                                    <p><strong>Product Name:</strong> {selectedSubcategory.productName}</p>
                                    <p><strong>Description:</strong> {selectedSubcategory.description}</p>
                                    <p><strong>Price:</strong> {selectedSubcategory.price}</p>
                                </div>
                            </CCol>
                        </CRow>
                    )}


                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setViewModalVisible(false)}>Close</CButton>
                </CModalFooter>
            </CModal>


        </>
    )
}

export default HardwareManagement;


