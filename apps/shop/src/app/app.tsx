// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './pages/layout/layout';
import Login from './modules/login/pages/login/login';
import Dashboard from './components/dashboard/dashboard';
import Station from './modules/station/pages/station/station';
import { checkAuthLoader } from '@shop-portal/libs';
import Product from './modules/station/pages/product/product';
import ViewUser from './modules/user/components/view-user/view-user';
import Store from './modules/station/components/store/store';
import ViewPurchase from './modules/station/components/view-purchase/view-purchase';
import ShiftAssigment from './modules/station/components/shift-assigment/shift-assigment';
import OpenShift from './modules/station/components/open-shift/open-shift';
import SaleSite from './modules/station/components/sale-site/sale-site';
import Category from './modules/station/components/category/category';

export function App() {

  const routers = createBrowserRouter([
    {
      path: '',
      Component: Login
    },
    {
      path: 'shop',
      Component: Layout,
      loader: checkAuthLoader, //this is used for checking it is login
      children: [
        {
          path: '',
          element: <Dashboard />
        },
        {
          path: 'user',
          element: <ViewUser />
        },
        {
          path: 'station',
          element: <Station />
        },
        {
          path: 'product',
          element: <Product />
        },
        {
          path: 'store',
          element: <Store />
        },
        {
          path: 'purchase',
          element: <ViewPurchase />
        },
        {
          path: 'shift-assigment',
          element: <ShiftAssigment />
        },
        {
          path: 'open-shift',
          element: <OpenShift />
        },
        {
          path: 'sale-site',
          element: <SaleSite />
        },
        {
          path: 'category',
          element: <Category />
        },
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
