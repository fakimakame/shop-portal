
import { Component } from 'react';
import { BrowserRouter, Link, NavLink } from 'react-router-dom';

/* eslint-disable-next-line */
export interface SidebarProps {}

export class Sidebar extends Component<SidebarProps> {
  override render() {
    return (
      <aside id="sidebar" className="sidebar">
    <ul className="sidebar-nav" id="sidebar-nav">
       <li className="nav-item"> <Link className="nav-link " to=""> <i className="bi bi-grid"></i> <span>Dashboard</span> </Link></li>
       {/* <li className="nav-item"> <NavLink to="station" className="nav-link collapsed">Station</NavLink></li> */}
       <li className="nav-item"> <Link to={`user`} className="nav-link collapsed"> <i className="bi bi-card-list"></i> <span>Users</span> </Link></li>
       <li className="nav-item"> <Link to={`station`} className="nav-link collapsed"> <i className="bi bi-card-list"></i> <span>Station</span> </Link></li>
       {/* <li className="nav-item"> <Link to={`product`} className="nav-link collapsed"> <i className="bi bi-card-list"></i> <span>Product</span> </Link></li> */}
       {/* <li className="nav-item">
          <a className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#"> <i className="bi bi-journal-text"></i><span>Forms</span><i className="bi bi-chevron-down ms-auto"></i> </a>
          <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
             <li> <a href="/form-elements"> <i className="bi bi-circle"></i><span>Form Elements</span> </a></li>
             <li> <a href="/form-layouts"> <i className="bi bi-circle"></i><span>Form Layouts</span> </a></li>
             <li> <a href="/form-editors"> <i className="bi bi-circle"></i><span>Form Editors</span> </a></li>
          </ul>
       </li> */}
       <li className="nav-item">
          <a className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="##"> <i className="bi bi-layout-text-window-reverse"></i><span>Product</span><i className="bi bi-chevron-down ms-auto"></i> </a>
          <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
             <li> <Link to={`product`} className="nav-link collapsed"><i className="bi bi-circle"></i><span>Items</span> </Link></li>
             <li> <Link to={`store`} className="nav-link collapsed"> <i className="bi bi-circle"></i><span>Store</span> </Link></li>
          </ul>
       </li>
       <li className="nav-item">
          <a className="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse" href="##"> <i className="bi bi-bar-chart"></i><span>Charts</span><i className="bi bi-chevron-down ms-auto"></i> </a>
          <ul id="charts-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
             <li> <a href="/charts-chartjs"> <i className="bi bi-circle"></i><span>Chart.js</span> </a></li>
             <li> <a href="/charts-apexcharts"> <i className="bi bi-circle"></i><span>ApexCharts</span> </a></li>
          </ul>
       </li>
       <li className="nav-item">
          <a className="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" href="#"> <i className="bi bi-gem"></i><span>Icons</span><i className="bi bi-chevron-down ms-auto"></i> </a>
          <ul id="icons-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
             <li> <a href="/icons-bootstrap"> <i className="bi bi-circle"></i><span>Bootstrap Icons</span> </a></li>
             <li> <a href="/icons-remix"> <i className="bi bi-circle"></i><span>Remix Icons</span> </a></li>
             <li> <a href="/icons-boxicons"> <i className="bi bi-circle"></i><span>Boxicons</span> </a></li>
          </ul>
       </li>
       <li className="nav-heading">Pages</li>
       <li className="nav-item"> <a className="nav-link collapsed" href="/user-profile"> <i className="bi bi-person"></i> <span>Profile</span> </a></li>
       <li className="nav-item"> <a className="nav-link collapsed" href="/pages-faq"> <i className="bi bi-question-circle"></i> <span>F.A.Q</span> </a></li>
       <li className="nav-item"> <a className="nav-link collapsed" href="/pages-contact"> <i className="bi bi-envelope"></i> <span>Contact</span> </a></li>
       <li className="nav-item"> <a className="nav-link collapsed" href="/pages-register"> <i className="bi bi-card-list"></i> <span>Register</span> </a></li>
       <li className="nav-item"> <a className="nav-link collapsed" href="/pages-login"> <i className="bi bi-box-arrow-in-right"></i> <span>Login</span> </a></li>
       <li className="nav-item"> <a className="nav-link collapsed" href="/pages-error404"> <i className="bi bi-dash-circle"></i> <span>Error 404</span> </a></li>
       <li className="nav-item"> <a className="nav-link collapsed" href="/pages-blank"> <i className="bi bi-file-earmark"></i> <span>Blank</span> </a></li>
    </ul>
 </aside>
    );
  }
}

export default Sidebar;
