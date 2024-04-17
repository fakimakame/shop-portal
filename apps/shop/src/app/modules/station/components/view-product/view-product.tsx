import { ActionButton, Column, MaterialTable, onDeleteProduct, onViewProduct, useAuthDispatch, useAuthSelector } from '@shop-portal/libs';
import styles from './view-product.module.scss';
import { useEffect, useState } from 'react';
import AddProduct from '../add-product/add-product';
import React from 'react';

/* eslint-disable-next-line */
export interface ViewProductProps {}
const columns : Column[] = [
  {
    accessorKey: 'productCode',
    header: 'Product Code',
    //id:'age',
    enableHiding: false, //disable a feature for this column
  },
  {
    accessorKey: 'productName',
    header: 'Product Name',
    //id:'age',
    enableHiding: false, //disable a feature for this column
  },
  {
    accessorKey: 'specification',
    header: 'Specification',
    //id:'age',
    enableHiding: false, //disable a feature for this column
  },

]
export function ViewProduct(props: ViewProductProps) {
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
  const product = useAuthSelector((state) => state.product.product);
  const dispatch =useAuthDispatch()
  const [dialogStatus,setDialogStatus]=useState(false)
  const [existingData,setExistingData] =useState({})
  const handleClick = (column:any,data:any) =>{
    const action = column.action
    switch(action){
      case 'onDelete' :
        onDelete(data)
        break
      case 'onEdit' :
        onEdit(data)
        break
    }
  }
  const onDelete = (data:any) =>{
    dispatch(onDeleteProduct(data))
  }
  const onEdit = (data:any) =>{
    setExistingData(data)
    openDialog()
  }
  useEffect(() =>{
    dispatch(onViewProduct())
  },[dispatch])
  const openDialog = () =>{
    setDialogStatus(true)
  }
  const  onDialogClosed = () =>{
    setExistingData({})
    setDialogStatus(false)
    return null
  }
  return (
    <React.Fragment>
    <MaterialTable 
    actionButtonData={actionButtons} 
    rows={product} columns={columns} 
    uniqueId={'productCode'}
    onActionClick={handleClick}
    hasActionButton={true}
    hasSerialNo={true}
    hasCustomButton={true}
    customButtonName={'New Product'}
    customButtonClick={openDialog}
    />
    <AddProduct changeStatus={onDialogClosed} data={existingData} status={dialogStatus}/>
    </React.Fragment>
  );
}

export default ViewProduct;
