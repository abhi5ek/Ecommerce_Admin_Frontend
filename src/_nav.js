import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilListRich,
  cilWindow,
  cilDoor,
  cilSettings,
  cilTruck,
  cilCheckCircle,
  cilDescription,
  cilBuilding,
  cilLayers,
  cilHome
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" style={{ color: 'blue' }} />,
  },
  {
    component: CNavItem,
    name: 'Category Management',
    to: '/categorymanagement',
    icon: <CIcon icon={cilListRich} customClassName="nav-icon" style={{ color: 'green' }} />,
  },
  {
    component: CNavItem,
    name: 'Windows Management',
    to: '/windowsmanagement',
    icon: <CIcon icon={cilLayers} customClassName="nav-icon" style={{ color: 'coral' }} />,
  },
  {
    component: CNavItem,
    name: 'Multi Slide & BiFold Doors',
    to: '/mutlislide',
    icon: <CIcon icon={cilDoor} customClassName="nav-icon" style={{ color: '#6A0DAD' }} />,  // dark purple
  },
  {
    component: CNavItem,
    name: 'Entry Doors',
    to: '/entrydoors',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" style={{ color: '#1E90FF' }} />,  // dodger blue
  },
  {
    component: CNavItem,
    name: 'Interior Doors',
    to: '/interiordoors',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" style={{ color: '#FF8C00' }} />,  // dark orange
  },
  {
    component: CNavItem,
    name: 'Sliding Doors Systems',
    to: '/slidingdoorssystems',
    icon: <CIcon icon={cilLayers} customClassName="nav-icon" style={{ color: '#2E8B57' }} />,  // sea green
  },

  {
    component: CNavItem,
    name: 'Hardware Management',
    to: '/hardware-management',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" style={{ color: 'orange' }} />,
  },
  {
    component: CNavItem,
    name: 'Tracking Management',
    to: '/tracking',
    icon: <CIcon icon={cilTruck} customClassName="nav-icon" style={{ color: 'teal' }} />,
  },
  {
    component: CNavItem,
    name: 'Order Management',
    to: '/orderManagement',
    icon: <CIcon icon={cilCheckCircle} customClassName="nav-icon" style={{ color: 'darkviolet' }} />,
  },
  {
    component: CNavItem,
    name: 'Estimate Management',
    to: '/estimateManagement',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" style={{ color: '#4169E1' }} />,
  }
]

export default _nav
