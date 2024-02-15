import { useEffect, useState } from 'react';
import styles from './view-station.module.scss';
import { MaterialTable, useAuthDispatch, useAuthSelector, viewStation } from '@shop-portal/libs';
import React from 'react';
import Station from '../../pages/station/station';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ViewStationProps{}
interface Column {
  name: string;
  label: string;
  minWidth?: number;
  align?: 'right';
  type?:string;
}

const columns: Column[] = [
  { name: 'id', label: 'Id', type: 'number'},
  { name: 'stationName', label: 'Station Name', type: 'text'},
];

export function ViewStation( props: ViewStationProps) {
  // const station=[
  //   {id:1,stationName:'faki makame'},
  //   {id:1,stationName:'faki makame2'},
  //   {id:1,stationName:'faki makame3'},
  // ]
  const station=useAuthSelector((state) => state.station.station)
  //const [stationState,setStationState] = useState(station)
  const authDispatch=useAuthDispatch()
  // const rows = [
  //   createData('India', 'IN', 1324171354, 3287263),
  //   createData('China', 'CN', 1403500365, 9596961),
  //   createData('Italy', 'IT', 60483973, 301340),
  //   createData('United States', 'US', 327167434, 9833520),
  //   createData('Canada', 'CA', 37602103, 9984670),
  //   createData('Australia', 'AU', 25475400, 7692024),
  //   createData('Germany', 'DE', 83019200, 357578),
  //   createData('Ireland', 'IE', 4857000, 70273),
  //   createData('Mexico', 'MX', 126577691, 1972550),
  //   createData('Japan', 'JP', 126317000, 377973),
  //   createData('France', 'FR', 67022000, 640679),
  //   createData('United Kingdom', 'GB', 67545757, 242495),
  //   createData('Russia', 'RU', 146793744, 17098246),
  //   createData('Nigeria', 'NG', 200962417, 923768),
  //   createData('Brazil', 'BR', 210147125, 8515767),
  // ];
   useEffect(()=>{
   // const data=station
     authDispatch(viewStation())
    
  },[authDispatch])
return (
  <MaterialTable rows={station} columns={columns} uniqueId={'id'}/>
)
}

export default ViewStation;
