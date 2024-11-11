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
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@coreui/coreui/dist/css/coreui.min.css'
import { Dropdown } from 'react-bootstrap';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const CategoryManagement = () => {
    useEffect(() => {
        fetchData();
    }, []);

    const [visible, setVisible] = useState(false);
    const [subVisible, setSubVisible] = useState(false);
    const [categoryVisible, setCategoryVisible] = useState(false);

    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newSubcategory, setNewSubcategory] = useState('');
    const [newSubSubcategory, setNewSubSubcategory] = useState('');
    const [categoryData, setCategoryData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://44.196.192.232:5000/api/category/`);
            setCategoryData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveCategory = async () => {
        if (!newCategoryName) {
            alert("Please enter a category name.");
            return;
        }

        try {
            const response = await axios.post('http://44.196.192.232:5000/api/category/addcategory', {
                categoryName: newCategoryName,
            });

            if (response.status === 201 && response.data) {
                alert("Category added successfully!");
                // Refetch category data after a successful save to get the most up-to-date list
                fetchData();
                setCategoryVisible(false);  // Close the modal
                setNewCategoryName("");     // Clear the input field
            } else {
                alert("Failed to save the category.");
            }
        } catch (error) {
            console.error("Error saving category:", error);
            alert("An error occurred while saving the category.");
        }
    };


    const handleSaveSubCategory = async () => {
        if (!newCategory || !newSubcategory) {
            alert("Please select a category and enter a subcategory name.");
            return;
        }

        try {
            const response = await axios.post('http://44.196.192.232:5000/api/category/addsubcategory', {
                categoryName: newCategory,
                subcategoryName: newSubcategory,
            });

            if (response.status === 201 && response.data) {
                alert("Subcategory added successfully!");
                fetchData();  
                setVisible(false);  
                setNewCategory(""); 
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
            alert("Please fill in all fields before saving.");
            return;
        }

        try {
            const response = await axios.post('http://44.196.192.232:5000/api/category/addsubsubcategory', {
                categoryName: newCategory,
                subcategoryName: newSubcategory,
                subSubcategoryName: newSubSubcategory,
            });

            if (response.status === 200) {
                alert("Sub-subcategory saved successfully!");
                fetchData();
                setSubVisible(false);
                setNewCategory("");
                setNewSubcategory("");
                setNewSubSubcategory("");
            } else {
                alert("Error saving sub-subcategory.");
            }
        } catch (error) {
            console.error("Error saving sub-subcategory:", error);
            alert("An error occurred while saving the sub-subcategory.");
        }
    };

    const handleDeleteCategory = async (category) => {
        const confirmation = window.confirm(`${category.categoryName} will be deleted`);
        if (confirmation) {
            try {
                await axios.delete(`http://44.196.192.232:5000/api/category/delete-category/${category._id}`);
                fetchData();
            } catch (error) {
                console.error(error);
            }
        }
    }

    const handleDeleteSubcategory = async (categoryName, subcategory) => {
        const confirmation = window.confirm(`${subcategory.subcategoryName} will be deleted`);
        if (confirmation) {
            try {
                await axios.delete(`http://44.196.192.232:5000/api/category/delete-subcategory/${categoryName}/${subcategory._id}`);
                fetchData();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleDeleteSubSubCategory = async (categoryName, subcategoryName, subSubcategory) => {
        const confirmation = window.confirm(`${subSubcategory.subSubcategoryName} will be deleted`);
        if (confirmation) {
            try {
                await axios.delete(`http://44.196.192.232:5000/api/category/delete-subsubcategory/${categoryName}/${subcategoryName}/${subSubcategory._id}`);
                fetchData();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <>
            <CCard>
                <CCardHeader>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>Category Management</h5>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                Add New
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setCategoryVisible(!categoryVisible)}>
                                    Add New Category
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setVisible(!visible)}>
                                    Add New SubCategory
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setSubVisible(!subVisible)}>
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
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {categoryData.map((category, index) => (
                                <React.Fragment key={index}>
                                    <CTableRow>
                                        <CTableDataCell style={{ textAlign: 'center' }} rowSpan={category.subcategories?.length + 1 || 1}>
                                            {index + 1}
                                        </CTableDataCell>
                                        <CTableDataCell style={{ textAlign: 'center', fontWeight: 'bold' }} rowSpan={category.subcategories?.length + 1 || 1}>
                                            {category.categoryName}
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}
                                                onClick={() => handleDeleteCategory(category)}
                                            />
                                        </CTableDataCell>
                                    </CTableRow>

                                    {(category.subcategories || []).map((subcategory, subIndex) => (
                                        <CTableRow key={subIndex}>
                                            <CTableDataCell style={{ textAlign: 'center' }}>
                                                <span>{subcategory.subcategoryName}</span>
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}
                                                    onClick={() => handleDeleteSubcategory(category.categoryName, subcategory)}
                                                />
                                            </CTableDataCell>
                                            <CTableDataCell style={{ textAlign: 'center' }}>
                                                {
                                                    (subcategory.subSubcategories || []).map((subSubcategory, subSubIndex) => (
                                                        <div key={subSubIndex} style={{ marginLeft: '10px' }}>
                                                            <span style={{ fontSize: 'smaller' }}>{subSubcategory.subSubcategoryName}</span>
                                                            <FontAwesomeIcon
                                                                icon={faTrash}
                                                                style={{ cursor: 'pointer', color: 'red', marginLeft: '20px' }}
                                                                onClick={() => handleDeleteSubSubCategory(category.categoryName, subcategory.subcategoryName, subSubcategory)}
                                                            />
                                                        </div>
                                                    ))
                                                }
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </React.Fragment>
                            ))}

                        </CTableBody>
                    </CTable>
                </CCardBody>
            </CCard>


            {/* Add Category Modal */}
            <CModal size="md" visible={categoryVisible} onClose={() => setCategoryVisible(false)}>
                <CModalHeader>
                    <CModalTitle>Add New Category</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CRow className="mb-3">
                            <CCol>
                                <CFormLabel className="ms-2">Category Name</CFormLabel>
                                <CFormInput
                                    value={newCategoryName}
                                    placeholder="Enter category name"
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                />
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setCategoryVisible(false)}>Cancel</CButton>
                    <CButton color="primary" onClick={handleSaveCategory}>Save</CButton>
                </CModalFooter>
            </CModal>

            {/* Add Subcategory Modal */}
            <CModal size="md" visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader>
                    <CModalTitle>Add New Subcategory</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CRow className="mb-3">
                            <CCol>
                                <CFormLabel className="ms-2">Category</CFormLabel>
                                <CFormSelect value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                                    <option>Select Category</option>
                                    {categoryData.map((category, index) => (
                                        <option key={index} value={category.categoryName}>
                                            {category.categoryName}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol>
                                <CFormLabel className="ms-2">Subcategory Name</CFormLabel>
                                <CFormInput
                                    value={newSubcategory}
                                    placeholder="Enter subcategory name"
                                    onChange={(e) => setNewSubcategory(e.target.value)}
                                />
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>Cancel</CButton>
                    <CButton color="primary" onClick={handleSaveSubCategory}>Save</CButton>
                </CModalFooter>
            </CModal>

            {/* Add Sub-Subcategory Modal */}
            <CModal size="md" visible={subVisible} onClose={() => setSubVisible(false)}>
                <CModalHeader>
                    <CModalTitle>Add New Sub-Subcategory</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CRow className="mb-3">
                            <CCol>
                                <CFormLabel className="ms-2">Category</CFormLabel>
                                <CFormSelect value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                                    <option>Select Category</option>
                                    {categoryData.map((category, index) => (
                                        <option key={index} value={category.categoryName}>
                                            {category.categoryName}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol>
                                <CFormLabel className="ms-2">Subcategory</CFormLabel>
                                <CFormSelect value={newSubcategory} onChange={(e) => setNewSubcategory(e.target.value)}>
                                    <option>Select Subcategory</option>
                                    {categoryData.find((category) => category.categoryName === newCategory)?.subcategories.map((subcategory, index) => (
                                        <option key={index} value={subcategory.subcategoryName}>
                                            {subcategory.subcategoryName}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                        </CRow>
                        <CRow className="mb-3">
                            <CCol>
                                <CFormLabel className="ms-2">Sub-Subcategory Name</CFormLabel>
                                <CFormInput
                                    value={newSubSubcategory}
                                    placeholder="Enter sub-subcategory name"
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
