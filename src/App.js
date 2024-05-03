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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    element: <CartPage />,
  },

  { 
    path: '/checkout',
    element: <Checkout></Checkout>,
  },
  { 
    path: '/product-detail',
    element: <ProductDetailPage></ProductDetailPage>,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
