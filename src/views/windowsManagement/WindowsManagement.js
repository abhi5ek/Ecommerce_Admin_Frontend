import React, { useEffect, useState } from 'react'
import {
    CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
    CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
    CForm, CFormLabel, CFormSelect, CRow, CCol, CFormInput,
    CCard,
    CCardHeader,
    CCardBody,
    CFormTextarea
} from '@coreui/react'
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const WindowsManagement = () => {
    const [visible, setVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [windowsData, setWindowsData] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [subCategoryVisible, setSubCategoryVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [editFormData, setEditFormData] = useState({
        subCategory: '',
        subSubCategory: '',
        productName: '',
        description: '',
        price: '',
        images: []
    });
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
    }, [])

    const fetchCategory = async (req, res) => {
        try {
            const response = await axios.get(`http://44.196.192.232:5000/api/category/`);
            setCategory(response.data[1].subcategories);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://44.196.192.232:5000/api/windows/`);
            setWindowsData(response.data.data)
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

            const response = await axios.post('http://44.196.192.232:5000/api/windows/create', formDataToSend, {
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

    const handleViewClick = (subcategory) => {
        setSelectedSubcategory(subcategory);
        setViewModalVisible(true);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this door?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://44.196.192.232:5000/api/windows/delete/${id}`);
                fetchData();
            } catch (error) {

                console.error(error);
            }
        }
    }

    const handleEditClick = (door) => {
        setEditVisible(true);
        setEditFormData({
            id: door._id,
            productName: door.productName,
            price: door.price,
            description: door.description,
            subCategory: door.subCategory,
            subSubCategory: door.subSubCategory
        });
        setselectedDoor(door);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value, });
    }

    const handleEditFileChange = (e) => {
        const files = Array.from(e.target.files);
        setEditFormData((prev) => ({
            ...prev,
            images: files,
        }));
    };

    const handleEditSubcategory = async (e) => {
        const selectedValue = e.target.value;
        const selectedSubcategory = category.find((sub) => sub.subcategoryName === selectedValue);

        if (selectedSubcategory && Array.isArray(selectedSubcategory.subSubcategories) && selectedSubcategory.subSubcategories.length > 0) {
            setSubCategory(selectedSubcategory.subSubcategories);
            setSubCategoryVisible(true);
        } else {
            setSubCategoryVisible(false);
            setSubCategory([]);
        }
        setEditFormData({ ...editFormData, subCategory: selectedValue });
    }

    const handleEditSubmit = async (id) => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('subCategory', editFormData.subCategory);
            formDataToSend.append('productName', editFormData.productName);
            formDataToSend.append('description', editFormData.description);
            formDataToSend.append('subSubCategory', editFormData.subSubCategory);
            formDataToSend.append('price', editFormData.price);
    
            if (editFormData.images) {
                Array.from(editFormData.images).forEach(image => {
                    formDataToSend.append('images', image);
                });
            }
    
            const response = await axios.put(`http://44.196.192.232:5000/api/windows/update/${id}`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
    
            console.log(response.data);
            setEditVisible(false);
            await fetchData();
            setEditFormData({
                productName: '',
                price: '',
                description: '',
                subCategory: '',
                subSubCategory: '',
                images: [],
            });
        } catch (error) {
            console.error(error);
        }
    };
    

    return (
        <>
            <CCard>
                <CCardHeader>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>Windows Management</h5>
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
                            {windowsData.map((windows, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell style={{ textAlign: 'center' }}>{index + 1}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>
                                        {windows.images && windows.images.length > 0 ? (
                                            <img src={windows.images[0]} alt="windows" width="50" height="50" />
                                        ) : 'N/A'}
                                    </CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>{windows.productName}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>{windows.subCategory}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>{windows.subSubCategory}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>{windows.description}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>{windows.price}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>
                                        <CButton style={{ margin: '0 2px', padding: '4px' }} onClick={() => handleViewClick(windows)}>
                                            <FontAwesomeIcon style={{ color: 'blue' }} icon={faEye} />
                                        </CButton>
                                        <CButton style={{ margin: '0 2px', padding: '4px' }}>
                                            <FontAwesomeIcon style={{ color: 'green' }} onClick={() => handleEditClick(windows)} icon={faEdit} />
                                        </CButton>
                                        <CButton style={{ margin: '0 2px', padding: '4px' }} onClick={() => handleDelete(windows._id)} >
                                            <FontAwesomeIcon style={{ color: 'red' }} icon={faTrash} />
                                        </CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                </CCardBody>
            </CCard>

            {/* Add Subcategory Modal */}
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

            {/* View Subcategory Modal */}
            <CModal size='lg' visible={viewModalVisible} onClose={() => setViewModalVisible(false)}>
                <CModalHeader>
                    <CModalTitle>View Product</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {selectedSubcategory && (
                        <CRow className="align-items-center">
                            <CCol xs={12} md={6} className="mb-3 d-flex justify-content-center">
                                <img src={selectedSubcategory.images[0]} alt="subcategory" width="100%" style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }} />
                            </CCol>
                            <CCol xs={12} md={6}>
                                <div style={{ marginLeft: '10px' }}>
                                    <h5>Product Details</h5>
                                    <p><strong>Category:</strong> {selectedSubcategory.categoryName}</p>
                                    <p><strong>Product Name:</strong> {selectedSubcategory.productName}</p>
                                    <p><strong>Sub-Category:</strong> {selectedSubcategory.subCategory}</p>
                                    <p><strong>Sub-SubCategory:</strong> {selectedSubcategory.subSubCategory}</p>
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

            <CModal visible={editVisible} onClose={() => setEditVisible(false)}>
                <CModalHeader>
                    <CModalTitle>Edit Door</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CFormLabel className="mx-2">Sub Category</CFormLabel>
                        <CFormSelect onChange={handleEditSubcategory} name="subCategory" value={editFormData.subCategory}>
                            <option value="">Select Sub Category</option>
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
                                    className="mb-2"
                                    name="subSubCategory"
                                    value={editFormData.subSubCategory}
                                    onChange={handleEditChange}
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
                        <CFormInput type="text" name="productName" onChange={handleEditChange} value={editFormData.productName} />

                        <CFormLabel className="mx-2">Description</CFormLabel>
                        <CFormTextarea name="description" onChange={handleEditChange} value={editFormData.description} />

                        <CFormLabel className="mx-2">Price</CFormLabel>
                        <CFormInput type="number" name="price" onChange={handleEditChange} value={editFormData.price} />

                        <CFormLabel className="mx-2">Images</CFormLabel>
                        <CFormInput type="file" multiple onChange={handleEditFileChange} />

                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setEditVisible(false)}>
                        Cancel
                    </CButton>
                    <CButton color="primary" onClick={() => handleEditSubmit(editFormData.id)}>
                        Save Changes
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

export default WindowsManagement;
