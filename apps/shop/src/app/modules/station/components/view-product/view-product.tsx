import { ActionButton, Column, MaterialTable, onDeleteProduct, onViewProduct, useAuthDispatch, useAuthSelector, updateProductState, ImageItem, AppButton } from '@shop-portal/libs';
import styles from './view-product.module.scss';
import { useEffect, useState } from 'react';
import AddProduct from '../add-product/add-product';
import React from 'react';
import AddPurchase from '../add-purchase/add-purchase';
import { useDispatch } from 'react-redux';
import { ImageList, ImageListItem, ListSubheader } from '@mui/material';
import ProductSample from '../product-sample/product-sample';

/* eslint-disable-next-line */
export interface ViewProductProps { }
const columns: Column[] = [
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
  {
    accessorKey: 'quantity',
    header: 'Available Quantity',
    //id:'age',
    enableHiding: false, //disable a feature for this column
  },

]
export function ViewProduct(props: ViewProductProps) {
  const actionButtons: ActionButton[] = [
    {
      id: 'edit',
      label: 'Edit',
      icon: 'visibility',
      title: 'Edit station',
      action: 'onEdit',
    },
    {
      id: 'purchase',
      label: 'Purchase',
      icon: 'visibility',
      title: 'Purchase Product',
      action: 'onPurchase',
    },
    {
      id: 'sample',
      label: 'Sample & Size',
      icon: 'visibility',
      title: 'Sample Product',
      action: 'onSample',
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
  const dispatch = useAuthDispatch()
  const normalDispatch = useDispatch()
  const [dialogStatus, setDialogStatus] = useState(false)
  const [dialogStatusForPurchase, setDialogStatusForPurchase] = useState(false)
  const [existingData, setExistingData] = useState({})
  const [dialogStatusForSample, setDialogStatusForSample] = useState(false)
  const handleClick = (column: any, data: any) => {
    console.log("this is my data", column, data)
    const action = column.action
    switch (action) {
      case 'onDelete':
        onDelete(data)
        break
      case 'onEdit':
        onEdit(data)
        break
      case 'onPurchase':
        onPurchase(data)
        break
      case 'onSample':
        onSampleOpen(data)
        break
    }
  }
  const onSampleOpen = (data: any) => {
    setExistingData(data)
    setDialogStatusForSample(true)
    console.log("this sample event work fine")
  }
  const onPurchase = (data: any) => {
    setExistingData(data)
    openDialogForPurchase()
  }
  const onDelete = (data: any) => {
    dispatch(onDeleteProduct(data))
  }
  const onEdit = (data: any) => {
    setExistingData(data)
    openDialog()
  }
  useEffect(() => {
    dispatch(onViewProduct())
  }, [dispatch])
  const openDialog = () => {
    setDialogStatus(true)
  }
  const openDialogForPurchase = () => {
    setDialogStatusForPurchase(true)
  }
  const onDialogClosed = (data: any) => {
    setExistingData({})
    setDialogStatus(false)
    setDialogStatusForSample(false)
    if (data)
      if (data.productId)
        normalDispatch(updateProductState(data));
    setDialogStatusForPurchase(false)
    return null
  }
  return (
    <React.Fragment>
      <ImageList cols={1} sx={{ width: '100%', height: "100%" }} >
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div"><AppButton status={false} handleClick={openDialog} name='New Product' /></ListSubheader>
        </ImageListItem>
        <div className='row'>
          {product.map((item: any) => (
            <ImageItem
              img={`data:image/jpeg;base64,${item.image}`}
              title={`${item.productCode} ${item.productName}`}
              subtitle={`${item.quantity}`}
              id={item.id}
              data={item}
              quantity={item.quantity}
              actionButtonData={actionButtons}
              onActionClick={handleClick}
            />
          ))}
        </div>
      </ImageList>
      <AddProduct changeStatus={onDialogClosed} data={existingData} status={dialogStatus} />
      <AddPurchase changeStatus={onDialogClosed} data={existingData} status={dialogStatusForPurchase} />
      <ProductSample data={existingData} changeStatus={onDialogClosed} status={dialogStatusForSample} />
      {/* <MaterialTable 
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
    <AddPurchase changeStatus={onDialogClosed} data={existingData} status={dialogStatusForPurchase}/> */}
    </React.Fragment>
  );
}

export default ViewProduct;
