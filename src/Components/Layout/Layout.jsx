import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout() {


    return (<>
        <Navbar/>
<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-6">
        <Outlet/>
        </div>
        <Footer/>
    </>

    )
}
