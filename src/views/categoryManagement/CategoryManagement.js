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
                alert("Subcategory added successfully!");
                setCategoryData([...categoryData, response.data]);
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
            alert('Please fill in all fields before saving');
            return;
        }

        try {
            const response = await axios.post('http://44.196.192.232:5000/api/category/addsubsubcategory', {
                categoryName: newCategory,
                subcategoryName: newSubcategory,
                subSubcategoryName: newSubSubcategory,
            });

            if (response.status === 200) {
                alert('Sub-subcategory saved successfully!');
                setSubVisible(false);
                setNewCategory("");
                setNewSubcategory("");
                setNewSubSubcategory('');
            } else {
                alert('Error saving sub-subcategory');
            }
        } catch (error) {
            console.error('Error saving sub-subcategory:', error);
            alert('An error occurred while saving the sub-subcategory');
        }
    };

    const handleDeleteSubcategory = async (categoryName, subcategory) => {
        const confirmation = window.confirm(`${subcategory.subcategoryName} will be deleted`);
        if(confirmation){
            try{
                await axios.delete(`http://44.196.192.232:5000/api/category/delete-subcategory/${categoryName}/${subcategory._id}`);
            }catch(error){
                console.error(error);
            }
        }
    }

    const handleDeleteSubSubCategory = async (categoryName, subcategoryName, subSubcategory) => {
        const confirmation = window.confirm(`${subSubcategory.subSubcategoryName} will be deleted`);
        if(confirmation){
            try{
                await axios.delete(`http://44.196.192.232:5000/api/category/delete-subsubcategory/${categoryName}/${subcategoryName}/${subSubcategory._id}`)
            }catch(error){
                console.error(error);
            }
        }
    }

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
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}
                                                    onClick={() => handleDeleteSubcategory(category.categoryName, subcategory)}
                                                />
                                            </CTableDataCell>
                                            <CTableDataCell style={{ textAlign: 'center' }}>
                                                {
                                                    subcategory.subSubcategories.map((subSubcategory, subSubIndex) => (
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
                                    onChange={(e) => setNewCategory(e.target.value)}
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
                                    onChange={(e) => setNewSubcategory(e.target.value)}
                                >
                                    <option value="">Select subcategory</option>
                                    {categoryData
                                        .filter((category) => category.categoryName === newCategory)
                                        .flatMap((category) => category.subcategories)
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
