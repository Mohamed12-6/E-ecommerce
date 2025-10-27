import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Brand from './Components/Brand/Brand'
import NotFound from './Components/NotFound/NotFound'
import Cart from './Components/Cart/Cart'
import Products from './Components/Products/Products'
import Categories from './Components/Categories/Categories'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import { CounterContextProvider } from './Context/CounterContext'
import UserContextProvider from './Context/UserContext'
import ProtctedRouting from './Components/ProtctedRouting/ProtctedRouting'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast';
import Checkout from './Components/Checkout/Checkout'
import AllOrders from './Components/AllOrders/AllOrders'
import WishlistProvider from './Context/WishlistContext'
import ForgetPassword from './Components/ForegetPassword/ForegetPassword'
import ResetCode from './Components/ResetCode/ResetCode'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import CategoryDetails from './Components/CategoryDetails/CategoryDetails'
import { Offline } from "react-detect-offline";
import Search from './Components/Search/Search'
import WishList from './Components/Wishlist/Wishlist'


function App() {
    const route = createBrowserRouter([
        {

            path: '',
            element: <Layout />,
            children: [
                { index: true, element: <Home /> },
                { path: 'login', element: <Login /> },
                { path: 'register', element: <Register /> },
                { path: 'forgetPassword', element: <ForgetPassword /> },
                { path: 'resetcode', element: <ResetCode /> },
                { path: 'resetPassword', element: <ResetPassword /> },

                {
                    path: 'home',
                    element: (
                        <ProtctedRouting>
                            <Home />
                        </ProtctedRouting>
                    ),
                },
                {
                    path: 'cart',
                    element: (
                        <ProtctedRouting>
                            <Cart />
                        </ProtctedRouting>
                    ),
                },
                {
                    path: 'products',
                    element: (
                        <ProtctedRouting>
                            <Products />
                        </ProtctedRouting>
                    ),
                },
                {
                    path: 'categories',
                    element: (
                        <ProtctedRouting>
                            <Categories />
                        </ProtctedRouting>
                    ),
                },
                {
                    path: 'productdetails/:id/:category',
                    element: (
                        <ProtctedRouting>
                            <ProductDetails />
                        </ProtctedRouting>
                    ),
                },
                {
                    path: 'checkout',
                    element: (
                        <ProtctedRouting>
                            <Checkout />
                        </ProtctedRouting>
                    ),
                },
                {
                    path: 'wishlist',
                    element: (
                        <ProtctedRouting>
                            <WishList/>
                        </ProtctedRouting>
                    ),
                },
                {
                    path: 'search',
                    element: (
                        <ProtctedRouting>
                            <Search />
                        </ProtctedRouting>
                    ),
                },
                {
                    path: 'categoryDetails/:id/:category',
                    element: (
                        <ProtctedRouting>
                            <CategoryDetails />
                        </ProtctedRouting>
                    ),
                },
                {
                    path: 'allorders',
                    element: (
                        <ProtctedRouting>
                            <AllOrders />
                        </ProtctedRouting>
                    ),
                },
                {
                    path: 'brands',
                    element: (
                        <ProtctedRouting>
                            <Brand />
                        </ProtctedRouting>
                    ),
                },
                {
                    path: '*',
                    element: (
                        <ProtctedRouting>
                            <NotFound />
                        </ProtctedRouting>
                    ),
                },
            ],
        },
    ]);

    const query = new QueryClient();
    return (
        <QueryClientProvider client={query}>
            <WishlistProvider>
                <UserContextProvider>
                    <CartContextProvider>
                        <CounterContextProvider>
                            <RouterProvider router={route}  />
                            <div className={`fixed start-2 top-16  rounded-md p-4 `}>
                                <Offline><span className='bg-slate-500'>Your network is offline</span>
                                </Offline>
                            </div>

                            <Toaster />

                            <ReactQueryDevtools />
                        </CounterContextProvider>
                    </CartContextProvider>
                </UserContextProvider>
            </WishlistProvider>
        </QueryClientProvider>
    );
}

export default App;