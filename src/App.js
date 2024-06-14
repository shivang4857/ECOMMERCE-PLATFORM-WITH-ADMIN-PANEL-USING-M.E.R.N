import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUpPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { selectLoggedInUser } from "./features/auth/AuthSlice";
import { fetchItemsByUserIdAsync } from "./features/Cart/CartSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home /></Protected>,
  },
  {
    path: "login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "signup",
    element: <SignUpPage></SignUpPage> ,
  },
  {
    path: "/cart",
    element: <Protected><CartPage /></Protected>,
  },

  { 
    path: '/checkout',
    element: <Checkout></Checkout>,
  },
  { 
    path: '/productdetails/:id',
    element: <ProductDetailPage/>,
  },
]);

function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id))
    }
  },[dispatch, user])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
