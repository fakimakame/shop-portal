import styles from './open-shift.module.scss';
import { Close } from '@mui/icons-material';
import { useAuthSelector,useAuthDispatch, MaterialTable, ActionButton, Column,viewShiftToUser } from '@shop-portal/libs';
import { useEffect, useState } from 'react';
/* eslint-disable-next-line */
export interface OpenShiftProps {}
const columns : Column[] = [
  {
    accessorKey: 'stationName',
    header: 'Station',
    //id:'age',
    enableHiding: false, //disable a feature for this column
  },
  {
    accessorKey: 'openerName',
    header: 'Opener Name',
    //id:'age',
    enableHiding: false, //disable a feature for this column
  },
  {
    accessorKey: 'operatorName',
    header: 'Operator Name',
    //id:'age',
    enableHiding: false, //disable a feature for this column
  },
  {
    accessorKey: 'shiftDate',
    accessorFn: (row:any) => new Date(row.shiftDate), //convert to Date for sorting and filtering
    header: 'Shift Date',
    Cell: ({ cell }:any) => (cell.getValue().toLocaleDateString()),
    enableHiding: false, //disable a feature for this column
  },
  {
    accessorKey: 'openingTime',
    header: 'openingTime',
    //id:'age',
    enableHiding: false, //disable a feature for this column
  },
]
export function OpenShift(props: OpenShiftProps) {
  const actionButtons : ActionButton[] = [
    {
      id: 'view',
      label: 'View',
      icon: 'visibility',
      title: 'View',
      action: 'onView',
    }
  ]
  const shift = useAuthSelector(state => state.shift)
  const dispatch = useAuthDispatch()
  const [newShift,setNewShift] = useState([])
  useEffect(()=>{
    let obj:any
    const userSession= sessionStorage.getItem('userInfo')
    if(userSession !== null && userSession !== undefined)
    obj = JSON.parse(userSession);
    if(shift.shift.length > 0){
      setNewShift(shift.shift.filter((element:any) => element.operator === obj.id))
    }
    else{
      dispatch(viewShiftToUser({userId:obj.id,status:'opened'}))
    }
    
  },[shift.shift,dispatch])
  const handleClick = (column:any,data:any) =>{
  const action = column.action
  switch(action){
    case 'onView' :
      //onDelete(data)
      break
  }
} 
  
  return (
    <>
    <div className="w-100 p-1  d-flex justify-content-between align-items-center" style={{backgroundColor:'#b3ecff'}}>
    <h5>
      Your Shift
    </h5>
    <span mat-dialog-close>
      <Close/>
    </span>
  </div>
  <MaterialTable 
    actionButtonData={actionButtons} 
    rows={newShift} columns={columns} 
    uniqueId={'shiftId'}
    isLoading={shift.isLoading}
    onActionClick={handleClick}
    hasActionButton={true}
    hasSerialNo={true}
    hasCustomButton={false}
    />
  </>
  );
}

export default OpenShift;
