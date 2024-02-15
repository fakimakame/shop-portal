import AddStation from '../../components/add-station/add-station';
import ViewStation from '../../components/view-station/view-station';
import styles from './station.module.scss';

/* eslint-disable-next-line */
export interface StationProps {}

export function Station(props: StationProps) {
  return (
    <div className='row'>
      <div className='col-6'>
           <ViewStation/>
      </div>
      <div className='col-6'>
        <AddStation/>
      </div>
    </div>
    
  );
}

export default Station;
