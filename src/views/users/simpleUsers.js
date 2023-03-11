import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import {
    CAvatar,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CButton
} from '@coreui/react'
import {
    cilPeople,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar1 from 'src/assets/images/avatars/1.jpg'

const SimpleUserInterface = () => {

    //this is where i'll consume API 
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => { // function to get all users and store them users
        const {data} = await axios.get("/dashboard/getAllUsers");                 // getting the object of all users
        setUsers(data);
    }

    useEffect(() => { 
        fetchUsers();
    });
    const simpleUsers = users.Users; // array of simple Users
    // console.log(simpleUsers)
    const navigate = useNavigate(); //funct to navigate to a user profile

    async function blockUser(id) {
        const req = {
          _id: id,
          reasonBlock: "dynamic/static try user/Expert block"
        };
        await axios.post('/dashboard/block/blockUser', req);
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

    if(simpleUsers){
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
                    {simpleUsers.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell className="text-center"> {/* photo de profil de chaque user still statique*/}
                            <CAvatar size="md" src={tableExample[0].avatar.src} status={tableExample[0].avatar.status} />
                        </CTableDataCell>
                        <CTableDataCell>
                            <div>{item.fullName_User}</div>
                            <div className="small text-medium-emphasis">
                                Registered: date 
                            </div>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                            {item.email_User}
                        </CTableDataCell>
                        <CTableDataCell>
                            <div className='text-center'>
                            <CButton color="info" onClick={() => { navigate(`/profil?id=${item._id}`)}}>
                                View Profile
                            </CButton>
                            <CButton color="danger" onClick={()=>blockUser(item._id)}>Block User</CButton>
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

export default SimpleUserInterface
