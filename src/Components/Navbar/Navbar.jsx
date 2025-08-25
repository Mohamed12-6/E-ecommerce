import { useContext, useState } from 'react';
import logo from '../../assets/images/freshcart-logo.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import { useFormik } from 'formik';

export default function Navbar() {
    let navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { userLogin, setuserLogin, search, setSearch } = useContext(UserContext);
    const { cart } = useContext(CartContext);

    function Logout() {
        localStorage.removeItem("ApiToken");
        setuserLogin(null);
        navigate("/login");
    }

    function handleLogoClick() {
        if (userLogin) {
            navigate("/home");
        } else {
            navigate("/login");
        }
    }
    function handleSearch(values) {
        setSearch(values.search);
        navigate('/search')

    }

    let formik = useFormik(
        {
            initialValues: {
                search: '',
            },
            onSubmit: handleSearch,
        }
    )
    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-slate-200">
            <nav className="flex items-center justify-between px-6 py-3 lg:px-8" aria-label="Global">
                {userLogin ? (
                    <div className="flex me-4">
                        <img
                            className="w-32 cursor-pointer"
                            src={logo}
                            alt="logo"
                            onClick={handleLogoClick}
                        />
                    </div>
                ) : <img
                    className="w-32 cursor-pointer"
                    src={logo}
                    alt="logo"
                    onClick={handleLogoClick}
                />}
                <div className="flex lg:hidden">
                    <button onClick={() => setIsOpen(true)} type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                        <span className="sr-only">Open main menu</span>
                        <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-3 lg:flex-1 lg:justify-between items-center">
    {userLogin ? (
        <>
            <div className="flex gap-x-3">
                <NavLink to="/home" className="text-sm font-semibold text-gray-900">Home</NavLink>
                <NavLink to="/cart" className="text-sm font-semibold text-gray-900">Cart</NavLink>
                <NavLink to="/products" className="text-sm font-semibold text-gray-900">Products</NavLink>
                <NavLink to="/categories" className="text-sm font-semibold text-gray-900">Categories</NavLink>
                <NavLink to="/brands" className="text-sm font-semibold text-gray-900">Brands</NavLink>
                <NavLink to="/allorders" className="text-sm font-semibold text-gray-900">Orders</NavLink>
            </div>

            <form onSubmit={formik.handleSubmit} className="w-full max-w-xs mx-auto">
                <div className="flex items-center">
                    <input
                        type="text"
                        name='search'
                        id="search"
                        value={formik.values.search}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="inputs block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500"
                        placeholder="Search..."
                    />
                    <button type="submit" className='p-0'>
                        <div className="py-2 px-3 bg-green-500 rounded-md">
                            <i className='fa-solid fa-search text-white'></i>
                        </div>
                    </button>
                </div>
            </form>

           
        </>
    ) : null}
</div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-3">
                    {userLogin === null ? (
                        <>
                            <NavLink to="/login" className="text-sm font-semibold text-gray-900">Log in <i className='fa-solid fa-arrow-right-to-bracket mr-3 '></i></NavLink>
                            <NavLink to="/register" className="text-sm font-semibold text-gray-900">Register <span aria-hidden="true">→</span></NavLink>
                        </>
                    ) : (
                        <>
                            <Link to={'/wishlist'}>
                                <span className='cursor-pointer'><i className="fa-solid fa-heart text-2xl text-gray-400 hover:text-green-400"></i></span>
                            </Link>
                            <NavLink to="/cart" className="text-sm font-semibold text-gray-900 relative">
                                <i className='fa-solid fa-cart-shopping text-2xl'></i>
                                <span className='bg-green-300 px-1 rounded-full absolute w-5 h-5 top-0 right-0 translate-x-1/2 -translate-y-1/2 flex justify-center items-center'>
                                    {cart ? (
                                        <span className="text-gray-500">
                                            {cart.numOfCartItems > 0 ? cart.numOfCartItems : <i className="fa-solid fa-spinner fa-spin"></i>}
                                        </span>
                                    ) : (
                                        <i className="fa-solid fa-spinner fa-spin"></i>
                                    )}
                                </span>
                            </NavLink>
                            <span onClick={Logout} className="text-sm font-semibold text-gray-900 cursor-pointer">Logout<i className="text-sm px-1 fa-solid fa-right-from-bracket"></i></span>
                        </>
                    )}
                    <div>
                        <li className='list-none flex'>
                            <i className='fab mx-2 fa-facebook'></i>
                            <i className='fab mx-2 fa-twitter'></i>
                            <i className='fab mx-2 fa-instagram'></i>
                            <i className='fab mx-2 fa-youtube'></i>
                            <i className="fa-brands mx-2 fa-tiktok"></i>
                        </li>
                    </div>
                </div>
            </nav>
            {/* Mobile menu, show/hide based on menu open state. */}
            <div className={isOpen ? "lg:hidden" : "hidden"} role="dialog" aria-modal="true">
                <div className="fixed inset-0 z-50" />
                <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <img className="w-32" src={logo} alt="logo" />
                        </a>
                        <button onClick={() => setIsOpen(false)} type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700">
                            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {userLogin ? (
                                    <>
                                        <NavLink to="/home" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Home</NavLink>
                                        <NavLink to="/cart" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Cart</NavLink>
                                        <NavLink to="/products" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Products</NavLink>
                                        <NavLink to="/categories" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Categories</NavLink>
                                        <NavLink to="/brands" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Brands</NavLink>
                                        <NavLink to="/allorders" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">Orders</NavLink>

                                    </>
                                ) : null}
                            </div>
                            <div className="py-6">
                                {userLogin === null ? (
                                    <>
                                        <NavLink to="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50">Log in</NavLink>
                                        <NavLink to="/register" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50">Register</NavLink>
                                    </>
                                ) : (
                                    <span onClick={Logout} className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50">Logout</span>
                                )}
                                <div>
                                    <li className='list-none flex'>
                                        <i className='fab mx-2 fa-facebook'></i>
                                        <i className='fab mx-2 fa-twitter'></i>
                                        <i className='fab mx-2 fa-instagram'></i>
                                        <i className='fab mx-2 fa-youtube'></i>
                                        <i className="fa-brands mx-2 fa-tiktok"></i>
                                    </li>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}