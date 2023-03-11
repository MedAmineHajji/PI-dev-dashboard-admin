import React, { useState, useEffect } from 'react'
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
    CButton
  } from '@coreui/react';

import CIcon from '@coreui/icons-react';
import {
  cilPeople,
} from '@coreui/icons';
import avatar1 from 'src/assets/images/avatars/1.jpg'








const ValidateExpertInterface = () => {
  
  //this is where i'll consume API 
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => { // function to get all users and store them users
      const {data} = await axios.get("/dashboard/getListNonVerified");                 // getting the object of all users
      setUsers(data);
  }

  useEffect(() => { 
      fetchUsers();
  });
  const expertUsers = users.Experts; // array of simple Users
  // console.log(expertUsers)
  const navigate = useNavigate(); //funct to navigate to a user profile

  async function blockUser(id) {
      const req = {
        _id: id,
        reasonBlock: "dynamic/static try user/Expert block"
      };
      await axios.post('/dashboard/block/blockUser', req);
      fetchUsers();
  }

  async function validateExpert(id) {
    const req = {
        _id: id
    };
    await axios.put('/dashboard/validateExpert', req);
    fetchUsers();
  }

  //

  const tableExample = [
      {
        avatar: { src: avatar1, status: 'success' },
        user: {
          name: 'Yiorgos Avraamu',
          new: true,
          registered: 'Jan 1, 2021',
        },
        email: "dja@gmail.com",
      },
  ];

  if(expertUsers){
      return (
          <>
          <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                  <CTableRow>
                      <CTableHeaderCell className="text-center">
                          <CIcon icon={cilPeople} />
                      </CTableHeaderCell>
                      <CTableHeaderCell>User</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">Email</CTableHeaderCell>
                      <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
                  </CTableRow>
              </CTableHead>


              <CTableBody>
                  {expertUsers.map((item, index) => (
                  <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center"> {/* photo de profil de chaque user still statique*/}
                          <CAvatar size="md" src={tableExample[0].avatar.src} status={tableExample[0].avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                          <div>{item.fullName_Expert}</div>
                          <div className="small text-medium-emphasis">
                              Registered: date 
                          </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                          {item.email_Expert}
                      </CTableDataCell>
                      <CTableDataCell>
                          <div className='text-center'>
                          <CButton color="info" variant="outline" onClick={() => { navigate(`/profil?id=${item._id}`)}}>
                              info
                          </CButton>
                          <CButton color="success" variant="outline" onClick={() => { validateExpert(item._id) }}>
                              validate
                          </CButton>
                          <CButton color="danger" variant="outline" onClick={()=>blockUser(item._id)}>Block</CButton>
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
              LOAAAAADIIIIIING........
          </div>
      )
  }




}

export default ValidateExpertInterface
