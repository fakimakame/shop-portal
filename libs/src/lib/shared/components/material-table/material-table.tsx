/* eslint-disable react/jsx-pascal-case */
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_ActionMenuItem, //if using TypeScript (optional, but recommended)
} from 'material-react-table';
import { ActionButton, Column } from '../../model/action-button';
import { format } from 'path';
import { Box, Button, IconButton, MenuItem, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Delete, Edit } from '@mui/icons-material';
import ActionMenu from '../action-button/action-button';
import AppButton from '../app-button/app-button';

//If using TypeScript, define the shape of your data (optional, but recommended)
interface Person {
  name: string;
  age: number;
  amount:number;
}

//mock data - strongly typed if you are using TypeScript (optional, but recommended)
// const data: Person[] = [
//   {
//     name: 'John',
//     age: 30,
//     amount:6000,
//   },
//   {
//     name: 'Sara',
//     age: 25,
//     amount:6000,
//   },
// ];

export interface MaterialTableProps {
  rows: any[];
  columns: Column[]
  uniqueId?: any
  actionButtonData?:ActionButton[],
  onActionClick?:any,
  hasActionButton?:boolean,
  hasSerialNo?:boolean
  customButtonName?:string
  hasCustomButton?:boolean //used for checking if table require aditional button
  customButtonClick?:any //it used for trigger action when create button clicked
}
export function MaterialTable(props:MaterialTableProps) {
  const hasCustomButton = true;
  const data = props.rows
  const key=props.uniqueId;
  const handleClick = (data:any,tableData:any) =>{
        props.onActionClick(data,tableData)
      }
  //column definitions - strongly typed if you are using TypeScript (optional, but recommended)
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => props.columns,
    [props.columns],
  );
    const openDialog = () =>{
      props.customButtonClick()
    }
  //pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowSelection: false, //enable some features
    enableColumnOrdering: true, //enable a feature for all columns
    enableGlobalFilter: false,
    enableRowActions: true,
    renderRowActionMenuItems: ({ row }) => [
      <MenuItem key="edit" onClick={() => console.info('Edit')}>
        Edit
      </MenuItem>,
      <MenuItem key="delete" onClick={() => console.info('Delete')}>
        Delete
      </MenuItem>,
    ],
  });
const actionFormat={
  'mrt-row-actions':{
      //'header': 'Action', //change header text
     // 'size': 100, //make actions column wider
  }
}
  //note: you can also pass table options as props directly to <MaterialReactTable /> instead of using useMaterialReactTable
  //but the useMaterialReactTable hook will be the most recommended way to define table options
  return  (<MaterialReactTable
  columns={columns}
  data={data}
  enableRowActions={props.hasActionButton}
  enableRowNumbers={props.hasSerialNo}
  rowNumberDisplayMode= {'original'}
  displayColumnDefOptions = {actionFormat}
  positionActionsColumn={'last'}
  renderTopToolbarCustomActions={({ table }) =>{
    if(props.hasCustomButton) {
    return <AppButton handleClick={openDialog} status={false} name={props.customButtonName}/>
    }
    else {
      return null
    }
  }}
  renderRowActionMenuItems={({ row, table }) => [
    <ActionMenu id={row.original[key]} onClickAction={handleClick} buttonData={props.actionButtonData} tableData={row.original} />
  ]}
/>
);
}




//for normal working table
// import styles from './material-table.module.scss';
// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import { ActionButton } from '../../model/action-button';
// import {  ActionMenu } from '../action-button/action-button'
// /* eslint-disable-next-line */
// export interface MaterialTableProps {
//   rows: unknown[];
//   columns: unknown[]
//   uniqueId?: any
//   actionButtonData?:ActionButton[],
//   onActionClick?:any;
//   hasActionButton?:boolean

// }

// // eslint-disable-next-line no-empty-pattern
// export function MaterialTable(props:MaterialTableProps) {

// const key=props.uniqueId;
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//    const handleClick = (data:any,tableData:any) =>{
//     props.onActionClick(data,tableData)
//   }

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {props.columns.map((column:any) => (
//                 <TableCell
//                   key={column.name}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))
//               }
//               { props.hasActionButton === true &&
//               <TableCell>Actions</TableCell>
//               }
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {props.rows
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row:any) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row[key]}>
//                     {props.columns.map((column:any) => {
//                       const value = row[column.name];
//                       return (
//                         <TableCell key={column.name} align={column.align}>
//                           {column.format && typeof value === 'number'
//                             ? column.format(value)
//                             : value}
//                         </TableCell>
//                       );
//                     })}
//                     { props.hasActionButton === true &&
//                     <TableCell>
//                       <ActionMenu id={row[key]} onClickAction={handleClick} buttonData={props.actionButtonData} tableData={row} />
//                     </TableCell>
//                     } 
//                   </TableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={props.rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }
// export default MaterialTable;