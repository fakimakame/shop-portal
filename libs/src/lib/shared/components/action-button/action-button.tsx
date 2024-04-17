
import styles from './action-button.module.scss';
import React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { ActionButton } from '../../model/action-button';

/* eslint-disable-next-line */
export interface ActionButtonProps {
  id:any;
  buttonData?:ActionButton[];
  tableData?:any;
  onClickAction:any;
}

export function ActionMenu(props:ActionButtonProps) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction1 = () => {
    handleClose();
    // Do something for action 1
  };

  const handleAction2 = () => {
    handleClose();
    // Do something for action 2
  };
  return (
      props.buttonData?.map((data) =>
      <MenuItem key={data.id} onClick={()=> props.onClickAction(data,props.tableData)}>{data.label}</MenuItem>
      )
    // <div>
    //   <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
    //     Action
    //   </Button>
    //   <Menu
    //     id="simple-menu"
    //     anchorEl={anchorEl}
    //     keepMounted
    //     open={Boolean(anchorEl)}
    //     onClose={handleClose}
    //   >
    //     {
    //       props.buttonData?.map((data) =>
    //         <MenuItem key={data.id} onClick={()=> props.onClickAction(data,props.tableData)}>{data.label}</MenuItem>
    //       )
    //     }
    //   </Menu>
    // </div>
  );
}

export default ActionMenu;
