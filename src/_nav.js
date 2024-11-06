import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilListRich,
  cilWindow,
  cilDoor,
  cilSettings,
  cilTruck,
  cilBuilding,
  cilCheckCircle,
  cilInfo
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
    name: 'Door Management',
    to: '/doormanagement',
    icon: <CIcon icon={cilDoor} customClassName="nav-icon" style={{ color: 'purple' }} />,
  },
  {
    component: CNavItem,
    name: 'Windows Management',
    to: '/windowsmanagement',
    icon: <CIcon icon={cilWindow} customClassName="nav-icon" style={{ color: 'Coral' }} />,
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
    icon: <CIcon icon={cilInfo} customClassName="nav-icon" style={{ color: '#4169E1' }} />,
  },

  // {
  //   component: CNavItem,
  //   name: 'New Collection Management',
  //   to: '/newcollection',
  //   icon: <CIcon icon={cilBuilding} customClassName="nav-icon" style={{ color: 'orange' }} />,
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Category Management',
  //   icon: <CIcon icon={cilList} customClassName="nav-icon" style={{ color: 'purple' }} />,
  //   items: [
  //     {
  //       component: CNavGroup,
  //       name: 'Doors',
  //       icon: <CIcon icon={cilDoor} customClassName="nav-icon" style={{ color: 'brown' }} />,
  //       items: [
  //         { component: CNavItem, name: 'Fiber Glass Entry Doors', to: '/fiberglassentry' },
  //         { component: CNavItem, name: 'Fiber Glass French Doors', to: '/fiberglassfrench' },
  //         { component: CNavItem, name: 'French Wood Doors', to: '/frenchwooddoors' },
  //         { component: CNavItem, name: 'Vinyl Swinging French Doors', to: '/vinylswingingfrenchdoors' },
  //         { component: CNavItem, name: 'Vinyl Slide Patio Doors', to: '/vinylslidepatiodoors' },
  //         { component: CNavItem, name: 'Wood Entry Doors', to: '/woodentrydoors' },
  //         { component: CNavItem, name: 'Hardware', to: '/hardware' },
  //         { component: CNavItem, name: 'Other Doors', to: '/otherdoors' },
  //       ],
  //     },
  //     {
  //       component: CNavGroup,
  //       name: 'Windows',
  //       icon: <CIcon icon={cilWindow} customClassName="nav-icon" style={{ color: 'green' }} />,
  //       items: [
  //         { component: CNavItem, name: 'Vinyl Sliding Window', to: '/vinylslidingwindow' },
  //         { component: CNavItem, name: 'Vinyl Sliding Window Xox', to: '/vinylslidingwindowxox' },
  //         { component: CNavItem, name: 'Awning Vinyl Window', to: '/awningvinylwindow' },
  //         { component: CNavItem, name: 'Single Hung Window', to: '/singlehungwindow' },
  //         { component: CNavItem, name: 'Double Hung Window', to: '/doublehungwindow' },
  //         { component: CNavItem, name: 'Picture Window', to: '/picturewindow' },
  //         { component: CNavItem, name: 'Garden Windows', to: '/gardenwindows' },
  //         { component: CNavItem, name: 'Caulk And Trim', to: '/caulkandtrim' },
  //       ],
  //     },
  //   ],
  // },
]

export default _nav
