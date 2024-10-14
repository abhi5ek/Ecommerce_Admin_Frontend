import React, { useState } from 'react'
import {
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
  CForm, CFormLabel, CFormSelect,
  CRow,
  CCol,
  CFormInput
} from '@coreui/react'
import image1 from '../../../assets/brand/door-imag.png';
import image2 from '../../../assets/brand/door-imagee.jpg';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const VinySlidePatio = () => {
  const [visible, setVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const doorSubcategories = [
    {
      image: image1,
      width: '30"',
      height: '80"',
      fraction: '1/2',
      grid: 'Yes',
      finType: 'Nail Fin',
      glassType: 'Double Pane',
      color: 'White',
      temperingGlass: 'Yes',
      slideWindowOption: 'Right Slide',
      installationOption: 'Pre-Hung',
      instructions: 'Included'
    },
    {
      image: image2,
      width: '30',
      height: '84"',
      fraction: '3/4',
      grid: 'No',
      finType: 'Brick Mold',
      glassType: 'Triple Pane',
      color: 'Black',
      temperingGlass: 'No',
      slideWindowOption: 'Left Slide',
      installationOption: 'Block Frame',
      instructions: 'Not Included'
    },
  ]

  const handleViewClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setViewModalVisible(true);
  };

  return (
    <>
      <div className="d-flex justify-content-end" style={{ margin: '10px 0' }}>
        <CButton
          color="primary"
          onClick={() => setVisible(!visible)}
        >
          Add New
        </CButton>
      </div>

      {/* Table */}
      <CTable hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell style={{ textAlign: 'center' }}>Index</CTableHeaderCell>
            <CTableHeaderCell style={{ textAlign: 'center' }}>Image</CTableHeaderCell>
            <CTableHeaderCell style={{ textAlign: 'center' }}>Width</CTableHeaderCell>
            <CTableHeaderCell style={{ textAlign: 'center' }}>Height</CTableHeaderCell>
            <CTableHeaderCell style={{ textAlign: 'center' }}>Fraction</CTableHeaderCell>
            <CTableHeaderCell style={{ textAlign: 'center' }}>Grid</CTableHeaderCell>
            {/* <CTableHeaderCell>Fin Type</CTableHeaderCell>
            <CTableHeaderCell>Glass Type</CTableHeaderCell>
            <CTableHeaderCell>Color</CTableHeaderCell> */}
            <CTableHeaderCell style={{ textAlign: 'center' }}>Tempering Glass</CTableHeaderCell>
            <CTableHeaderCell style={{ textAlign: 'center' }}>Slide Window Option</CTableHeaderCell>
            <CTableHeaderCell style={{ textAlign: 'center' }}>Installation Option</CTableHeaderCell>
            <CTableHeaderCell style={{ textAlign: 'center' }}>Instructions</CTableHeaderCell>
            <CTableHeaderCell style={{ textAlign: 'center' }}>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {doorSubcategories.map((subcategory, index) => (
            <CTableRow key={index}>
              <CTableDataCell style={{ textAlign: 'center' }}>{index + 1}</CTableDataCell>
              <CTableDataCell style={{ textAlign: 'center' }}>
                <img src={subcategory.image} alt="subcategory" width="50" />
              </CTableDataCell>
              <CTableDataCell style={{ textAlign: 'center' }}>{subcategory.width}</CTableDataCell>
              <CTableDataCell style={{ textAlign: 'center' }}>{subcategory.height}</CTableDataCell>
              <CTableDataCell style={{ textAlign: 'center' }}>{subcategory.fraction}</CTableDataCell>
              <CTableDataCell style={{ textAlign: 'center' }}>{subcategory.grid}</CTableDataCell>
              {/* <CTableDataCell>{subcategory.finType}</CTableDataCell>
              <CTableDataCell>{subcategory.glassType}</CTableDataCell>
              <CTableDataCell>{subcategory.color}</CTableDataCell> */}
              <CTableDataCell style={{ textAlign: 'center' }}>{subcategory.temperingGlass}</CTableDataCell>
              <CTableDataCell style={{ textAlign: 'center' }}>{subcategory.slideWindowOption}</CTableDataCell>
              <CTableDataCell style={{ textAlign: 'center' }}>{subcategory.installationOption}</CTableDataCell>
              <CTableDataCell style={{ textAlign: 'center' }}>{subcategory.instructions}</CTableDataCell>
              <CTableDataCell style={{ textAlign: 'center' }}>
                <CButton style={{ margin: '0 2px', padding: '4px' }}>
                  <FontAwesomeIcon style={{ color: 'blue' }}
                    onClick={() => handleViewClick(subcategory)}
                    icon={faEye} />
                </CButton>
                <CButton style={{ margin: '0 2px', padding: '4px' }}>
                  <FontAwesomeIcon style={{ color: 'green' }}
                    onClick={() => handleEditClick()}
                    icon={faEdit} />
                </CButton>
                <CButton style={{ margin: '0 2px', padding: '4px' }}>
                  <FontAwesomeIcon style={{ color: 'red' }}
                    onClick={() => handleDelete()}
                    icon={faTrash} />
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      {/* Add Subcategory Modal */}
      <CModal size='lg' visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Add New Product</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow>

              <CCol>
                <CFormLabel>Width</CFormLabel>
                <CFormSelect>
                  <option>Select width</option>
                  <option value="30">30"</option>
                  <option value="36">36"</option>
                </CFormSelect>
              </CCol>

              <CCol>
                <CFormLabel>Height</CFormLabel>
                <CFormSelect>
                  <option>Select height</option>
                  <option value="80">80"</option>
                  <option value="84">84"</option>
                </CFormSelect>
              </CCol>

            </CRow>

            <CRow>
              <CCol>
                <CFormLabel>Fraction</CFormLabel>
                <CFormSelect>
                  <option>Select fraction</option>
                  <option value="1/2">1/2</option>
                  <option value="3/4">3/4</option>
                </CFormSelect>
              </CCol>
              <CCol>
                <CFormLabel>Grid</CFormLabel>
                <CFormSelect>
                  <option>Select grid</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CFormLabel>Fin Type</CFormLabel>
                <CFormSelect>
                  <option>Select fin type</option>
                  <option value="Nail Fin">Nail Fin</option>
                  <option value="Brick Mold">Brick Mold</option>
                </CFormSelect>
              </CCol>
              <CCol>
                <CFormLabel>Glass Type</CFormLabel>
                <CFormSelect>
                  <option>Select glass type</option>
                  <option value="Double Pane">Double Pane</option>
                  <option value="Triple Pane">Triple Pane</option>
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CFormLabel>Color</CFormLabel>
                <CFormSelect>
                  <option>Select color</option>
                  <option value="White">White</option>
                  <option value="Black">Black</option>
                </CFormSelect>
              </CCol>
              <CCol>
                <CFormLabel>Tempering Glass</CFormLabel>
                <CFormSelect>
                  <option>Select tempering glass</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CFormLabel>Slide Window Option</CFormLabel>
                <CFormSelect>
                  <option>Select slide window option</option>
                  <option value="Right Slide">Right Slide</option>
                  <option value="Left Slide">Left Slide</option>
                </CFormSelect>
              </CCol>
              <CCol>
                <CFormLabel>Installation Option</CFormLabel>
                <CFormSelect>
                  <option>Select installation option</option>
                  <option value="Pre-Hung">Pre-Hung</option>
                  <option value="Block Frame">Block Frame</option>
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CFormLabel>Instructions</CFormLabel>
                <CFormSelect>
                  <option>Select instructions</option>
                  <option value="Included">Included</option>
                  <option value="Not Included">Not Included</option>
                </CFormSelect>
              </CCol>
              <CCol>
                <CFormLabel>Upload Image</CFormLabel>
                <CFormInput type="file" />
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={() => setVisible(false)}>
            Save
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal size='lg' visible={viewModalVisible} onClose={() => setViewModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>View Product</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedSubcategory && (
            <CRow>
            <CCol xs={6} className="d-flex align-items-center">
  <img
    src={selectedSubcategory.image}
    alt="subcategory"
    width="100%"
    style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}
  />
</CCol>

              <CCol xs={6}>
                <div style={{ marginLeft: '10px' }}>
                  <h5>Product Details</h5>
                  <p><strong>Width:</strong> {selectedSubcategory.width}</p>
                  <p><strong>Height:</strong> {selectedSubcategory.height}</p>
                  <p><strong>Fraction:</strong> {selectedSubcategory.fraction}</p>
                  <p><strong>Grid:</strong> {selectedSubcategory.grid}</p>
                  <p><strong>Fin Type:</strong> {selectedSubcategory.finType}</p>
                  <p><strong>Glass Type:</strong> {selectedSubcategory.glassType}</p>
                  <p><strong>Color:</strong> {selectedSubcategory.color}</p>
                  <p><strong>Tempering Glass:</strong> {selectedSubcategory.temperingGlass}</p>
                  <p><strong>Slide Window Option:</strong> {selectedSubcategory.slideWindowOption}</p>
                  <p><strong>Installation Option:</strong> {selectedSubcategory.installationOption}</p>
                  <p><strong>Instructions:</strong> {selectedSubcategory.instructions}</p>
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
  )
}

export default VinySlidePatio;

