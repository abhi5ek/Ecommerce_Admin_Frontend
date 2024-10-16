import React, { useState } from 'react'
import {
    CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
    CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
    CForm, CFormLabel, CFormSelect,
    CRow,
    CCol,
    CFormInput
} from '@coreui/react'
import image1 from '../../assets/brand/door.jpg';
import image2 from '../../assets/brand/door-imagee.jpg';
import image3 from '../../assets/brand/door-imag.png';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CategoryManagement = () => {
    const [visible, setVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);

    const doorSubcategories = [
        {
            category: 'Doors',
            subcategory: 'Front Door',
            image: image1,
            description: 'A high-quality front door with excellent insulation.',
            price: '$500'
        },
        {
            category: 'Windows',
            subcategory: 'Sliding Window',
            image: image2,
            description: 'Energy-efficient sliding window with double glazing.',
            price: '$300'
        },
        {
            category: 'Doors',
            subcategory: 'Back Door',
            image: image3,
            description: 'Durable back door with a modern design.',
            price: '$400'
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
                        {/* <CTableHeaderCell style={{ textAlign: 'center' }}>Category</CTableHeaderCell> */}
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Sub-Category</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Description</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Price</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Actions</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {doorSubcategories.map((subcategory, index) => (
                        <CTableRow key={index}>
                            <CTableDataCell style={{ textAlign: 'center' }}>{index + 1}</CTableDataCell>
                            <CTableDataCell style={{ textAlign: 'center' }}>
                                <img src={subcategory.image} alt="subcategory" width="50" />
                            </CTableDataCell>
                            {/* <CTableDataCell style={{ textAlign: 'center' }}>{subcategory.category}</CTableDataCell> */}
                            <CTableDataCell style={{ textAlign: 'center' }}>{subcategory.subcategory}</CTableDataCell>
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
                                        icon={faEdit} />
                                </CButton>
                                <CButton style={{ margin: '0 2px', padding: '4px' }}>
                                    <FontAwesomeIcon style={{ color: 'red' }}
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
                        <CRow className="align-items-center">
                            {/* <CFormLabel className="mx-2">Category</CFormLabel>
                            <CFormSelect className="mx-2" style={{ flex: 1 }}>
                                <option>Select category</option>
                                <option value="Doors">Doors</option>
                                <option value="Windows">Windows</option>
                            </CFormSelect> */}

                            <CFormLabel className="mx-2">Sub-Category</CFormLabel>
                            <CFormSelect className="mx-2" style={{ flex: 1 }}>
                                <option value="">Select sub-category</option>
                                <option value="Front Door">Front Door</option>
                                <option value="Back Door">Back Door</option>
                                <option value="Patio Door">Patio Door</option>
                                <option value="Sliding Window">Sliding Window</option>
                                <option value="Casement Window">Casement Window</option>
                                <option value="Bay Window">Bay Window</option>
                            </CFormSelect>

                            <CFormLabel className="mx-2">Description</CFormLabel>
                            <CFormInput className="mx-2" placeholder="Enter description" style={{ flex: 2 }} />

                            <CFormLabel className="mx-2">Price</CFormLabel>
                            <CFormInput className="mx-2" placeholder="Enter price" type="number" style={{ flex: 1 }} />

                            <CFormLabel className="mx-2">Upload Image</CFormLabel>
                            <CFormInput className="mx-2" type="file" style={{ flex: 2 }} />
                        </CRow>

                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>Cancel</CButton>
                    <CButton color="primary" onClick={() => setVisible(false)}>Save</CButton>
                </CModalFooter>
            </CModal>

            {/* View Subcategory Modal */}
            <CModal size='lg' visible={viewModalVisible} onClose={() => setViewModalVisible(false)}>
                <CModalHeader>
                    <CModalTitle>View Product</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {selectedSubcategory && (
                        <CRow>
                            <CCol xs={6} className="d-flex align-items-center">
                                <img src={selectedSubcategory.image} alt="subcategory" width="100%" style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }} />
                            </CCol>
                            <CCol xs={6}>
                                <div style={{ marginLeft: '10px' }}>
                                    <h5>Product Details</h5>
                                    <p><strong>Category:</strong> {selectedSubcategory.category}</p>
                                    <p><strong>Sub-Category:</strong> {selectedSubcategory.subcategory}</p>
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

export default CategoryManagement;
