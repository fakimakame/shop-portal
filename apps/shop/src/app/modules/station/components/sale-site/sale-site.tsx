import { Card, CardContent, CardHeader, Theme, } from '@mui/material';
import { makeStyles, createStyles, } from '@mui/styles'
import styles from './sale-site.module.scss';

/* eslint-disable-next-line */
export interface SaleSiteProps { }
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    header: {
      backgroundColor: theme?.palette?.primary?.dark || 'blue',
      color: theme.palette?.getContrastText(theme.palette?.primary?.light || 'blue'),
      paddingTop: 0,
    },
  })
);
export function SaleSite(props: SaleSiteProps) {
  const classes = useStyles();
  return (
    <div className='row'>
      <div className='col-md-8 col-sm-12'>
        This is for searching product
      </div>
      <div className='col-md-4 col-sm-12'>
        <Card>
          <CardHeader className={classes.header} title="Cart information" />
          <CardContent>
            Here list all cart
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SaleSite;
