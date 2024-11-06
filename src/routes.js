import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const HardwareManagement = React.lazy(() => import('./views/hardwareManagement/HardwareManagement'))
const TrackingManagement = React.lazy(() => import('./views/trackingManagement/TrackingManagement'))
const CategoryManagement = React.lazy(() => import('./views/categoryManagement/CategoryManagement'))
const DoorManagement = React.lazy(() => import('./views/doorManagement/DoorManagement'))
const WindowsManagement = React.lazy(() => import('./views/windowsManagement/WindowsManagement'))
const OrderManagement = React.lazy(() => import('./views/orderManagement/OrderManagement'))
const EstimateManagement = React.lazy(() => import('./views/estimateManagement/EstimateManagement'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/categorymanagement', name: 'CategoryManagement', element: CategoryManagement },
  { path: '/hardware-management', name: 'HardwareManagement', element: HardwareManagement },
  { path: '/tracking', name: 'TrackingManagement', element: TrackingManagement },
  { path: '/doormanagement', name: 'DoorManagement', element: DoorManagement },
  { path: '/windowsmanagement', name: 'WindowsManagement', element: WindowsManagement },
  { path: '/orderManagement', name: 'OrderManagement', element: OrderManagement },
  { path: '/estimateManagement', name: 'EstimateManagement', element: EstimateManagement },
]

export default routes
