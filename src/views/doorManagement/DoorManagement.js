import React, { useEffect, useState } from 'react';
import {
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CForm,
    CFormLabel,
    CFormSelect,
    CRow,
    CCol,
    CFormInput,
    CCard,
    CCardHeader,
    CCardBody,
} from '@coreui/react';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const DoorManagement = () => {
    const [doorData, setDoorData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [selecteddoor, setSelecteddoor] = useState(null);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [subCategoryVisible, setSubCategoryVisible] = useState(false);
    const [formData, setFormData] = useState({
        subCategory: '',
        subSubCategory: '',
        productName: '',
        description: '',
        price: '',
        images: []
    });

    useEffect(() => {
        fetchData();
        fetchCategory();
    }, []);

    const fetchCategory = async (req, res) => {
        try {
            const response = await axios.get(`http://44.196.192.232:5000/api/category/`);
            setCategory(response.data[0].subcategories);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchData = async (req, res) => {
        try {
            const response = await axios.get(`http://44.196.192.232:5000/api/doors/`)
            setDoorData(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, images: e.target.files });
        console.log(formData);
    };
    const handleSubcategory = (e) => {
        const selectedValue = e.target.value;
        const selectedSubcategory = category.find((sub) => sub.subcategoryName === selectedValue);

        if (selectedSubcategory && Array.isArray(selectedSubcategory.subSubcategories) && selectedSubcategory.subSubcategories.length > 0) {
            setSubCategory(selectedSubcategory.subSubcategories);
            setSubCategoryVisible(true);
            console.log(selectedSubcategory.subSubcategories);
        } else {
            setSubCategoryVisible(false);
            setSubCategory([]);
        }
        setFormData({ ...formData, subCategory: selectedValue });
    };



    const handleSubmit = async () => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('subCategory', formData.subCategory);
            formDataToSend.append('productName', formData.productName);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('subSubCategory', formData.subSubCategory);
            formDataToSend.append('price', formData.price);

            for (let i = 0; i < formData.images.length; i++) {
                formDataToSend.append('images', formData.images[i]);
            }

            const response = await axios.post('http://44.196.192.232:5000/api/doors/add-doors', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchData();
            console.log(response);
            setVisible(false);
            setSubCategoryVisible(false);
            setFormData({
                subCategory: '',
                subSubCategory: '',
                productName: '',
                description: '',
                price: '',
                images: []
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this door?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://44.196.192.232:5000/api/doors/delete-doors/${id}`)
                fetchData();
            } catch (error) {
                console.error(error);
            }
        } else {
            alert("Deletion canceled.");
        }
    }

    const handleViewClick = (door) => {
        setSelecteddoor(door);
        setViewModalVisible(true);
    };


    return (
        <>
            <CCard>
                <CCardHeader>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>Door Management</h5>
                        <CButton color="primary" onClick={() => setVisible(!visible)}>
                            Add New
                        </CButton>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <CTable striped bordered hover responsive>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Index</CTableHeaderCell>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Image</CTableHeaderCell>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Product Name</CTableHeaderCell>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Sub-Category</CTableHeaderCell>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Sub-SubCategory</CTableHeaderCell>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Description</CTableHeaderCell>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Price</CTableHeaderCell>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Actions</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {doorData.map((door, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell style={{ textAlign: 'center' }}>{index + 1}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>
                                        {door.images && door.images.length > 0 ? (
                                            <img src={door.images[0]} alt="door" width="50" height="50" />
                                        ) : 'N/A'}
                                    </CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>
                                        {door.productName || 'N/A'}
                                    </CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>
                                        {door.subCategory || 'N/A'}
                                    </CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>
                                        {door.subSubCategory || 'N/A'}
                                    </CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>
                                        {door.description || 'N/A'}
                                    </CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>
                                        {door.price ? `$${door.price}` : 'N/A'}
                                    </CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>
                                        <CButton style={{ margin: '0 2px', padding: '4px' }}>
                                            <FontAwesomeIcon style={{ color: 'blue' }} onClick={() => handleViewClick(door)} icon={faEye} />
                                        </CButton>
                                        <CButton style={{ margin: '0 2px', padding: '4px' }}>
                                            <FontAwesomeIcon style={{ color: 'green' }} icon={faEdit} />
                                        </CButton>
                                        <CButton style={{ margin: '0 2px', padding: '4px' }}>
                                            <FontAwesomeIcon style={{ color: 'red' }} onClick={() => handleDelete(door._id)} icon={faTrash} />
                                        </CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>

                    </CTable>
                </CCardBody>
            </CCard>


            <CModal size='md' visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader>
                    <CModalTitle>Add New Product</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CRow className="align-items-center">
                            <CFormLabel className="mx-2">Sub-Category</CFormLabel>
                            <CFormSelect className="mx-2 mb-2" name="subCategory"
                                value={formData.subCategory}
                                onChange={handleSubcategory} style={{ flex: 1 }}>
                                <option value="">Select sub-category</option>
                                {category.map((sub, index) => (
                                    <option key={index} value={sub.subcategoryName}>
                                        {sub.subcategoryName}
                                    </option>
                                ))}
                            </CFormSelect>

                            {subCategoryVisible && (
                                <>
                                    <CFormLabel className="mx-2">Sub-SubCategory</CFormLabel>
                                    <CFormSelect
                                        className="mx-2 mb-2"
                                        name="subSubCategory"
                                        value={formData.subSubCategory}
                                        onChange={handleChange}
                                        style={{ flex: 1 }}
                                    >
                                        <option value="">Select sub-subcategory</option>
                                        {subCategory.map((subSub, index) => (
                                            <option key={subSub._id} value={subSub.subSubcategoryName}>
                                                {subSub.subSubcategoryName}
                                            </option>
                                        ))}
                                    </CFormSelect>
                                </>
                            )}

                            <CFormLabel className="mx-2">Product Name</CFormLabel>
                            <CFormInput className="mx-2 mb-2" name="productName"
                                value={formData.productName}
                                onChange={handleChange}
                                placeholder="Enter product name" style={{ flex: 1 }} />

                            <CFormLabel className="mx-2">Description</CFormLabel>
                            <CFormInput className="mx-2 mb-2" name="description"
                                value={formData.description}
                                placeholder="Enter description"
                                onChange={handleChange} style={{ flex: 2 }} />

                            <CFormLabel className="mx-2">Price</CFormLabel>
                            <CFormInput className="mx-2 mb-2" name="price"
                                value={formData.price}
                                placeholder="Enter price"
                                onChange={handleChange} type="number" style={{ flex: 1 }} />

                            <CFormLabel className="mx-2">Upload Images</CFormLabel>
                            <CFormInput
                                className="mx-2 mb-2"
                                type="file"
                                name="images"
                                multiple
                                onChange={handleFileChange}
                            />
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>Cancel</CButton>
                    <CButton color="primary" onClick={handleSubmit}>Save</CButton>
                </CModalFooter>
            </CModal>


            <CModal size='lg' visible={viewModalVisible} onClose={() => setViewModalVisible(false)}>
                <CModalHeader>
                    <CModalTitle>View Product</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {selecteddoor && (
                        <CRow className="align-items-center">
                            <CCol xs={12} md={6} className="mb-3 d-flex justify-content-center">
                                {selecteddoor.images && selecteddoor.images.length > 0 ? (
                                    <img src={selecteddoor.images[0]} alt="door" width="100%" height="400" style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }} />
                                ) : (
                                    <div>No Image Available</div>
                                )}
                            </CCol>
                            <CCol xs={12} md={6}>
                                <div style={{ marginLeft: '10px' }}>
                                    <h5>Product Details</h5>
                                    <p><strong>Product Name:</strong> {selecteddoor.productName || 'N/A'}</p>
                                    <p><strong>Category:</strong> {selecteddoor.categoryName || 'N/A'}</p>
                                    <p><strong>Sub-Category:</strong> {selecteddoor.subCategory || 'N/A'}</p>
                                    <p><strong>Sub-SubCategory:</strong> {selecteddoor.subSubCategory || 'N/A'}</p>
                                    <p><strong>Description:</strong> {selecteddoor.description || 'N/A'}</p>
                                    <p><strong>Price:</strong> {selecteddoor.price ? `$${selecteddoor.price}` : 'N/A'}</p>
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
    );
};

export default DoorManagement;
