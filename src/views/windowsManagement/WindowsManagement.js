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
    CBadge,
    CInputGroup
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
    const [selectedProductType, setSelectedProductType] = useState('');
    const [editVisible, setEditVisible] = useState(false);
    const [dimensionVisible, setDimensionVisible] = useState(false);
    const [dimensionValue, setDimensionValue] = useState([]);

    const [formData, setFormData] = useState({
        // subCategory: '',
        // subSubCategory: '',
        categoryName: 'Windows',
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
            const response = await axios.get(`http://18.209.197.35:5000/api/category/getcategory/${id}`);
            setCategory(response.data[1].subcategories);
        } catch (error) {
            console.error(error);
        }
    }

    //fetch complete data to show in table
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://18.209.197.35:5000/api/windows/`);
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

    const handleProductTypeChange = (e) => {
        setFormData({ ...formData, productName: e.target.value });
    };

    // const handleSubcategory = (e) => {
    //     const selectedValue = e.target.value;
    //     const selectedSubcategory = category.find((sub) => sub.subcategoryName === selectedValue);

    //     if (selectedSubcategory && Array.isArray(selectedSubcategory.subSubcategories) && selectedSubcategory.subSubcategories.length > 0) {
    //         setSubCategory(selectedSubcategory.subSubcategories);
    //         setSubCategoryVisible(true);
    //     } else {
    //         setSubCategoryVisible(false);
    //         setSubCategory([]);
    //     }
    //     setFormData({ ...formData, subCategory: selectedValue });
    // };

    const handleSubmit = async () => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('categoryName', formData.categoryName);
            formDataToSend.append('subCategory', formData.subCategory);
            formDataToSend.append('productName', formData.productName);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('subSubCategory', formData.subSubCategory);
            formDataToSend.append('price', formData.price);

            for (let i = 0; i < formData.images.length; i++) {
                formDataToSend.append('images', formData.images[i]);
            }

            const response = await axios.post('http://18.209.197.35:5000/api/windows/create', formDataToSend, {
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
    const handleViewClick = async (window) => {
        try {
            setSelectedSubcategory(window);
            const response = await axios.get(`http://18.209.197.35:5000/api/windows/getdimensions/${window._id}`)
            setDimensionValue(response.data.data);
            setViewModalVisible(true);
        } catch (error) {

        }
    };

    //code to delete a window data
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this door?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://18.209.197.35:5000/api/windows/delete/${id}`);
                fetchData();
            } catch (error) {

                console.error(error);
            }
        }
    }


    // edit window code
    const [editFormData, setEditFormData] = useState({
        // subCategory: '',
        // subSubCategory: '',
        productName: '',
        description: '',
        price: '',
        images: []
    });

    const handleEditClick = (window) => {
        setEditVisible(true);
        setEditFormData({
            id: window._id,
            productName: window.productDetails.productName,
            price: window.productDetails.price,
            description: window.productDetails.description,
            // subCategory: window.subCategory,
            // subSubCategory: window.subSubCategory
        });
        setselectedDoor(window);
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

    // const handleEditSubcategory = async (e) => {
    //     const selectedValue = e.target.value;
    //     const selectedSubcategory = category.find((sub) => sub.subcategoryName === selectedValue);

    //     if (selectedSubcategory && Array.isArray(selectedSubcategory.subSubcategories) && selectedSubcategory.subSubcategories.length > 0) {
    //         setSubCategory(selectedSubcategory.subSubcategories);
    //         setSubCategoryVisible(true);
    //     } else {
    //         setSubCategoryVisible(false);
    //         setSubCategory([]);
    //     }
    //     setEditFormData({ ...editFormData, subCategory: selectedValue });
    // }

    const handleEditSubmit = async (id) => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('productName', editFormData.productName);
            formDataToSend.append('description', editFormData.description);
            formDataToSend.append('price', editFormData.price);

            if (editFormData.images) {
                Array.from(editFormData.images).forEach(image => {
                    formDataToSend.append('images', image);
                });
            }

            const response = await axios.put(`http://18.209.197.35:5000/api/windows/update/${id}`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log(response.data);
            setEditVisible(false);
            await fetchData();
            setEditFormData({
                productName: '',
                price: '',
                description: '',
                images: [],
            });
        } catch (error) {
            console.error(error);
        }
    };



    //add dimension code

    const [dimensions, setDimensions] = useState({
        Width_Inches_Fraction: { label: "Width (Inches and Fraction)", data: [{ name: "", cost: "" }] },
        Height_Inches_Fraction: { label: "Height (Inches and Fraction)", data: [{ name: "", cost: "" }] },
        fraction: { label: "Fraction", data: [{ name: "", cost: "" }] },
        Select_Grid_Options: { label: "Grid Options", data: [{ name: "", cost: "" }] },
        Fin_Type: { label: "Fin Type", data: [{ name: "", cost: "" }] },
        Glass_Type: { label: "Glass Type", data: [{ name: "", cost: "" }] },
        Lock_Option: { label: "Lock Option", data: [{ name: "", cost: "" }] },
        color: { label: "Color", data: [{ name: "", cost: "" }] },
        Tempering_Option: { label: "Tempering Option", data: [{ name: "", cost: "" }] },
        Side_Window_Opens: { label: "Side Window Opens", data: [{ name: "", cost: "" }] },
        Installation_Option: { label: "Installation Option", data: [{ name: "", cost: "" }] },
    });

    const [windowType, setWindowType] = useState("");

    const dimensionFieldsByType = {
        XO_Slider: ['Width_Inches_Fraction', 'Height_Inches_Fraction', 'fraction', 'Select_Grid_Options', 'Fin_Type', 'Glass_Type', 'color', 'Tempering_Option', 'Side_Window_Opens', 'Installation_Option'],
        XOX_Slider: ['Width_Inches_Fraction', 'Height_Inches_Fraction', 'fraction', 'Select_Grid_Options', 'Fin_Type', 'Glass_Type', 'color', 'Tempering_Option', 'Lock_Option', 'Installation_Option'],
        Casement_Awning_Window: ['Width_Inches_Fraction', 'Height_Inches_Fraction', 'fraction', 'Select_Grid_Options', 'Fin_Type', 'Glass_Type', 'color', 'Tempering_Option', 'Side_Window_Opens', 'Installation_Option'],
        Picture_Window: ['Width_Inches_Fraction', 'Height_Inches_Fraction', 'fraction', 'Select_Grid_Options', 'Fin_Type', 'color', 'Tempering_Option', 'Installation_Option'],
        Single_Double_Hung_Windows: ['Width_Inches_Fraction', 'Height_Inches_Fraction', 'fraction', 'Select_Grid_Options', 'Fin_Type', 'color', 'Tempering_Option', 'Installation_Option'],
        Garden_Window: ['Width_Inches_Fraction', 'Height_Inches_Fraction', 'color'],
    };


    const handleAddDimensions = (window) => {
        setWindowID(window._id);
        setWindowType(window.productDetails.productName);
        setDimensionVisible(true);
    };

    const updateFieldValue = (field, index, key, value) => {
        const updatedData = [...dimensions[field].data];
        updatedData[index][key] = value;
        setDimensions({ ...dimensions, [field]: { ...dimensions[field], data: updatedData } });
    };

    const handleAddRow = (field) => {
        setDimensions({
            ...dimensions,
            [field]: {
                ...dimensions[field],
                data: [...dimensions[field].data, { name: "", cost: "" }],
            },
        });
    };

    const DimensionNull = () => {
        setDimensions({
            Width_Inches_Fraction: { label: "Width (Inches and Fraction)", data: [{ name: "", cost: "" }] },
            Height_Inches_Fraction: { label: "Height (Inches and Fraction)", data: [{ name: "", cost: "" }] },
            fraction: { label: "Fraction", data: [{ name: "", cost: "" }] },
            Select_Grid_Options: { label: "Grid Options", data: [{ name: "", cost: "" }] },
            Fin_Type: { label: "Fin Type", data: [{ name: "", cost: "" }] },
            Glass_Type: { label: "Glass Type", data: [{ name: "", cost: "" }] },
            Lock_Option: { label: "Lock Option", data: [{ name: "", cost: "" }] },
            color: { label: "Color", data: [{ name: "", cost: "" }] },
            Tempering_Option: { label: "Tempering Option", data: [{ name: "", cost: "" }] },
            Side_Window_Opens: { label: "Side Window Opens", data: [{ name: "", cost: "" }] },
            Installation_Option: { label: "Installation Option", data: [{ name: "", cost: "" }] },
        });
    };


    const handleDimensionSubmit = async (e) => {
        e.preventDefault();
        const filteredDimensions = {};

        for (const field in dimensions) {
            const dimension = dimensions[field];

            if (dimension.data && dimension.data.some(item => item.name || item.cost)) {
                filteredDimensions[field] = {
                    label: dimension.label,
                    data: dimension.data.filter(item => item.name || item.cost),
                };
            }
        }
        try {
            const response = await axios.put(`http://18.209.197.35:5000/api/windows/add-dimensions/${windowID}`, filteredDimensions);
            alert(response.data.message);
            DimensionNull();
            setDimensionVisible(false);
        } catch (error) {
            console.error(error);
            alert("Failed to add dimensions");
        }
    };


    const renderFields = () => {
        const fieldsToRender = dimensionFieldsByType[windowType] || [];
        return fieldsToRender.map((field) => (
            <div key={field} className="mb-4">
                <h5 className="mb-3">{dimensions[field]?.label}</h5>
                {dimensions[field]?.data.map((entry, index) => (
                    <div key={index} className="mb-3">
                        <div className="row">
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Name"
                                    value={entry.name || ""}
                                    onChange={(e) => updateFieldValue(field, index, "name", e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <input
                                    type="number"
                                    className="form-control mb-2"
                                    placeholder="Cost"
                                    value={entry.cost || ""}
                                    onChange={(e) => updateFieldValue(field, index, "cost", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <CButton color="secondary" onClick={() => handleAddRow(field)}>
                    Add Row
                </CButton>
            </div>
        ));
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
                                {/* <CTableHeaderCell style={{ textAlign: 'center' }}>Sub-Category</CTableHeaderCell>
                                <CTableHeaderCell style={{ textAlign: 'center' }}>Sub-SubCategory</CTableHeaderCell> */}
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
                                            {windows.productDetails.images && windows.productDetails.images.length > 0 ? (
                                                <img src={windows.productDetails.images[0]} alt="windows" width="50" height="50" />
                                            ) : 'N/A'}
                                        </CTableDataCell>
                                        <CTableDataCell style={{ textAlign: 'center' }}>{windows.productDetails.productName || 'N/A'}</CTableDataCell>
                                        {/* <CTableDataCell style={{ textAlign: 'center' }}>{windows.subCategory || 'N/A'}</CTableDataCell>
                                        <CTableDataCell style={{ textAlign: 'center' }}>{windows.subSubCategory || 'N/A'}</CTableDataCell> */}
                                        <CTableDataCell style={{ textAlign: 'center' }}>${windows.productDetails.price || 'N/A'}</CTableDataCell>
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
                            {/* <CFormLabel className="mx-2">Sub-Category</CFormLabel>
                            <CFormSelect className="mx-2 mb-2" name="subCategory"
                                value={formData.subCategory}
                                onChange={handleSubcategory} style={{ flex: 1 }}>
                                <option value="">Select sub-category</option>
                                {category.map((sub, index) => (
                                    <option key={index} value={sub.subcategoryName}>
                                        {sub.subcategoryName}
                                    </option>
                                ))}
                            </CFormSelect> */}

                            {/* {subCategoryVisible && (
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
                            )} */}

                            <CFormLabel className="mx-2">Select Product Name</CFormLabel>
                            <CFormSelect
                                className="mx-2 mb-2"
                                name="productType"
                                value={selectedProductType}
                                onChange={handleProductTypeChange}
                                style={{ flex: 1 }}
                            >
                                <option value="">Select Product Name</option>
                                {Object.keys(dimensionFieldsByType).map((type, index) => (
                                    <option key={index} value={type}>
                                        {type.replace('_', ' ').toUpperCase()}
                                    </option>
                                ))}
                            </CFormSelect>
                            {/* <CFormLabel className="mx-2">Product Name</CFormLabel> */}
                            {/* <CFormInput className="mx-2 mb-2" name="productName"
                                value={formData.productName}
                                onChange={handleChange}
                                placeholder="Enter product name" style={{ flex: 1 }} /> */}

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
                        <>
                            {/* Product Details Row */}
                            <CRow className="align-items-center mb-4">
                                <CCol xs={12} md={6} className="mb-3 d-flex justify-content-center">
                                    <img
                                        src={selectedSubcategory.productDetails.images[0]}
                                        alt="subcategory"
                                        width="100%"
                                        style={{
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                                        }}
                                    />
                                </CCol>
                                <CCol xs={12} md={6}>
                                    <div style={{ marginLeft: '10px' }}>
                                        <h5>Product Details</h5>
                                        <p><strong>Category:</strong> {selectedSubcategory.productDetails.categoryName || 'N/A'}</p>
                                        <p><strong>Product Name:</strong> {selectedSubcategory.productDetails.productName || 'N/A'}</p>
                                        {/* <p><strong>Sub-Category:</strong> {selectedSubcategory.subCategory || 'N/A'}</p>
                                        <p><strong>Sub-SubCategory:</strong> {selectedSubcategory.subSubCategory || 'N/A'}</p> */}
                                        <p><strong>Description:</strong> {selectedSubcategory.productDetails.description || 'N/A'}</p>
                                        <p><strong>Price:</strong> ${selectedSubcategory.productDetails.price || 'N/A'}</p>
                                    </div>
                                </CCol>
                            </CRow>
                            <CRow className="mb-4">
                                <CCol xs={12}>
                                    <div
                                        className="card"
                                        style={{
                                            padding: '20px',
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                            borderRadius: '8px',
                                        }}
                                    >
                                        <div className="card-body">
                                            <h3 className="card-title mb-4">Dimensions</h3>
                                            {dimensionValue && Object.keys(dimensionValue).length > 0 ? (
                                                <CRow>
                                                    {Object.entries(dimensionValue)
                                                        .filter(([key]) => key !== 'createdAt') // Exclude 'createdAt' or any unwanted keys
                                                        .map(([key, value]) => (
                                                            <CCol xs={12} key={key} className="mb-4">
                                                                <h5
                                                                    style={{
                                                                        textTransform: 'capitalize',
                                                                        marginBottom: '10px',
                                                                    }}
                                                                >
                                                                    {value.label || key}
                                                                </h5>
                                                                {Array.isArray(value.data) ? (
                                                                    value.data.map((item, idx) => (
                                                                        <div
                                                                            key={idx}
                                                                            style={{
                                                                                padding: '10px',
                                                                                border: '1px solid #ddd',
                                                                                borderRadius: '5px',
                                                                                marginBottom: '10px',
                                                                                backgroundColor: '#f9f9f9',
                                                                            }}
                                                                        >
                                                                            <p>
                                                                                <strong>Name:</strong> {item.name || 'N/A'}
                                                                            </p>
                                                                            <p>
                                                                                <strong>Cost:</strong> ${item.cost || 'N/A'}
                                                                            </p>
                                                                        </div>
                                                                    ))
                                                                ) : (
                                                                    <p>No data available for {value.label || key}.</p>
                                                                )}
                                                            </CCol>
                                                        ))}
                                                </CRow>
                                            ) : (
                                                <p>No dimensions available.</p>
                                            )}
                                        </div>
                                    </div>
                                </CCol>
                            </CRow>
                        </>
                    )}

                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setViewModalVisible(false)}>Close</CButton>
                </CModalFooter>
            </CModal>

            <CModal visible={editVisible} onClose={() => setEditVisible(false)}>
                <CModalHeader>
                    <CModalTitle>Edit Product</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CFormLabel className="mx-2">Product Name</CFormLabel>
                        <CFormInput
                            type="text"
                            name="productName"
                            // onChange={handleEditChange}
                            value={editFormData.productName || ''}
                        />

                        <CFormLabel className="mx-2">Description</CFormLabel>
                        <CFormTextarea
                            name="description"
                            onChange={handleEditChange}
                            value={editFormData.description || ''}
                        />

                        <CFormLabel className="mx-2">Price</CFormLabel>
                        <CFormInput
                            type="number"
                            name="price"
                            onChange={handleEditChange}
                            value={editFormData.price || ''}
                        />

                        <CFormLabel className="mx-2">Images</CFormLabel>
                        <CFormInput
                            type="file"
                            multiple
                            onChange={handleEditFileChange}
                        />
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

            <CModal visible={dimensionVisible} onClose={() => { DimensionNull(), setDimensionVisible(false); }} size="lg">
                <CModalHeader closeButton>
                    <CModalTitle>Add Dimensions</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm onSubmit={handleDimensionSubmit}>
                        {renderFields()}
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={handleDimensionSubmit}>
                        Save Dimensions
                    </CButton>
                    <CButton color="secondary" onClick={() => { DimensionNull(), setDimensionVisible(false); }}>
                        Cancel
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

export default WindowsManagement;
