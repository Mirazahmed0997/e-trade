import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './layout/Main';
import About from './components/About/About';
import Shop from './components/Shop/Shop';
import Order from './components/Orders/Order';
import Inventory from './components/Inventory/Inventory';
import { productsAndCartLoader } from './Loaders/productsAndCartLoader';
const router=createBrowserRouter([
  {
    path:'/',
    element:<Main></Main>,
    children:[
      {
        path:'/',
        loader:()=>fetch('products.json'),
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
        element:<Inventory></Inventory>
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
