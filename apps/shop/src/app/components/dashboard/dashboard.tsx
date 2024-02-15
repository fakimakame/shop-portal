import styles from './dashboard.module.scss';
import { Component } from 'react';
/* eslint-disable-next-line */
export interface DashboardProps {}

export class Dashboard extends Component <DashboardProps> {
  
  constructor(props: DashboardProps){
    super(props);
  }

  async componentDidMount(): Promise<void> {
    //const userService=new UserService()
    //  await userService.getAll()
  }
  render(){
  return (
    <div className={styles['container']}>
      <h1>Welcome to Dashboard!</h1>
    </div>
  );
}
}

export default Dashboard;
