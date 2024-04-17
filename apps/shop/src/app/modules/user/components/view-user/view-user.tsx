import { useEffect, useState } from 'react';
import styles from './view-user.module.scss';
import { ActionButton, Column, MaterialTable, deleteUser, useAuthDispatch, useAuthSelector, viewUser } from '@shop-portal/libs';
import AddUser from '../add-user/add-user';
import React from 'react';
import { Close } from '@mui/icons-material';

/* eslint-disable-next-line */
export interface ViewUserProps {}
const columns : Column[] = [
  {
    accessorKey: 'fullName',
    header: 'Full Name',
    enableHiding: false,
  },
  {
    accessorKey: 'userName',
    header: 'Username',
    //id:'age',
    enableHiding: false,
  },
  {
    accessorKey: 'stationName',
    header: 'Station',
    //id:'age',
    enableHiding: false,
  },
  {
    accessorKey: 'location',
    header: 'location',
    //id:'age',
    enableHiding: false,
  },

]
export function ViewUser(props: ViewUserProps) {
  const actionButtons : ActionButton[] = [
    {
      id: 'edit',
      label: 'Edit',
      icon: 'visibility',
      title: 'Edit station',
      action: 'onEdit',
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: 'visibility',
      title: 'Delete station',
      action: 'onDelete',
    },
  ]
const userState =useAuthSelector(state =>state.user.user)
const [dialogStatus,setDialogStatus]=useState(false)
const userDispatch = useAuthDispatch();
  useEffect(() => {
    userDispatch(viewUser());
  },[userDispatch])
  const openDialog = () =>{
    setDialogStatus(true)
  }
  const  onDialogClosed = () =>{
    setDialogStatus(false)
    return null
  }
  const  handleClick = (column:any,data:any) =>{
    const action = column.action
    switch(action){
      case 'onDelete' :
       userDispatch(deleteUser(data.id))
        break
      case 'onEdit' :
        //onEdit(data)
        break
    }
  }
  return (
    <React.Fragment>
      <div className="w-100 p-1 d-flex justify-content-between align-items-center" style={{backgroundColor:'#b3ecff'}}>
    <h5>
      List of registered users
    </h5>
    <span mat-dialog-close>
      <Close/>
    </span>
  </div>
    <MaterialTable 
  actionButtonData={actionButtons} 
  rows={userState} columns={columns} 
  uniqueId={'id'}
  onActionClick={handleClick}
  hasActionButton={true}
  hasSerialNo={true}
  hasCustomButton={true}
  customButtonName={'Create User'}
  customButtonClick={openDialog}
  />
  <AddUser changeStatus={onDialogClosed} status={dialogStatus}/>
  </React.Fragment>
  );
}

export default ViewUser;
