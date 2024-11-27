import React, { useEffect, useState } from 'react';
import {
    CCard, CCardHeader, CCardBody,
    CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
    CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
    CForm, CFormLabel, CFormSelect,
    CRow,
    CCol,
    CFormInput,
    CHeader
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const EntryDoorsManagement = () => {
    const [visible, setVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [entryDoorsDetails, setEntryDoorsDetails] = useState([]);
    const [entryDoorsProduct, setEntryDoorsProduct] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [selectedSubSubcategory, setSelectedSubSubcategory] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [dimensionId, setDimensionId] = useState(null);
    const [dimensionVisible, setDimensionVisible] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        categoryName: 'Entry Doors',
        subCategoryId: '',
        subCategory: '',
        subSubCategoryId: '',
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
        const response = await axios.get(`http://localhost:5000/api/entryDoor/`);
        setEntryDoorsDetails(response.data.data);
    };

    const fetchCategory = async () => {
        const response = await axios.get(`http://localhost:5000/api/category/`);
        const allSubcategory = response.data.data.filter((category) => category.categoryName === 'Entry Doors');
        setSubCategory(allSubcategory[0].subcategories);
    };

    const handleViewClick = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/entryDoor/getProductById/${id}`);
            setEntryDoorsProduct(response.data.data);
        } catch (error) {
            console.error(error.message);
        }
        setViewModalVisible(true);
    };

    // Create Entry Doors
    const handleSubcategoryChange = (e) => {
        const selectedId = e.target.value;
        const subcategory = subCategory.find((sub) => sub._id === selectedId);
        setFormData((prevFormData) => ({
            ...prevFormData,
            subCategoryId: selectedId,
            subCategory: subCategory ? subcategory.subcategoryName : ""
        }));
        setSelectedSubSubcategory(subcategory.subSubcategories || []);
    };

    const handleSubSubCategoryChange = (e) => {
        const selectedId = e.target.value;
        const subsubCategory = selectedSubSubcategory.find((subsub) => subsub._id === selectedId);
        setFormData((prevFormData) => ({
            ...prevFormData,
            subSubCategoryId: selectedId,
            subSubCategory: subsubCategory ? subsubCategory.subSubcategoryName : ""
        }));
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        setFormData({ ...formData, images: Array.from(files) });
    };

    const handleSubmit = async () => {
        const requiredFields = ['categoryName', 'subCategory', 'description', 'productName', 'price'];
        const emptyFields = requiredFields.filter((field) => !formData[field] || formData[field].trim() === '');

        if (emptyFields.length > 0) {
            alert(`Please fill in the following fields: ${emptyFields.join(', ')}`);
            return;
        }

        if (formData.images.length === 0) {
            alert('Please upload at least one image.');
            return;
        }

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === 'images') {
                formData.images.forEach((image) => data.append('images', image));
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
            const response = await axios.post("http://localhost:5000/api/entryDoor/create", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            await fetchData();
            alert("Product added successfully!");
            setSelectedSubSubcategory('');
            setFormData({
                categoryName: 'Entry Doors',
                subCategoryId: '',
                subCategory: '',
                subSubCategoryId: '',
                subSubCategory: '',
                description: '',
                productName: '',
                price: '',
                images: []
            });
            setVisible(false);
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to add product.");
        }
    };

    // Delete Entry Doors
    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");
        if (isConfirmed) {
            try {
                await axios.delete(`http://localhost:5000/api/entryDoor/delete/${id}`);
                // alert("Product deleted successfully!");
                await fetchData();
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Failed to delete product.");
            }
        }
    };

    // Update Entry Doors
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
            await axios.put(`http://localhost:5000/api/entryDoor/update/${selectedProduct._id}`, data, {
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


    // add dimensions
    const handleAddDimension = (id) => {
        setDimensionId(id);
        setDimensionVisible(true);
    }


    const [dimensions, setDimensions] = useState({
        frameWidthAndHeight: { label: "Frame Width and Height", data: [] },
        addPrefinish: { label: "Add Prefinish", data: [] },
        doorSwingDirection: { label: "Select Door Swing Direction", data: [] },
        boreOptions: { label: "Select Bore Options", data: [] },
        jambSize: { label: "Select the Jamb Size", data: [] },
        doorShoe: { label: "Door Shoe", data: [] },
        weatherStrip: { label: "Weatherstrip", data: [] },
        hinges: { label: "Hinges", data: [] },
        preHungOptions: { label: "Select Pre Hung Options", data: [] },
        sill: { label: "Sill", data: [] },
        installationOption: { label: "Installation Option", data: [] },
    });

    const setDimensionsNull = () => {
        setDimensions({
            frameWidthAndHeight: { label: "Frame Width and Height", data: [] },
            addPrefinish: { label: "Add Prefinish", data: [] },
            doorSwingDirection: { label: "Select Door Swing Direction", data: [] },
            boreOptions: { label: "Select Bore Options", data: [] },
            jambSize: { label: "Select the Jamb Size", data: [] },
            doorShoe: { label: "Door Shoe", data: [] },
            weatherStrip: { label: "Weatherstrip", data: [] },
            hinges: { label: "Hinges", data: [] },
            preHungOptions: { label: "Select Pre Hung Options", data: [] },
            sill: { label: "Sill", data: [] },
            installationOption: { label: "Installation Option", data: [] },
        });
    }


    const handleDimensionChange = (e, category) => {
        const { name, value } = e.target;
        setDimensions((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [name]: value,
            },
        }));
    };


    const handleAddData = (category) => {
        const lastRow = dimensions[category].data[dimensions[category].data.length - 1];

        if (lastRow && (!lastRow.name)) {
            alert("Please fill in all required fields before adding a new row.");
            return;
        }

        setError("");
        setDimensions((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                data: [...prev[category].data, { name: "", cost: "" }],
            },
        }));
    };

    const handleRemoveData = (category, index) => {
        setDimensions((prev) => {
            const updatedData = [...prev[category].data];
            updatedData.splice(index, 1);
            return {
                ...prev,
                [category]: {
                    ...prev[category],
                    data: updatedData,
                },
            };
        });
    };

    const handleDataChange = (e, category, index) => {
        const { name, value } = e.target;
        setDimensions((prev) => {
            const updatedData = [...prev[category].data];
            updatedData[index] = { ...updatedData[index], [name]: value };
            return {
                ...prev,
                [category]: {
                    ...prev[category],
                    data: updatedData,
                },
            };
        });
    };

    const handleDimensionSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");


        for (const category in dimensions) {
            const invalidData = dimensions[category].data.some(
                (item) => !item.name || !item.cost
            );
            if (invalidData) {
                alert(`Please fill in all required fields for ${dimensions[category].label}.`);
                setLoading(false);
                return;
            }
        }

        const filteredDimensions = Object.keys(dimensions).reduce((acc, key) => {
            if (dimensions[key].data.length > 0) {
                acc[key] = dimensions[key];
            }
            return acc;
        }, {});

        try {
            const response = await axios.put(
                `http://localhost:5000/api/entryDoor/add-dimensions/${dimensionId}`,
                { dimensions: filteredDimensions },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );


            if (response.data.success) {
                alert("Dimensions added successfully");
                setDimensionVisible(false);
                setDimensionsNull();
            } else {
                alert("Failed to update dimensions.");
            }
        } catch (err) {
            console.error("Error response:", err.response?.data || err.message);
            alert("Failed to update dimensions. Please try again.");
        } finally {
            setLoading(false);
        }
    };




    return (
        <>
            <CCard>
                <CCardHeader>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5>Entry Doors Management</h5>
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
                            {entryDoorsDetails.map((data, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell style={{ textAlign: 'center' }}>{index + 1}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>
                                        <img src={data.productDetails.images[0]} alt="subcategory" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                    </CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>{data.productDetails.productName}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>{data.productDetails.description}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>${data.productDetails.price}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>
                                        <CButton style={{ margin: '0 2px', padding: '4px' }} onClick={() => handleAddDimension(data._id)}>
                                            <FontAwesomeIcon style={{ color: 'blue' }} icon={faPlus} />
                                        </CButton>
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
                    {entryDoorsProduct.productDetails && (
                        <CRow className="align-items-center">
                            <CCol xs={12} md={6} className="mb-3 d-flex justify-content-center">
                                <img
                                    src={entryDoorsProduct.productDetails.images[0]}
                                    alt="subcategory"
                                    width="100%"
                                    style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}
                                />
                            </CCol>
                            <CCol xs={12} md={6}>
                                <div className="text-md-left" style={{ textAlign: 'left' }}>
                                    <h5 className='mb-3' style={{ fontWeight: 'bold' }}>Product Details</h5>
                                    <p><strong>Product Name:</strong> {entryDoorsProduct.productDetails.productName || "N/A"}</p>
                                    <p><strong>Catgory Name:</strong> {entryDoorsProduct.productDetails.categoryName || "N/A"}</p>
                                    <p><strong>Sub-Category Name:</strong> {entryDoorsProduct.productDetails.subCategory || "N/A"}</p>
                                    <p><strong>Sub Sub-Category Name:</strong> {entryDoorsProduct.productDetails.subSubCategory || "N/A"}</p>
                                    <p><strong>Description:</strong> {entryDoorsProduct.productDetails.description || "N/A"}</p>
                                    <p><strong>Price:</strong> ${entryDoorsProduct.productDetails.price || "N/A"}</p>
                                </div>
                            </CCol>
                        </CRow>
                    )}
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
                                    {entryDoorsProduct.dimensions && Object.keys(entryDoorsProduct.dimensions).length > 0 ? (
                                        <CRow>
                                            {Object.entries(entryDoorsProduct.dimensions)
                                                .filter(([key]) => key !== 'createdAt')
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
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setViewModalVisible(false)}>Close</CButton>
                </CModalFooter>
            </CModal>

            <CModal size="lg" visible={dimensionVisible} onClose={() => { setDimensionsNull(), setDimensionVisible(false) }}>
                <CModalHeader>
                    <CModalTitle>Add Dimension</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div style={{ padding: '20px' }}>
                        {message && <div style={{ padding: '10px', backgroundColor: '#28a745', color: '#fff', borderRadius: '5px', marginBottom: '15px' }}>{message}</div>}
                        {error && <div style={{ padding: '10px', backgroundColor: '#dc3545', color: '#fff', borderRadius: '5px', marginBottom: '15px' }}>{error}</div>}

                        <form id="dimensionForm" onSubmit={handleDimensionSubmit} style={{ marginTop: '20px' }}>
                            {Object.keys(dimensions).map((category) => (
                                <div key={category} style={{ marginBottom: '20px' }}>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', fontWeight: 500 }}>
                                        {dimensions[category].label}
                                    </h3>

                                    {dimensions[category].data.map((dataItem, index) => (
                                        <div
                                            key={index}
                                            style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}
                                        >
                                            <div style={{ flexGrow: 1, display: 'flex', gap: '10px' }}>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={dataItem.name}
                                                    placeholder="Enter dimension name"
                                                    onChange={(e) => handleDataChange(e, category, index)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '10px',
                                                        border: '1px solid #ccc',
                                                        borderRadius: '5px',
                                                        fontSize: '1rem',
                                                    }}
                                                />
                                                <input
                                                    type="number"
                                                    name="cost"
                                                    value={dataItem.cost}
                                                    placeholder="Enter cost"
                                                    onChange={(e) => handleDataChange(e, category, index)}
                                                    style={{
                                                        padding: '10px',
                                                        border: '1px solid #ccc',
                                                        borderRadius: '5px',
                                                        fontSize: '1rem',
                                                    }}
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveData(category, index)}
                                                style={{
                                                    backgroundColor: '#dc3545',
                                                    color: 'white',
                                                    padding: '8px 15px',
                                                    fontSize: '0.9rem',
                                                    border: 'none',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    marginLeft: '10px',
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => handleAddData(category)}
                                        style={{
                                            backgroundColor: '#28a745',
                                            color: 'white',
                                            padding: '10px 20px',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            marginTop: '15px',
                                            fontSize: '1rem',
                                        }}
                                    >
                                        Add Data
                                    </button>
                                </div>
                            ))}

                            <div style={{ marginTop: '20px' }}>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    style={{
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        padding: '12px 20px',
                                        fontSize: '1rem',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        width: '100%',
                                    }}
                                >
                                    {loading ? 'Saving...' : 'Add Dimensions'}
                                </button>
                            </div>
                        </form>
                    </div>
                </CModalBody>
                <CModalFooter>
                    {/* <CButton
                        color="primary"
                        onClick={() => document.getElementById('dimensionForm').requestSubmit()} // Manually trigger form submission
                        style={{ padding: '8px 20px', fontSize: '1rem', borderRadius: '5px' }}
                    >
                        Add Dimensions
                    </CButton> */}
                    <CButton
                        color="secondary"
                        onClick={() => { setDimensionVisible(false), setDimensionsNull() }}
                        style={{ padding: '8px 20px', fontSize: '1rem', borderRadius: '5px' }}
                    >
                        Close
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

export default EntryDoorsManagement;
