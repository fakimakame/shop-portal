import React, { useEffect } from 'react';
import Header from '../../components/header/header';
import SideBar from '../../components/side-bar/side-bar';
import styles from './layout.module.scss';
import { Outlet} from 'react-router-dom';
import axios from 'axios';
import { authToken } from '@shop-portal/libs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* eslint-disable-next-line */

export function Layout(){
  
  useEffect(()=>{
    const token=authToken()
    console.log("this is my token",token);
    if(token){
      console.log("this token block exist")
      axios.defaults.headers.common['Authorization']=`Bearer ${token}`
   }
  },[])
  return (
    
    <React.Fragment>
      <ToastContainer></ToastContainer>
        <Header />
        <SideBar />
        <div id='main' className='main'>
          <Outlet/>
        </div>
    </React.Fragment> 
      
  );
}

export default Layout;
