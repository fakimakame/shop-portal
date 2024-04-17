import { useEffect,} from 'react';
import styles from './view-station.module.scss';
import { MaterialTable, useAuthDispatch, useAuthSelector, viewStation, ActionButton, deleteStation, Column, onView } from '@shop-portal/libs';
import { useDispatch } from 'react-redux';



// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ViewStationProps{}

const columns : Column[] = [
  // {
  //   accessorKey: 'id', //simple recommended way to define a column
  //   header: 'id',
  //  // muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
  //   enableHiding: false, //disable a feature for this column
  // },
  {
    //accessorFn: (originalRow:any) => parseInt(originalRow.age),
    accessorKey: 'stationName',
    header: 'Station Name',
    //id:'age',
    enableHiding: false, //disable a feature for this column
  },
  {
    accessorKey: 'location',
    header: 'Location',
    //id:'age',
    enableHiding: false, //disable a feature for this column
  }

]



export function ViewStation( props: ViewStationProps) {
  const dispatch= useDispatch()
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
  const station=useAuthSelector((state) => state.station.station)
  const status=useAuthSelector((state) => state.station.isLoading)
  //const [stationState,setStationState] = useState(station)
  const authDispatch=useAuthDispatch()
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
    authDispatch(deleteStation(data))
    //console.log('deleted is clicked',data)

  }
  const onEdit = (data:any) =>{
    console.log('edited is clicked',data)
  }
   useEffect(()=>{
     authDispatch(viewStation())
  },[authDispatch])
return (
  <MaterialTable 
  actionButtonData={actionButtons} 
  rows={station} columns={columns} 
  uniqueId={'stationName'}
  onActionClick={handleClick}
  hasActionButton={true}
  hasSerialNo={true}
  />
)
}

export default ViewStation;
