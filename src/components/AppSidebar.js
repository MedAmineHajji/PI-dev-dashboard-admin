import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CNavItem,
  CNavGroup,
} from '@coreui/react'
import { cilUserPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const navig = [
  {
    component: CNavGroup,
    name: 'Validation section',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Expert Users',
        to: '/dashboard/validateExperts',
      },
      {
        component: CNavItem,
        name: 'Companies',
        to: '/dashboard/validateCompanies',
      },
    ],
  },
]

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [users, setUsers] = useState([])
  var numExpertNonValidated = 0
  var numCompNonValidated = 0
  const fetchUsers = async () => {
    const { data } = await axios.get('/dashboard/getAllUsers')
    setUsers(data)
  }
  const verif = () => {
    if (users.Experts) {
      users.Experts.map((exp) => {
        if (exp.validatedAcc_Expert === false) {
          numExpertNonValidated = numExpertNonValidated + 1
        }
      })
      users.Companies.map((comp) => {
        if (comp.validatedAcc_Company === false) {
          numCompNonValidated = numCompNonValidated + 1
        }
      })
    }
  }
  useEffect(() => {
    fetchUsers()
    verif()
    if (numExpertNonValidated !== 0 || numCompNonValidated !== 0) {
      navig[0].badge = {
        color: 'info',
        text: 'NEW',
      }
      navig[0].items[0].badge = {
        color: 'info',
        text: numExpertNonValidated,
      }
      navig[0].items[1].badge = {
        color: 'info',
        text: numCompNonValidated,
      }
    }
  })

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
          <AppSidebarNav items={navig} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
