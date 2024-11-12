import React, { useEffect, useState } from 'react'
import {
    CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
    CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
    CForm, CFormLabel, CFormSelect, CRow, CCol, CFormInput,
    CCard,
    CCardHeader,
    CCardBody,
    CFormTextarea,
    CListGroup,
    CListGroupItem,
    CBadge
} from '@coreui/react'
import { faEdit, faEye, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const WindowsManagement = () => {
    const [visible, setVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [windowsData, setWindowsData] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [windowID, setWindowID] = useState(null);
    const [subCategoryVisible, setSubCategoryVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [dimensionVisible, setDimensionVisible] = useState(false);

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

    //fetch category to use in edit window
    const fetchCategory = async (id) => {
        try {
            const response = await axios.get(`http://44.196.192.232:5000/api/category/getcategory/${id}`);
            setCategory(response.data[1].subcategories);
        } catch (error) {
            console.error(error);
        }
    }

    //fetch complete data to show in table
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://44.196.192.232:5000/api/windows/`);
            setWindowsData(response.data.data)
        } catch (error) {
            console.error(error);
        }
    }






    //add windows
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





    //code to view single window data
    const handleViewClick = (subcategory) => {
        setSelectedSubcategory(subcategory);
        setViewModalVisible(true);
    };

    //code to delete a window data
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




    // edit window code
    const [editFormData, setEditFormData] = useState({
        subCategory: '',
        subSubCategory: '',
        productName: '',
        description: '',
        price: '',
        images: []
    });

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





    //add dimension code
    const [dimensionFormData, setDimensionFormData] = useState({
        widths: [],
        heights: [],
        fractions: [],
        gridOptions: [],
        finTypes: [],
        glassTypes: [],
        lockTypes: [],
        colors: [],
        temperingOptions: [],
        sideWindowOpens: [],
        installationOptions: [],
    });

    const [currentValues, setCurrentValues] = useState({
        width: '',
        height: '',
        fraction: '',
        gridOption: '',
        finType: '',
        glassType: '',
        lockType: '',
        color: '',
        temperingOption: '',
        sideWindowOpen: '',
        installationOption: '',
    });

    const addValue = (key) => {
        const value = currentValues[key];
        if (value) {
            const existingValues = dimensionFormData[key] || [];
            if (!existingValues.includes(value)) {
                setDimensionFormData((prev) => ({
                    ...prev,
                    [key]: [...existingValues, value],
                }));
                setCurrentValues((prev) => ({ ...prev, [key]: '' }));
            }
        }
    };

    const removeValue = (key, value) => {
        setDimensionFormData((prev) => ({
            ...prev,
            [key]: prev[key].filter((v) => v !== value),
        }));
    };

    const handleAddDimensions = (window) => {
        setWindowID(window._id);
        setDimensionVisible(true);

        setDimensionFormData({
            widths: [],
            heights: [],
            fractions: [],
            gridOptions: [],
            finTypes: [],
            glassTypes: [],
            lockTypes: [],
            colors: [],
            temperingOptions: [],
            sideWindowOpens: [],
            installationOptions: [],
        });

        setCurrentValues({
            width: '',
            height: '',
            fraction: '',
            gridOption: '',
            finType: '',
            glassType: '',
            lockType: '',
            color: '',
            temperingOption: '',
            sideWindowOpen: '',
            installationOption: '',
        });
    };

    const handleDimesionSubmit = async () => {
        try {
            const response = await axios.post(`http://44.196.192.232:5000/api/windows/add-dimensions/${windowID}`, dimensionFormData, {
                headers: { 'Content-Type': 'application/json ' },
            });
            console.log(response);
            console.log('Submitting dimensions:', dimensionFormData);
        } catch (error) {
            console.error(error);
        }
        setDimensionVisible(false);
    };



    return (
        <>
            <CCard>
                <CCardHeader>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>Windows Management</h5>
                        <CButton color="primary" onClick={() => { setVisible(!visible) }}>
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
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Price</CTableHeaderCell>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Actions</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {windowsData.length === 0 ? (
                                <CTableRow>
                                    <CTableDataCell colSpan={7} style={{ textAlign: 'center' }}>
                                        N/A
                                    </CTableDataCell>
                                </CTableRow>
                            ) : (
                                windowsData.map((windows, index) => (
                                    <CTableRow key={index}>
                                        <CTableDataCell style={{ textAlign: 'center' }}>{index + 1}</CTableDataCell>
                                        <CTableDataCell style={{ textAlign: 'center' }}>
                                            {windows.images && windows.images.length > 0 ? (
                                                <img src={windows.images[0]} alt="windows" width="50" height="50" />
                                            ) : 'N/A'}
                                        </CTableDataCell>
                                        <CTableDataCell style={{ textAlign: 'center' }}>{windows.productName || 'N/A'}</CTableDataCell>
                                        <CTableDataCell style={{ textAlign: 'center' }}>{windows.subCategory || 'N/A'}</CTableDataCell>
                                        <CTableDataCell style={{ textAlign: 'center' }}>{windows.subSubCategory || 'N/A'}</CTableDataCell>
                                        <CTableDataCell style={{ textAlign: 'center' }}>{windows.price || 'N/A'}</CTableDataCell>
                                        <CTableDataCell style={{ textAlign: 'center' }}>
                                            <CButton style={{ margin: '0 2px', padding: '4px' }} onClick={() => handleAddDimensions(windows)}>
                                                <FontAwesomeIcon style={{ color: 'blue' }} icon={faPlus} />
                                            </CButton>
                                            <CButton style={{ margin: '0 2px', padding: '4px' }} onClick={() => handleViewClick(windows)}>
                                                <FontAwesomeIcon style={{ color: 'blue' }} icon={faEye} />
                                            </CButton>
                                            <CButton style={{ margin: '0 2px', padding: '4px' }} onClick={() => handleEditClick(windows)}>
                                                <FontAwesomeIcon style={{ color: 'green' }} icon={faEdit} />
                                            </CButton>
                                            <CButton style={{ margin: '0 2px', padding: '4px' }} onClick={() => handleDelete(windows._id)}>
                                                <FontAwesomeIcon style={{ color: 'red' }} icon={faTrash} />
                                            </CButton>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))
                            )}
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
                    {selectedSubcategory && (
                        <CRow className="align-items-center">
                            <CCol xs={12} md={6} className="mb-3 d-flex justify-content-center">
                                <img src={selectedSubcategory.images[0]} alt="subcategory" width="100%" style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }} />
                            </CCol>
                            <CCol xs={12} md={6}>
                                <div style={{ marginLeft: '10px' }}>
                                    <h5>Product Details</h5>
                                    <p><strong>Category:</strong> {selectedSubcategory.categoryName || 'N/A'}</p>
                                    <p><strong>Product Name:</strong> {selectedSubcategory.productName || 'N/A'}</p>
                                    <p><strong>Sub-Category:</strong> {selectedSubcategory.subCategory || 'N/A'}</p>
                                    <p><strong>Sub-SubCategory:</strong> {selectedSubcategory.subSubCategory || 'N/A'}</p>
                                    <p><strong>Description:</strong> {selectedSubcategory.description || 'N/A'}</p>
                                    <p><strong>Price:</strong> {selectedSubcategory.price || 'N/A'}</p>
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

            <CModal size='lg' visible={dimensionVisible} onClose={() => setDimensionVisible(false)}>
                <CModalHeader>
                    <CModalTitle><h4>Add Dimensions</h4></CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div>
                        {Object.keys(currentValues).map((key) => (
                            <div key={key}>
                                <h5 className='ms-1'>{key.charAt(0).toUpperCase() + key.slice(1)}</h5>
                                <div
                                    className="input-box mb-2"
                                    style={{
                                        borderRadius: '4px',
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    {(dimensionFormData[key] || []).map((value, index) => (
                                        <CBadge
                                            key={index}
                                            color="info"
                                            style={{
                                                margin: '5px',
                                                padding: '10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                backgroundColor: '#17a2b8',
                                                color: '#ffffff',
                                            }}
                                        >
                                            {value}
                                            <CButton
                                                color="danger"
                                                size="sm"
                                                style={{ marginLeft: '8px' }}
                                                onClick={() => removeValue(key, value)}
                                            >
                                                &times;
                                            </CButton>
                                        </CBadge>
                                    ))}
                                    <CFormInput
                                        type="text"
                                        value={currentValues[key]}
                                        placeholder={`Add a ${key}`}
                                        onChange={(e) => setCurrentValues((prev) => ({ ...prev, [key]: e.target.value }))}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                addValue(key);
                                            }
                                        }}
                                        style={{
                                            flex: 1,
                                            borderRadius: '4px',
                                            outline: 'none',
                                            padding: '10px',
                                        }}
                                    />
                                    <CButton className='ms-1' color="primary" onClick={() => addValue(key)} >
                                        Add
                                    </CButton>
                                </div>
                            </div>
                        ))}
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" type="submit" onClick={handleDimesionSubmit}>
                        Add Dimensions
                    </CButton>
                    <CButton color="secondary" onClick={() => setDimensionVisible(false)}>
                        Cancel
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

export default WindowsManagement;
