import MainSlider1 from "../../assets/images/slider-image-1.jpeg";
import MainSlider2 from "../../assets/images/grocery-banner-2.jpeg";
import Slide1 from "../../assets/images/slider-image-2.jpeg";
import Slide2 from "../../assets/images/slider-image-3.jpeg";
import Slider from "react-slick";

export default function MainSlide() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
    };

    return (
        <>
            <div className="grid grid-cols-12 w-[90%] m-auto h-auto md:h-[400px] lg:h-[450px] overflow-hidden mb-3">
                <div className="col-span-12 md:col-span-8 " >
                    <Slider {...settings}>
                        <img src={Slide1} className='w-full h-auto' alt="" />
                        <img src={Slide2} className='w-full h-auto' alt="" />
                    </Slider>
                </div>
                <div className="col-span-6 md:col-span-4 flex flex-row md:block rounded-none lg:pb-6 ">
                    <img src={MainSlider1} className='w-full h-auto md:h-[151px] lg:h-[250px] rounded-none' alt="" />
                    <img src={MainSlider2} className='w-full h-auto md:h-[151px] lg:h-[250px] rounded-none' alt="" />
                </div>
            </div>
        </>
    );
}