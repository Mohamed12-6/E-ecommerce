import { useContext, useState } from 'react';
import logo from '../../assets/images/freshcart-logo.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import { useFormik } from 'formik';

export default function Navbar() {
  const navigate = useNavigate();
  const { userLogin, setuserLogin, search, setSearch } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [cartLoading, setCartLoading] = useState(false); // spinner state

  function Logout() {
    localStorage.removeItem("ApiToken");
    setuserLogin(null);
    navigate("/login");
  }

  function handleLogoClick() {
    navigate(userLogin ? "/home" : "/login");
  }

  function handleSearch(values) {
    setSearch(values.search);
    navigate('/search');
  }

  const formik = useFormik({
    initialValues: { search: '' },
    onSubmit: handleSearch,
  });

  // Simulate cart loading spinner
  const handleCartClick = () => {
    setCartLoading(true);
    setTimeout(() => setCartLoading(false), 800); // simulate async fetch
    navigate("/cart");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow">
      <nav className="flex items-center justify-between px-4 sm:px-6 py-3">
        <img
          src={logo}
          alt="logo"
          className="w-32 cursor-pointer"
          onClick={handleLogoClick}
        />

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:items-center lg:space-x-6 flex-1">
          {userLogin && (
            <>
              <div className="flex gap-x-4">
                <NavLink to="/home" className="text-sm font-semibold">Home</NavLink>
                <NavLink to="/cart" className="text-sm font-semibold">Cart</NavLink>
                <NavLink to="/products" className="text-sm font-semibold">Products</NavLink>
                <NavLink to="/categories" className="text-sm font-semibold">Categories</NavLink>
                <NavLink to="/brands" className="text-sm font-semibold">Brands</NavLink>
                <NavLink to="/allorders" className="text-sm font-semibold">Orders</NavLink>
              </div>

              <form onSubmit={formik.handleSubmit} className="flex-1 max-w-xs">
                <div className="flex items-center">
                  <input
                    type="text"
                    name="search"
                    value={formik.values.search}
                    onChange={formik.handleChange}
                    placeholder="Search..."
                    className="w-full px-3 py-2 border rounded-l-md text-sm focus:ring-green-500 focus:border-green-500"
                  />
                  <button type="submit" className="bg-green-500 px-3 py-2 rounded-r-md">
                    <i className='fa-solid fa-search text-white'></i>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-3">
          {userLogin ? (
            <>
              <Link to="/wishlist">
                <i className="fa-solid fa-heart text-2xl text-gray-400 hover:text-green-400"></i>
              </Link>

              {/* Cart Icon */}
              <button onClick={handleCartClick} className="relative">
                <i className='fa-solid fa-cart-shopping text-2xl'></i>
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-300 flex justify-center items-center text-xs text-gray-700">
                  {cartLoading ? <i className="fa fa-spinner fa-spin text-xs"></i> : cart?.numOfCartItems || 0}
                </span>
              </button>

              <span onClick={Logout} className="cursor-pointer text-sm font-semibold">Logout <i className="fa-solid fa-right-from-bracket"></i></span>
            </>
          ) : (
            <>
              <NavLink to="/login" className="text-sm font-semibold">Log in</NavLink>
              <NavLink to="/register" className="text-sm font-semibold">Register</NavLink>
            </>
          )}

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(true)} className="p-2 rounded-md border">
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} lg:hidden`}>
        <div className="fixed inset-0 bg-black/25" onClick={() => setIsOpen(false)}></div>
        <div className="fixed top-0 right-0 w-64 h-full bg-white shadow p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <img src={logo} alt="logo" className="w-32" />
            <button onClick={() => setIsOpen(false)} className="p-2 rounded-md">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <nav className="flex flex-col space-y-2">
            {userLogin ? (
              <>
                <NavLink to="/home" onClick={() => setIsOpen(false)} className="px-2 py-2 rounded hover:bg-gray-100">Home</NavLink>
                <NavLink to="/cart" onClick={() => setIsOpen(false)} className="px-2 py-2 rounded hover:bg-gray-100">Cart</NavLink>
                <NavLink to="/products" onClick={() => setIsOpen(false)} className="px-2 py-2 rounded hover:bg-gray-100">Products</NavLink>
                <NavLink to="/categories" onClick={() => setIsOpen(false)} className="px-2 py-2 rounded hover:bg-gray-100">Categories</NavLink>
                <NavLink to="/brands" onClick={() => setIsOpen(false)} className="px-2 py-2 rounded hover:bg-gray-100">Brands</NavLink>
                <NavLink to="/allorders" onClick={() => setIsOpen(false)} className="px-2 py-2 rounded hover:bg-gray-100">Orders</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={() => setIsOpen(false)} className="px-2 py-2 rounded hover:bg-gray-100">Login</NavLink>
                <NavLink to="/register" onClick={() => setIsOpen(false)} className="px-2 py-2 rounded hover:bg-gray-100">Register</NavLink>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
