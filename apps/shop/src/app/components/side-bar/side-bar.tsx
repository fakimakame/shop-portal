
import { Component } from 'react';
import { BrowserRouter, Link, NavLink } from 'react-router-dom';

/* eslint-disable-next-line */
export interface SidebarProps {}

export class Sidebar extends Component<SidebarProps> {
  override render() {
    return (
      <aside id="sidebar" className="sidebar">
    <ul className="sidebar-nav" id="sidebar-nav">
       <li className="nav-item"> <Link className="nav-link collapsed " to=""> <i className="bi bi-grid"></i> <span>Dashboard</span> </Link></li>
       {/* <li className="nav-item"> <NavLink to="station" className="nav-link collapsed">Station</NavLink></li> */}
       <li className="nav-item"> <Link to={`user`} className="nav-link collapsed"> <i className="bi bi-card-list"></i> <span>Users</span> </Link></li>
       <li className="nav-item"> <Link to={`station`} className="nav-link collapsed"> <i className="bi bi-card-list"></i> <span>Station</span> </Link></li>
       <li className="nav-item"> <Link to={`category`} className="nav-link collapsed"> <i className="bi bi-card-list"></i> <span>Category & Size</span> </Link></li>
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
             <li> <Link to={`purchase`} className="nav-link collapsed"> <i className="bi bi-circle"></i><span>Purchases</span> </Link></li>
          </ul>
       </li>
       <li className="nav-heading">Sales</li>
       <li><Link to={`shift-assigment`} className="nav-link collapsed"> <i className="bi bi-person"></i> <span>Shift Assigment</span> </Link></li>
       <li><Link to={`open-shift`} className="nav-link collapsed"> <i className="bi bi-question-circle"></i> <span>Open Shift</span> </Link></li>
       <li className="nav-item"> <a className="nav-link collapsed" href="/pages-contact"> <i className="bi bi-envelope"></i> <span>Shift History</span> </a></li>
    </ul>
 </aside>
    );
  }
}

export default Sidebar;
