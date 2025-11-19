import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './callback.module.scss';
import { userManager } from '@shop-portal/libs';

/* eslint-disable-next-line */
export interface CallbackProps { }

export function Callback(props: CallbackProps) {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate an async operation like fetching user data or authentication
    userManager.signinRedirectCallback().then((user) => {
      console.log('Callback handled, navigating to home.', user);
      navigate('/shop');
    }).catch((error) => {
      console.error('Error handling callback:', error);
      // Optionally navigate to an error page or show a message
    });
  }, [navigate]);
  return (
    <div className={styles['container']}>
      <h1>Welcome to Callback!</h1>
    </div>
  );
}

export default Callback;
