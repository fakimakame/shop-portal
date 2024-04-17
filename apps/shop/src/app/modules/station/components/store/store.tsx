import { useFormik } from 'formik';
import styles from './store.module.scss';
import * as Yup from 'yup'
import { ActionButton, Column, InputSelect, MaterialTable, Toast, clearStoreState, useAuthDispatch, useAuthSelector, viewStation, viewStore } from '@shop-portal/libs';
import { useEffect, useState } from 'react';
import AddStore from '../add-store/add-store';
// eslint-disable-next-line @nx/enforce-module-boundaries
//import storeReducer from '../../../../../../../../libs/src/lib/shared/store/slice/store.slice'
/* eslint-disable-next-line */
export interface StoreProps {}
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
  {
    accessorKey: 'price',
    header: 'Price',
    //id:'age',
    enableHiding: false, //disable a feature for this column
  },
  {
    accessorKey: 'availableQuantity',
    header: 'Available Qty',
    //id:'age',
    enableHiding: false, //disable a feature for this column
  },
  {
    accessorKey: 'stationName',
    header: 'Station Name',
    //id:'age',
    enableHiding: false, //disable a feature for this column
  },

]

const actionButtons : ActionButton[] = [
  {
    id: 'delete',
    label: 'Delete',
    icon: 'visibility',
    title: 'Delete station',
    action: 'onDelete',
  },
]
export function Store(props: StoreProps) {

const stationStore = useAuthSelector(state => state.station)
const dispatch = useAuthDispatch()
const storeStore = useAuthSelector(state => state.store)
const [stationId,setStationId] = useState(0)
const [dialogStatus,setDialogStatus]=useState(false)
useEffect(() => {
  if(stationStore.station.length === 0){
    dispatch(viewStation())
  }
  // if(storeStore.store.length === 0) {
  //   dispatch(viewStore())
  // }
  return () => {
    // Component unmount logic
    clearData()

    console.log("Component unmounted");
}

},[])
  const stationInitialValue = {
    stationId:""
  }
  const stationSchema = Yup.object({
    stationId:Yup.string().required()
  })
  const stationForm = useFormik({
    initialValues:stationInitialValue,
    onSubmit(){
      //console.log("this is work")
    },
    
  })
  const clearData = ()=>{
    stationForm.resetForm()
    setStationId(0)
    dispatch(clearStoreState())
  }
   const handleChange = (value:number) =>{
    //console.log("this is my value",value)
    setStationId(value)
    dispatch(viewStore(value))
   }
  const handleClick = (column:any,data:any) =>{
    const action = column.action
    switch(action){
      case 'onDelete' :
        //onDelete(data)
        break
  }
}
const openDialog = () =>{
  if(stationId !== 0){
  setDialogStatus(true)
  }
  else {
    Toast('Please select station before clicking Store button','info')
  }
}
const  onDialogClosed = () =>{
  //setStationId(0)
  setDialogStatus(false)
  return null
}
  return (
    <div className={styles['container']}>
      <form className='mb-1' onSubmit={stationForm.handleSubmit}>
        <div className='row'>
          <div className='col-md-5 col-sm-12'>
          <InputSelect name='stationId'
                selectionValue={stationStore.station}
                value={stationForm.values.stationId}
                errors={stationForm.errors.stationId}
                  handleChange={
                    (e:any) => handleChange(e.target.value)}
                  handleBlur={stationForm.handleBlur}
                label='Station'/>
          </div>
        </div>
      </form>
      <div className='row mt-2'>
        <div className='col-12'>
        <MaterialTable 
          actionButtonData={actionButtons} 
          rows={storeStore.store} columns={columns} 
          uniqueId={'id'}
          onActionClick={handleClick}
          hasActionButton={true}
          hasSerialNo={true}
          hasCustomButton={true}
          customButtonName={'Add Store'}
          customButtonClick={openDialog}
    />
    <AddStore changeStatus={onDialogClosed} data={stationId} status={dialogStatus}/>
        </div>
      </div>
    </div>
  );
}

export default Store;
