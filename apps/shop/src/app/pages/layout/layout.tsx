import React from 'react';
import Header from '../../components/header/header';
import SideBar from '../../components/side-bar/side-bar';
import styles from './layout.module.scss';
import Footer from '../../components/footer/footer';

/* eslint-disable-next-line */
export interface LayoutProps {}

export function Layout(props: LayoutProps) {
  return (
    // <div className={styles['container']}>
    //   <h1>Welcome to Layout!</h1>
    // </div>
    <React.Fragment>
        <Header />
        <SideBar />
        <div id='main' className='main'>
          <h3>hello this is work</h3>
        </div>
    </React.Fragment>
      
  );
}

export default Layout;
