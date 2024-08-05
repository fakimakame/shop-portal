import React, { useState } from 'react';
import styles from './image-item.module.scss';
import { IconButton, ImageListItem, ImageListItemBar, Menu, MenuItem } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ActionMenu from '../action-button/action-button';
import { ActionButton } from '../../model/action-button';
/* eslint-disable-next-line */
export interface ImageItemProps {
  img: string,
  title?: string;
  subtitle?: string;
  actionButtonData?: ActionButton[];
  id?: any;
  onActionClick?: any;
  data?: any
  quantity?: any
}



export function ImageItem(props: ImageItemProps) {
  const [anchorEl, setAnchorEl] = useState(null);
  const qty = props.quantity ? props.quantity : 0
  const handleClick = (data: any, tableData: any) => {
    props.onActionClick(data, tableData)
  }
  const openMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className='col-2 mb-1'>
      <ImageListItem key={props.id}>
        <img
          // srcSet={`${props.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
          // src={`${props.img}?w=248&fit=crop&auto=format`}
          style={{ height: 250 }}
          srcSet={`${props.img}`}
          src={`${props.img}`}
          alt={props.title}
          loading="lazy"
        />
        <ImageListItemBar
          title={props.title}
          subtitle={`Available quantity ${qty}`}
          position='below'
          actionIcon={
            <IconButton onClick={openMenu}
              sx={{ color: 'red' }}
              aria-label={`info about ${props.title}`}
            >
              <InfoIcon />
            </IconButton>

          }

        />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <ActionMenu id={props.data.id} onClickAction={handleClick} buttonData={props.actionButtonData} tableData={props.data} />
          {/* {
          props.actionButtonData?.map((data:any) =>
          <MenuItem key={props.data.id} onClick={()=> handleClick(data,props.data)}>{data.label}</MenuItem>
          )
           }  */}

        </Menu>
      </ImageListItem>
    </div>
  );
}

export default ImageItem;
