

import { Helmet } from 'react-helmet';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';
import RecentProducts from '../RecentProducts/RecentProducts';
export default function Home() {




    return (<>
    <Helmet>Home Page</Helmet>
        <MainSlider/>
        <CategoriesSlider/>
        <RecentProducts/>
    </>

    )
}
