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
    <div className="w-[95%] sm:w-[90%] mx-auto mb-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Main Slider */}
        <div className="col-span-12 md:col-span-8">
          <Slider {...settings}>
            <img
              src={Slide1}
              className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] object-cover rounded-lg"
              alt="Slide 1"
            />
            <img
              src={Slide2}
              className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] object-cover rounded-lg"
              alt="Slide 2"
            />
          </Slider>
        </div>

        {/* Side Banners */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-3">
          <img
            src={MainSlider1}
            className="w-full h-[120px] sm:h-[150px] md:h-[180px] lg:h-[200px] object-cover rounded-lg"
            alt="Banner 1"
          />
          <img
            src={MainSlider2}
            className="w-full h-[120px] sm:h-[150px] md:h-[180px] lg:h-[200px] object-cover rounded-lg"
            alt="Banner 2"
          />
        </div>
      </div>
    </div>
  );
}
