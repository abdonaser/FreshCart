import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Nav from "./Components/Nav/Nav";
import Layout from "./Components/Layoute/Layout";
import Home from "./Components/Home/Home";
import Categories from "./Components/Categories/Categories";
import Product from "./Components/Product/Product";
import NotFound from "./Components/NotFound/NotFound";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Logout from "./Components/Logout/Logout";
import { CounterProvider } from "./Context/counter";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { CartContextProvider } from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import CategoryDetails from "./Components/CategoriesDetails/CategoryDetails";
import BrandsDetails from "./Components/BrandsDetails/BrandsDetails";
import Cart from "./Components/Cart/Cart";
import Profile from "./Components/Profile/Profile";
import Payment from "./Components/Payment/Payment";
import AllOrders from "./Components/AllOrders/AllOrders";
import { Offline } from "react-detect-offline";
import WishList from "./Components/WishList/WishList";
import Tagroba from "./Components/Tagroba/Tagroba";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "categoryDetails/:id",
        element: (
          <ProtectedRoute>
            <CategoryDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "product",
        element: (
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
        ),
      },
      {
        path: "productDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "brandsDetails/:id",
        element: (
          <ProtectedRoute>
            <BrandsDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "Tagroba",
        element: (
          <ProtectedRoute>
            <Tagroba />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "logout", element: <Logout /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
export default function App() {
  const ClientQuery = new QueryClient();

  return (
    <>
      <QueryClientProvider client={ClientQuery}>
        <CartContextProvider>
          <CounterProvider>
            <RouterProvider router={router}></RouterProvider>
          </CounterProvider>
        </CartContextProvider>
        <Toaster />
      </QueryClientProvider>

      <Offline>
        <h6 className="position-fixed bottom-0 start-0 rounded text-bg-danger p-1 text-capitalize ">
          !...Oops You're offline right now. Check your connection.
        </h6>
      </Offline>
    </>
  );
}
