import React, { useEffect } from 'react';
import Header from '../../components/header/header';
import SideBar from '../../components/side-bar/side-bar';
import styles from './layout.module.scss';
import { render } from 'react-dom';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { authToken } from '@shop-portal/libs';

/* eslint-disable-next-line */

export function Layout(){
  //useCheckAuthLoader()
  //useLogin()
  useEffect(()=>{
    const token=authToken()
    if(token){
      axios.defaults.headers.common['Authorization']=`Bearer ${token}`
   }
  },[])
  return (
    
    <React.Fragment>
        <Header />
        <SideBar />
        <div id='main' className='main'>
          <Outlet/>
        </div>
    </React.Fragment> 
      
  );
}

export default Layout;
