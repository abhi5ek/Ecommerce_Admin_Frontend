import React, { useEffect, useState } from 'react';
import {
    CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
    CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
    CForm, CFormLabel, CFormSelect,
    CRow,
    CCol,
    CFormInput,
    CCard,
    CCardBody,
    CCardHeader,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@coreui/coreui/dist/css/coreui.min.css'
import { Dropdown } from 'react-bootstrap';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const CategoryManagement = () => {

    useEffect(() => {
        fetchData();
    });

    const [visible, setVisible] = useState(false);
    const [subVisible, setSubVisible] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [newSubcategory, setNewSubcategory] = useState('');
    const [newSubSubcategory, setNewSubSubcategory] = useState('');
    const [categoryData, setCategoryData] = useState([]);

    const fetchData = async (req, res) => {
        try {
            const response = await axios.get(`http://44.196.192.232:5000/api/category/`);
            setCategoryData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = async () => {
        // Basic validation to ensure a category and subcategory are selected
        if (!newCategory || !newSubcategory) {
            alert("Please select a category and enter a subcategory name.");
            return;
        }

        try {
            // Making a POST request to the backend to create a new subcategory
            const response = await axios.post('http://44.196.192.232:5000/api/category/addsubcategory', {
                categoryName: newCategory,
                subcategoryName: newSubcategory
            });

            if (response.status === 201) {
                // Successfully saved, update the UI with the new category
                alert("Subcategory added successfully!");
                setCategoryData([...categoryData, response.data]); // Add the new data to your state
                setVisible(false); // Close the modal
                setNewCategory(""); // Clear inputs
                setNewSubcategory("");
            } else {
                alert("Failed to save the subcategory.");
            }
        } catch (error) {
            console.error("Error saving subcategory:", error);
            alert("An error occurred while saving the subcategory.");
        }
    };

    const handleSaveSubSubCategory = async () => {
        if (!newCategory || !newSubcategory || !newSubSubcategory) {
            alert('Please fill in all fields before saving');
            return;
        }

        try {
            // Make an API call to save the new sub-subcategory
            const response = await axios.post('http://44.196.192.232:5000/api/category/addsubsubcategory', {
                categoryName: newCategory,
                subcategoryName: newSubcategory,
                subSubcategoryName: newSubSubcategory,
            });

            if (response.status === 200) {  // Expect status 200 instead of 201
                alert('Sub-subcategory saved successfully!');
                setSubVisible(false); // Close the modal after saving
                setNewCategory(""); // Clear inputs
                setNewSubcategory("");
                setNewSubSubcategory(''); // Clear the sub-subcategory input field
                // Optionally, refresh the category data if needed
            } else {
                alert('Error saving sub-subcategory');
            }
        } catch (error) {
            console.error('Error saving sub-subcategory:', error);
            alert('An error occurred while saving the sub-subcategory');
        }
    };



    return (
        <>
            <CCard>
                <CCardHeader>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>Door Management</h5>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                Add New
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setVisible(!visible)}>
                                    Add New SubCategory
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setSubVisible(!visible)}>
                                    Add New Sub SubCategory
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <CTable bordered hover responsive>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Index</CTableHeaderCell>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Category</CTableHeaderCell>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Sub-Categories</CTableHeaderCell>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Sub-Subcategories</CTableHeaderCell>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Actions</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {categoryData.map((category, index) => (
                                <React.Fragment key={index}>
                                    <CTableRow>
                                        <CTableDataCell style={{ textAlign: 'center' }} rowSpan={category.subcategories.length + 1}>
                                            {index + 1}
                                        </CTableDataCell>
                                        <CTableDataCell style={{ textAlign: 'center', fontWeight: 'bold' }} rowSpan={category.subcategories.length + 1}>
                                            {category.categoryName}
                                        </CTableDataCell>
                                    </CTableRow>

                                    {category.subcategories.map((subcategory, subIndex) => (
                                        <CTableRow key={subIndex}>
                                            <CTableDataCell style={{ textAlign: 'center' }}>
                                                <span>{subcategory.subcategoryName}</span>
                                            </CTableDataCell>
                                            <CTableDataCell style={{ textAlign: 'center' }}>
                                                {
                                                    subcategory.subSubcategories.map((subSubcategory, subSubIndex) => (
                                                        <div key={subSubIndex} style={{ marginLeft: '20px' }}>
                                                            <span style={{ fontSize: 'smaller' }}>{subSubcategory.subSubcategoryName}</span>
                                                        </div>
                                                    ))
                                                }
                                            </CTableDataCell>
                                            <CTableDataCell style={{ textAlign: 'center' }}>
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    style={{ cursor: 'pointer', color: 'red' }}
                                                    onClick={() => handleDelete(category, subcategory)}
                                                />
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </React.Fragment>
                            ))}
                        </CTableBody>
                    </CTable>
                </CCardBody>
            </CCard>



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

            <CModal size='md' visible={subVisible} onClose={() => setSubVisible(false)}>
                <CModalHeader>
                    <CModalTitle>Add New Subcategory</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CRow className="mb-3">
                            <CCol>
                                <CFormLabel className="ms-2">Category</CFormLabel>
                                <CFormSelect
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)} // Handle category selection
                                >
                                    <option value="">Select category</option>
                                    <option value="Doors">Doors</option>
                                    <option value="Windows">Windows</option>
                                </CFormSelect>
                            </CCol>
                        </CRow>

                        <CRow className="mb-3">
                            <CCol>
                                <CFormLabel className="ms-2">Sub-Category</CFormLabel>
                                <CFormSelect
                                    value={newSubcategory}
                                    onChange={(e) => setNewSubcategory(e.target.value)} // Handle subcategory selection
                                >
                                    <option value="">Select subcategory</option>
                                    {/* Filter subcategories based on the selected category */}
                                    {categoryData
                                        .filter((category) => category.categoryName === newCategory) // Match the selected category
                                        .flatMap((category) => category.subcategories) // Get the subcategories
                                        .map((subcategory, index) => (
                                            <option key={index} value={subcategory.subcategoryName}>
                                                {subcategory.subcategoryName}
                                            </option>
                                        ))}
                                </CFormSelect>
                            </CCol>
                        </CRow>
                        <CRow className='mb-3'>
                            <CCol>
                                <CFormLabel className='ms-2'>Sub-SubCategory</CFormLabel>
                                <CFormInput
                                    value={newSubSubcategory}
                                    placeholder="Enter sub-category"
                                    onChange={(e) => setNewSubSubcategory(e.target.value)}
                                />
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setSubVisible(false)}>Cancel</CButton>
                    <CButton color="primary" onClick={handleSaveSubSubCategory}>Save</CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

export default CategoryManagement;
