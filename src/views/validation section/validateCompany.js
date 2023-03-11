import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import {
    CAvatar,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CButton,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
    cibCcMastercard,
    cifUs,
    cilPeople,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'

const ValidateCompInterface = () => {
  
  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
  ]

  //this is where i'll consume API 
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => { // function to get all users and store them users
      const {data} = await axios.get("/dashboard/getListNonVerified");                 // getting the object of all users
      setUsers(data);
  }

  useEffect(() => { 
      fetchUsers();
  });
  const companyUsers = users.Companies; // array of simple Users
  // console.log(companyUsers)
  const navigate = useNavigate(); //funct to navigate to a user profile

  async function blockCompany(id) {
      const req = {
        _id: id,
        reasonBlock: "dynamic/static try of comapny block"
      };
      await axios.post('/dashboard/block/blockCompany', req);
      fetchUsers();
  }


  async function validateCompany(id) {
    const req = {
        _id: id
    };
    await axios.put('/dashboard/validateCompany', req);
    fetchUsers();
  } 

  //

  if(companyUsers){
      return (
          <>
              <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell className="text-center">
                        <CIcon icon={cilPeople} />
                      </CTableHeaderCell>
                      <CTableHeaderCell>Company</CTableHeaderCell>
                      <CTableHeaderCell>address</CTableHeaderCell>
                      <CTableHeaderCell>contact email</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">commercial register</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {companyUsers.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index}>
                          <CTableDataCell className="text-center">
                              <CAvatar size="md" src={tableExample[0].avatar.src} status={tableExample[0].avatar.status} />
                          </CTableDataCell>
                          <CTableDataCell>
                              <div>{item.name_Company}</div>
                              <div className="small text-medium-emphasis">
                              Registered:Still static
                              </div>
                          </CTableDataCell>
                          <CTableDataCell>
                              {item.adress_Company}
                          </CTableDataCell>
                          <CTableDataCell>
                              {item.email_Company}
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                              register commerce
                          </CTableDataCell>
                          <CTableDataCell>
                              <div className='text-center'>
                                  <CButton color="info" variant="outline" onClick={() => { navigate(`/profil?id=${item._id}`)}}>
                                      info
                                  </CButton>
                                  <CButton color="success" variant="outline" onClick={() => { validateCompany(item._id) }}>
                                      validate
                                  </CButton>
                                  <CButton color="danger" variant="outline" onClick={()=>{blockCompany(item._id)}}>                                        
                                      Block
                                  </CButton>
                              </div>
                          </CTableDataCell>
                      </CTableRow>
                      
                    ))}
                  </CTableBody>
                </CTable>
          </>
      )
  }else{
      return (
          <div>
              LOAAAAAAAADIIIIIINGG......
          </div>
      )
  }



}

export default ValidateCompInterface