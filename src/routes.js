import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const FiberGlassEntry = React.lazy(() => import('./views/categoryManagement/doorManagement/FiberGlassEntry'))
const FiberGlassFrench = React.lazy(() => import('./views/categoryManagement/doorManagement/FiberGlassFrench'))
const FrenchWood = React.lazy(() => import('./views/categoryManagement/doorManagement/FrenchWood'))
const VinylSwingingFrench = React.lazy(() => import('./views/categoryManagement/doorManagement/VinylSwingingFrench'))
const VinySlidePatio = React.lazy(() => import('./views/categoryManagement/doorManagement/VinySlidePatio'))
const WoodEntryDoors = React.lazy(() => import('./views/categoryManagement/doorManagement/WoodEntryDoors'))
const Hardware = React.lazy(() => import('./views/categoryManagement/doorManagement/Hardware'))
const OtherDoors = React.lazy(() => import('./views/categoryManagement/doorManagement/OtherDoors'))

const VinylSlidingWindow = React.lazy(() => import('./views/categoryManagement/windowsManagement/VinylSlidingWindow'))
const VinylSlidingWindowXox = React.lazy(() => import('./views/categoryManagement/windowsManagement/VinylSlidingWindowXox'))
const AwningVinylWindow = React.lazy(() => import('./views/categoryManagement/windowsManagement/AwningVinylWindow'))
const SingleHungWindows = React.lazy(() => import('./views/categoryManagement/windowsManagement/SingleHungWindows'))
const DoubleHungWindows = React.lazy(() => import('./views/categoryManagement/windowsManagement/DoubleHungWindows'))
const ChaulkAndTrim = React.lazy(() => import('./views/categoryManagement/windowsManagement/ChaulkAndTrim'))
const GardenWindows = React.lazy(() => import('./views/categoryManagement/windowsManagement/GardenWindows'))
const PictureWindows = React.lazy(() => import('./views/categoryManagement/windowsManagement/PictureWindows'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/fiberglassentry', name: 'FiberGlassEntry', element: FiberGlassEntry },
  { path: '/fiberglassfrench', name: 'FiberGlassEntry', element: FiberGlassFrench },
  { path: '/frenchwooddoors', name: 'FrenchWood', element: FrenchWood },
  { path: '/vinylswingingfrenchdoors', name: 'VinylSwingingFrench', element: VinylSwingingFrench },
  { path: '/vinylslidepatiodoors', name: 'VinySlidePatio', element: VinySlidePatio },
  { path: '/woodentrydoors', name: 'WoodEntryDoors', element: WoodEntryDoors },
  { path: '/hardware', name: 'Hardware', element: Hardware },
  { path: '/otherdoors', name: 'OtherDoors', element: OtherDoors },
  { path: '/vinylslidingwindow', name: 'VinylSlidingWindow', element: VinylSlidingWindow },
  { path: '/vinylslidingwindowxox', name: 'VinylSlidingWindowXox', element: VinylSlidingWindowXox },
  { path: '/awningvinylwindow', name: 'AwningVinylWindow', element: AwningVinylWindow },
  { path: '/singlehungwindow', name: 'SingleHungWindows', element: SingleHungWindows },
  { path: '/doublehungwindow', name: 'DoubleHungWindows', element: DoubleHungWindows },
  { path: '/gardenwindows', name: 'GardenWindows', element: GardenWindows },
  { path: '/caulkandtrim', name: 'ChaulkAndTrim', element: ChaulkAndTrim },
  { path: '/picturewindow', name: 'PictureWindows', element: PictureWindows },
]

export default routes
