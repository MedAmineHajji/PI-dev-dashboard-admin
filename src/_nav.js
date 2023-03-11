import { React } from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilUser } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavGroup,
    name: 'Users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Simple Users',
        to: '/dashboard/simpleUsers',
        badge: {
          color: 'success',
        },
      },
      {
        component: CNavItem,
        name: 'Expert Users',
        to: '/dashboard/experts',
      },
      {
        component: CNavItem,
        name: 'Companies',
        to: '/dashboard/companies',
      },
    ],
  },
]

export default _nav
