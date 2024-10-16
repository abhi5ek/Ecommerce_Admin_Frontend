import React, { useState } from 'react';
import {
    CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
    CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
    CForm, CFormLabel, CFormSelect,
    CRow,
    CCol,
    CFormInput
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; // Import trash icon from FontAwesome

const CategoryManagement = () => {
    const [visible, setVisible] = useState(false);
    const [doorSubcategories, setDoorSubcategories] = useState([
        { category: 'Doors', subcategory: 'Front Door' },
        { category: 'Doors', subcategory: 'Back Door' },
        { category: 'Doors', subcategory: 'Patio Door' },
        { category: 'Windows', subcategory: 'Sliding Window' },
        { category: 'Windows', subcategory: 'Casement Window' },
        { category: 'Windows', subcategory: 'Bay Window' },
    ]);

    const [newCategory, setNewCategory] = useState('');
    const [newSubcategory, setNewSubcategory] = useState('');

    const handleDelete = (category, subcategory) => {
        const updatedSubcategories = doorSubcategories.filter(
            item => !(item.category === category && item.subcategory === subcategory)
        );
        setDoorSubcategories(updatedSubcategories);
    };

    const handleSave = () => {
        if (newCategory && newSubcategory) {
            const newEntry = { category: newCategory, subcategory: newSubcategory };
            setDoorSubcategories([...doorSubcategories, newEntry]);
            setVisible(false);
            setNewCategory('');
            setNewSubcategory('');
        }
    };

    // Group subcategories by category
    const groupedSubcategories = doorSubcategories.reduce((acc, item) => {
        const { category, subcategory } = item;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(subcategory);
        return acc;
    }, {});

    return (
        <>
            <div className="d-flex justify-content-end" style={{ margin: '10px 0' }}>
                <CButton
                    color="primary"
                    onClick={() => setVisible(true)}
                >
                    Add New
                </CButton>
            </div>

            {/* Table */}
            <CTable hover responsive>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Index</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Category</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: 'center' }}>Sub-Categories</CTableHeaderCell>
                        {/* <CTableHeaderCell style={{ textAlign: 'center' }}>Actions</CTableHeaderCell> New Action column */}
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {Object.keys(groupedSubcategories).map((category, index) => (
                        <CTableRow key={index}>
                            <CTableDataCell style={{ textAlign: 'center' }}>
                                {index + 1}
                            </CTableDataCell>
                            <CTableDataCell style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                {category}
                            </CTableDataCell>
                            <CTableDataCell style={{ textAlign: 'center' }}>
                                {groupedSubcategories[category].map((subcategory, subIndex) => (
                                    <div key={subIndex} style={{ marginBottom: '5px', textAlign: 'center' }}>
                                        <span>{subcategory}</span>
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }} // Space between text and icon
                                            onClick={() => handleDelete(category, subcategory)}
                                        />
                                    </div>
                                ))}
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>

            {/* Add Subcategory Modal */}
            <CModal size='md' visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader>
                    <CModalTitle>Add New Subcategory</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CRow className='mb-3'>
                            <CCol>
                                <CFormLabel className='ms-2'>Category</CFormLabel>
                                <CFormSelect value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                                    <option value="">Select category</option>
                                    <option value="Doors">Doors</option>
                                    <option value="Windows">Windows</option>
                                </CFormSelect>
                            </CCol>
                        </CRow>
                        <CRow className='mb-3'>
                            <CCol>
                                <CFormLabel className='ms-2'>Sub-Category</CFormLabel>
                                <CFormInput
                                    value={newSubcategory}
                                    placeholder="Enter sub-category"
                                    onChange={(e) => setNewSubcategory(e.target.value)}
                                />
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>Cancel</CButton>
                    <CButton color="primary" onClick={handleSave}>Save</CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

export default CategoryManagement;
