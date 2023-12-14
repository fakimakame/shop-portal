// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import styles from './app.module.scss';

import NxWelcome from './nx-welcome';
import Layout from './pages/layout/layout';
import Login from './modules/login/pages/login/login';

export function App() {

  const routers = createBrowserRouter([
    {
      path:'',
      Component:Login
    },
    {
      path:'shop',
      Component:Layout,
      children:[

      ]
    }
  ])
  return (
    // <div>
    //   <NxWelcome title="shop" />
    // </div>
    <RouterProvider router={routers}></RouterProvider>
  );
}

export default App;
