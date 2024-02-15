
import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
/* eslint-disable-next-line */
export interface AppButtonProps {
  name:string,
  classes?:string,
  status:boolean,
  styles?:any,
  colors?:"info" | "inherit" | "primary" | "secondary" | "success" | "error" | "warning",
}

export const AppButton: React.FC<AppButtonProps> = ({name,status=false,styles,classes,colors='info'}) => {
  return (
    // <Button 
    // type='submit' 
    // disabled={this.props.status} 
    // className='mt-1' style={this.props.styles} 
    // variant='contained' color="primary">{this.props.name}
    // </Button>
    <LoadingButton
    size="small"
    color={colors}
    type="submit"
    loading={status}
    className={classes}
    loadingPosition="start"
    style={styles}
    startIcon={<SaveIcon />}
    variant="contained"
  >
    <span>{name}</span>
  </LoadingButton>
  );
}

export default AppButton;
