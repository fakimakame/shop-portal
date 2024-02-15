// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './pages/layout/layout';
import Login from './modules/login/pages/login/login';
import Dashboard from './components/dashboard/dashboard';
import Station from './modules/station/pages/station/station';
import { checkAuthLoader } from '@shop-portal/libs';

export function App() {

  const routers = createBrowserRouter([
    {
      path:'',
      Component:Login
    },
    {
      path:'shop',
      Component:Layout,
      loader:checkAuthLoader, //this is used for checking it is login
      children:[
        {
        path: '',
        element: <Dashboard/>
        },
        {
          path:'station',
          element:<Station/>
        }
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
