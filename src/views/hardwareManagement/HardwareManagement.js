import React, { useEffect, useState } from 'react';
import {
    CCard, CCardHeader, CCardBody,
    CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
    CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
    CForm, CFormLabel, CFormSelect,
    CRow,
    CCol,
    CFormInput
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const HardwareManagement = () => {
    const [visible, setVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [hardwareDetails, setHardwareDetails] = useState([]);
    const [hardwareProduct, setHardwareProduct] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [selectedSubSubcategory, setSelectedSubSubcategory] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formData, setFormData] = useState({
        categoryName: 'hardware',
        subCategory: '',
        subSubCategory: '',
        description: '',
        productName: '',
        price: '',
        images: []
    });

    useEffect(() => {
        fetchData();
        fetchCategory();
    }, []);

    const fetchData = async () => {
        const response = await axios.get(`http://44.196.192.232:5000/api/hardware/`);
        setHardwareDetails(response.data.data);
    };

    const fetchCategory = async () => {
        const response = await axios.get(`http://44.196.192.232:5000/api/category/`);
        const allSubcategory = response.data.data.filter((category) => category.categoryName === 'hardware');
        setSubCategory(allSubcategory[0].subcategories);
    };

    const handleViewClick = async (id) => {
        try {
            const response = await axios.get(`http://44.196.192.232:5000/api/hardware/getbyid/${id}`);
            setHardwareProduct(response.data.data);
        } catch (error) {
            console.error(error.message);
        }
        setViewModalVisible(true);
    };

    // Create Hardware
    const handleSubcategoryChange = (e) => {
        const selectedId = e.target.value;
        const subcategory = subCategory.find((sub) => sub._id === selectedId);
        setFormData({ ...formData, subCategory: subcategory.subcategoryName });
        setSelectedSubSubcategory(subcategory.subSubcategories || []);
    };

    const handleSubSubCategoryChange = (e) => {
        const selectedId = e.target.value;
        const subsubCategory = selectedSubSubcategory.find((subsub) => subsub._id === selectedId);
        setFormData({ ...formData, subSubCategory: subsubCategory.subSubcategoryName });
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        setFormData({ ...formData, images: Array.from(files) });
    };

    const handleSubmit = async () => {
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === 'images') {
                formData.images.forEach((image) => data.append('images', image));
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
            const response = await axios.post("http://44.196.192.232:5000/api/hardware/create", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            await fetchData();
            alert("Product added successfully!");
            setVisible(false);
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to add product.");
        }
    };

    // Delete Hardware
    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");
        if (isConfirmed) {
            try {
                await axios.delete(`http://44.196.192.232:5000/api/hardware/delete/${id}`);
                alert("Product deleted successfully!");
                await fetchData();
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Failed to delete product.");
            }
        }
    };

    // Update Hardware
    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setFormData({
            categoryName: product.productDetails.categoryName,
            subCategory: product.productDetails.subCategory,
            subSubCategory: product.productDetails.subSubCategory,
            description: product.productDetails.description,
            productName: product.productDetails.productName,
            price: product.productDetails.price,
            images: [],
        });
        setUpdateModalVisible(true);
    };

    const handleUpdate = async () => {
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === 'images') {
                formData.images.forEach((image) => data.append('images', image));
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
            await axios.put(`http://44.196.192.232:5000/api/hardware/update/${selectedProduct._id}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Product updated successfully!");
            await fetchData();
            setUpdateModalVisible(false);
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Failed to update product.");
        }
    };


    return (
        <>

            {/* Card for Table */}
            <CCard>
                <CCardHeader>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>Hardware Management</h5>
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
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Name</CTableHeaderCell>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Description</CTableHeaderCell>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Price</CTableHeaderCell>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Actions</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {hardwareDetails.map((data, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell style={{ textAlign: 'center' }}>{index + 1}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>
                                        <img src={data.productDetails.images[0]} alt="subcategory" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                    </CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>{data.productDetails.productName}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>{data.productDetails.description}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>${data.productDetails.price}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>
                                        <CButton style={{ margin: '0 2px', padding: '4px' }} onClick={() => handleViewClick(data._id)}>
                                            <FontAwesomeIcon style={{ color: 'blue' }} icon={faEye} />
                                        </CButton>
                                        <CButton style={{ margin: '0 2px', padding: '4px' }} onClick={() => handleEditClick(data)}>
                                            <FontAwesomeIcon style={{ color: 'green' }} icon={faEdit} />
                                        </CButton>
                                        <CButton style={{ margin: '0 2px', padding: '4px' }} onClick={() => handleDelete(data._id)}>
                                            <FontAwesomeIcon style={{ color: 'red' }} icon={faTrash} />
                                        </CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                </CCardBody>
            </CCard>


            <CModal size="md" visible={updateModalVisible} onClose={() => setUpdateModalVisible(false)}>
                <CModalHeader>
                    <CModalTitle>Update Product</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CRow className="mb-2">
                            <CCol className='mb-2' xs={12}>
                                <CFormLabel className='ms-2' htmlFor="subCategory">Sub-Category</CFormLabel>
                                <CFormSelect
                                    id="subCategory"
                                    aria-label="Select a product sub-category"
                                    onChange={handleSubcategoryChange}
                                >
                                    <option value="">Select a product Sub-Category</option>
                                    {subCategory.map((subcategory) => (
                                        <option key={subcategory._id} value={subcategory._id}>
                                            {subcategory.subcategoryName}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </CCol>

                            {selectedSubSubcategory.length > 0 && (
                                <CCol className="mb-2" xs={12}>
                                    <CFormLabel className="ms-2" htmlFor="subSubCategory">
                                        Sub-Subcategory
                                    </CFormLabel>
                                    <CFormSelect
                                        id="subSubCategory"
                                        aria-label="Select a Sub-Subcategory"
                                        onChange={handleSubSubCategoryChange}
                                    >
                                        <option value="">Select a Sub-Subcategory</option>
                                        {selectedSubSubcategory.map((subSubcategory) => (
                                            <option key={subSubcategory._id} value={subSubcategory._id}>
                                                {subSubcategory.subSubcategoryName}
                                            </option>
                                        ))}
                                    </CFormSelect>
                                </CCol>
                            )}
                        </CRow>
                        <CRow className="mb-2">
                            <CCol md={12}>
                                <CFormLabel htmlFor="productName">Product Name</CFormLabel>
                                <CFormInput
                                    id="productName"
                                    type="text"
                                    placeholder="Enter product name"
                                    value={formData.productName}
                                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-2">
                            <CCol md={12}>
                                <CFormLabel htmlFor="price">Price</CFormLabel>
                                <CFormInput
                                    id="price"
                                    type="number"
                                    placeholder="Enter price"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-2">
                            <CCol md={12}>
                                <CFormLabel htmlFor="description">Description</CFormLabel>
                                <CFormInput
                                    id="description"
                                    type="text"
                                    placeholder="Enter product description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </CCol>
                        </CRow>
                        <CRow className="mb-2">
                            <CCol md={12}>
                                <CFormLabel htmlFor="images">Images</CFormLabel>
                                <CFormInput
                                    id="images"
                                    type="file"
                                    multiple
                                    onChange={handleImageChange}
                                />
                            </CCol>
                        </CRow>

                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setUpdateModalVisible(false)}>Cancel</CButton>
                    <CButton color="primary" onClick={handleUpdate}>Update</CButton>
                </CModalFooter>
            </CModal>


            <CModal size='md' visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader>
                    <CModalTitle>Add New Product</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CRow>
                            <CCol className='mb-2' xs={12}>
                                <CFormLabel className='ms-2' htmlFor="subCategory">Sub-Category</CFormLabel>
                                <CFormSelect
                                    id="subCategory"
                                    aria-label="Select a product sub-category"
                                    onChange={handleSubcategoryChange}
                                >
                                    <option value="">Select a product Sub-Category</option>
                                    {subCategory.map((subcategory) => (
                                        <option key={subcategory._id} value={subcategory._id}>
                                            {subcategory.subcategoryName}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </CCol>

                            {selectedSubSubcategory.length > 0 && (
                                <CCol className="mb-2" xs={12}>
                                    <CFormLabel className="ms-2" htmlFor="subSubCategory">
                                        Sub-Subcategory
                                    </CFormLabel>
                                    <CFormSelect
                                        id="subSubCategory"
                                        aria-label="Select a Sub-Subcategory"
                                        onChange={handleSubSubCategoryChange}
                                    >
                                        <option value="">Select a Sub-Subcategory</option>
                                        {selectedSubSubcategory.map((subSubcategory) => (
                                            <option key={subSubcategory._id} value={subSubcategory._id}>
                                                {subSubcategory.subSubcategoryName}
                                            </option>
                                        ))}
                                    </CFormSelect>
                                </CCol>
                            )}

                            <CCol className='mb-2' xs={12}>
                                <CFormLabel className='ms-2' htmlFor="productName">Name</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="productName"
                                    placeholder="Enter product name"
                                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                />
                            </CCol>

                            <CCol className='mb-2' xs={12}>
                                <CFormLabel className='ms-2' htmlFor="description">Description</CFormLabel>
                                <CFormInput
                                    type="text"
                                    id="description"
                                    placeholder="Enter product description"
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </CCol>

                            <CCol className='mb-2' xs={12}>
                                <CFormLabel className='ms-2' htmlFor="price">Price</CFormLabel>
                                <CFormInput
                                    type="number"
                                    id="price"
                                    placeholder="Enter product price"
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </CCol>

                            <CCol className='mb-2' xs={12}>
                                <CFormLabel className='ms-2' htmlFor="images">Images</CFormLabel>
                                <CFormInput
                                    type="file"
                                    id="images"
                                    multiple
                                    onChange={handleImageChange}
                                />
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Cancel
                    </CButton>
                    <CButton color="primary" onClick={handleSubmit}>
                        Save
                    </CButton>
                </CModalFooter>
            </CModal>


            <CModal size='lg' visible={viewModalVisible} onClose={() => setViewModalVisible(false)}>
                <CModalHeader>
                    <CModalTitle>View Product</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {hardwareProduct.productDetails && (
                        <CRow className="align-items-center">
                            <CCol xs={12} md={6} className="mb-3 d-flex justify-content-center">
                                <img
                                    src={hardwareProduct.productDetails.images[0]}
                                    alt="subcategory"
                                    width="100%"
                                    style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}
                                />
                            </CCol>
                            <CCol xs={12} md={6}>
                                <div className="text-md-left" style={{ textAlign: 'left' }}>
                                    <h5 className='mb-3' style={{ fontWeight: 'bold' }}>Product Details</h5>
                                    <p><strong>Product Name:</strong> {hardwareProduct.productDetails.productName}</p>
                                    <p><strong>Catgory Name:</strong> {hardwareProduct.productDetails.categoryName}</p>
                                    <p><strong>Sub-Category Name:</strong> {hardwareProduct.productDetails.subCategory}</p>
                                    <p><strong>Sub Sub-Category Name:</strong> {hardwareProduct.productDetails.subSubCategory}</p>
                                    <p><strong>Description:</strong> {hardwareProduct.productDetails.description}</p>
                                    <p><strong>Price:</strong> ${hardwareProduct.productDetails.price}</p>
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

export default HardwareManagement;
