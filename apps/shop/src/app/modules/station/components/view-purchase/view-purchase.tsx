import { useEffect } from 'react';
import styles from './view-purchase.module.scss';
import { Column, MaterialTable, useAuthDispatch, useAuthSelector, viewPurchase } from '@shop-portal/libs';
import { Box } from '@mui/material';

/* eslint-disable-next-line */
export interface ViewPurchaseProps {}
const columns :Column[] = [
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
    header: 'Quantity',
    Cell: ({ cell }:any) => (cell.getValue().toLocaleString()),// this is for format number
    enableHiding: false, //disable a feature for this column
  },
  {
    accessorKey: 'buyingPrice',
    header: 'Buying Price',
    enableHiding: false, //disable a feature for this column
    //Cell: ({ cell }:any) => (cell.getValue().toLocaleString()),// this is for format number
    Cell: ({ cell }:any) => (cell.getValue().toLocaleString?.('en-US', {
      style: 'currency',
      currency: 'Tsh',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })),

  },
  {
    accessorKey: 'buyingDate',
    accessorFn: (row:any) => new Date(row.buyingDate), //convert to Date for sorting and filtering
    header: 'Purchasing Date',
    Cell: ({ cell }:any) => (cell.getValue().toLocaleDateString()),
    enableHiding: false, //disable a feature for this column
  },

]
export function ViewPurchase(props: ViewPurchaseProps) {
  const purchaseStore = useAuthSelector(state => state.purchase)
  const dispatch = useAuthDispatch()
  useEffect(() =>{
    dispatch(viewPurchase())
  },[])
  return (
    <MaterialTable 
    //actionButtonData={actionButtons} 
    rows={purchaseStore.purchase} columns={columns} 
    uniqueId={'productCode'}
    //onActionClick={handleClick}
    hasActionButton={false}
    hasSerialNo={true}
    customButtonName={'New Product'}
    />
  );
}

export default ViewPurchase;
