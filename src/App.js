import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './layout/Main';
import About from './components/About/About';
import Shop from './components/Shop/Shop';
import Order from './components/Orders/Order';
import Inventory from './components/Inventory/Inventory';
import { productsAndCartLoader } from './Loaders/productsAndCartLoader';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Proceed from './components/Proceed/Proceed';
import PrivateRoutes from './routes/PrivateRoutes';
const router=createBrowserRouter([
  {
    path:'/',
    element:<Main></Main>,
    children:[
      {
        path:'/',
        element:<Shop></Shop>
      },

      {
        path:'about',
        element:<About></About>
      },
      {
        path:'/orders',
        loader:productsAndCartLoader,
        element:<Order></Order>
      },
      {
        path:'/inventory',
        element:<PrivateRoutes><Inventory></Inventory></PrivateRoutes>
      },
      {
        path : '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element:<SignUp></SignUp>
      },
      {
        path:'/proceed',
        element:<PrivateRoutes><Proceed></Proceed></PrivateRoutes>
      }
    ]
  },
 
])

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
