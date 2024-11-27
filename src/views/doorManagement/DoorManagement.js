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
    CFormTextarea,
    CBadge,
} from '@coreui/react';
import { faEdit, faEye, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const DoorManagement = () => {
    const [doorData, setDoorData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [selectedDoor, setselectedDoor] = useState(null);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [subCategoryVisible, setSubCategoryVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [dimensionVisible, setDimensionVisible] = useState(false);
    const [doorID, setDoorID] = useState(false);

    const [formData, setFormData] = useState({
        subCategory: '',
        subSubCategory: '',
        productName: '',
        description: '',
        price: '',
        images: []
    });

    const [editFormData, setEditFormData] = useState({
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

    const fetchCategory = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/category/`);
            setCategory(response.data[0].subcategories);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/doors/`);
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
        console.log(formData.images);
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

            const response = await axios.post('http://localhost:5000/api/doors/add-doors', formDataToSend, {
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
                await axios.delete(`http://localhost:5000/api/doors/delete-door/${id}`);
                fetchData();
            } catch (error) {
                console.error(error);
            }
        }
    }

    const handleViewClick = (door) => {
        setselectedDoor(door);
        setViewModalVisible(true);
    };

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
        console.log(editFormData.images);
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

            if (editFormData.images && Array.isArray(editFormData.images)) {
                for (let i = 0; i < editFormData.images.length; i++) {
                    formDataToSend.append('images', editFormData.images[i]);
                }
            } else {
                console.error("editFormData.images is not defined or not an array", editFormData.images);
            }
            console.log(id);

            console.log("formDataToSend", editFormData)

            formDataToSend.forEach((value, key) => {
                console.log(key, value);
            });

            const response = await axios.put(`http://localhost:5000/api/doors/update-door/${id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
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
    const fieldNames = {
        frameWidthAndHeight: 'Frame Width and Height',
        addPrefinish: 'Add Prefinish',
        doorSwingDirection: 'Door Swing Direction',
        jampSize: 'Jamb Size',
        sill: 'Sill',
        doorShoe: 'Door Shoe',
        weatherstrip: 'Weatherstrip',
        boreOptions: 'Bore Options',
        hinges: 'Hinges',
        preHungOptions: 'Pre-Hung Options',
        caulkingOption: 'Caulking Option',
        installationOption: 'Installation Option'
    };

    const [dimensionFormData, setDimensionFormData] = useState({
        frameWidthAndHeight: [],
        addPrefinish: [],
        doorSwingDirection: [],
        jampSize: [],
        sill: [],
        doorShoe: [],
        weatherstrip: [],
        boreOptions: [],
        hinges: [],
        preHungOptions: [],
        caulkingOption: [],
        installationOption: []
    });

    const [currentValues, setCurrentValues] = useState({
        frameWidthAndHeight: '',
        addPrefinish: '',
        doorSwingDirection: '',
        jampSize: '',
        sill: '',
        doorShoe: '',
        weatherstrip: '',
        boreOptions: '',
        hinges: '',
        preHungOptions: '',
        caulkingOption: '',
        installationOption: ''
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

    const handleAddDimensions = (door) => {
        setDoorID(door._id);
        setDimensionVisible(true);

        setDimensionFormData({
            frameWidthAndHeight: [],
            addPrefinish: [],
            doorSwingDirection: [],
            jampSize: [],
            sill: [],
            doorShoe: [],
            weatherstrip: [],
            boreOptions: [],
            hinges: [],
            preHungOptions: [],
            caulkingOption: [],
            installationOption: []
        });

        setCurrentValues({
            frameWidthAndHeight: '',
            addPrefinish: '',
            doorSwingDirection: '',
            jampSize: '',
            sill: '',
            doorShoe: '',
            weatherstrip: '',
            boreOptions: '',
            hinges: '',
            preHungOptions: '',
            caulkingOption: '',
            installationOption: ''
        });
    };

    const handleDimesionSubmit = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/doors/add-dimensions/${doorID}`, dimensionFormData, {
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
                                        {door.price || 'N/A'}
                                    </CTableDataCell>
                                    <CTableDataCell style={{ textAlign: 'center' }}>
                                        <CButton style={{ margin: '0 2px', padding: '4px' }} onClick={() => handleAddDimensions(door)}>
                                            <FontAwesomeIcon style={{ color: 'blue' }} icon={faPlus} />
                                        </CButton>
                                        <CButton style={{ margin: '0 2px', padding: '4px' }} onClick={() => handleViewClick(door)} >
                                            <FontAwesomeIcon style={{ color: 'blue' }} icon={faEye} />
                                        </CButton>
                                        <CButton style={{ margin: '0 2px', padding: '4px' }} onClick={() => handleEditClick(door)} >
                                            <FontAwesomeIcon style={{ color: 'green' }} icon={faEdit} />
                                        </CButton>
                                        <CButton style={{ margin: '0 2px', padding: '4px' }} onClick={() => handleDelete(door._id)} >
                                            <FontAwesomeIcon style={{ color: 'red' }} icon={faTrash} />
                                        </CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                </CCardBody>
            </CCard>

            <CModal visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader>
                    <CModalTitle>Add Door</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CFormLabel className="mx-2">Sub Category</CFormLabel>
                        <CFormSelect onChange={handleSubcategory} name="subCategory" value={formData.subCategory}>
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
                        <CFormInput type="text" name="productName" onChange={handleChange} value={formData.productName} />

                        <CFormLabel className="mx-2">Description</CFormLabel>
                        <CFormTextarea name="description" onChange={handleChange} value={formData.description} />

                        <CFormLabel className="mx-2">Price</CFormLabel>
                        <CFormInput type="number" name="price" onChange={handleChange} value={formData.price} />

                        <CFormLabel className="mx-2">Images</CFormLabel>
                        <CFormInput type="file" multiple onChange={handleFileChange} />
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Cancel
                    </CButton>
                    <CButton color="primary" onClick={handleSubmit}>
                        Submit
                    </CButton>
                </CModalFooter>
            </CModal>

            <CModal size='lg' visible={viewModalVisible} onClose={() => setViewModalVisible(false)}>
                <CModalHeader>
                    <CModalTitle>View Product</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {selectedDoor && (
                        <CRow className="align-items-center">
                            <CCol xs={12} md={6} className="mb-3 d-flex justify-content-center">
                                {selectedDoor.images && selectedDoor.images.length > 0 ? (
                                    <img src={selectedDoor.images[0]} alt="door" width="100%" height="400" style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }} />
                                ) : (
                                    <div>No Image Available</div>
                                )}
                            </CCol>
                            <CCol xs={12} md={6}>
                                <div style={{ marginLeft: '10px' }}>
                                    <h5>Product Details</h5>
                                    <p><strong>Product Name:</strong> {selectedDoor.productName || 'N/A'}</p>
                                    <p><strong>Category:</strong> {selectedDoor.categoryName || 'N/A'}</p>
                                    <p><strong>Sub-Category:</strong> {selectedDoor.subCategory || 'N/A'}</p>
                                    <p><strong>Sub-SubCategory:</strong> {selectedDoor.subSubCategory || 'N/A'}</p>
                                    <p><strong>Description:</strong> {selectedDoor.description || 'N/A'}</p>
                                    <p><strong>Price:</strong> {selectedDoor.price ? `$${selectedDoor.price}` : 'N/A'}</p>
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
                                <h5 className='ms-1'>{fieldNames[key]}</h5>
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
                                        placeholder={`Add a ${fieldNames[key]}`}
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
                                    <CButton className='ms-1' color="primary" onClick={() => addValue(key)}>
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

export default DoorManagement;