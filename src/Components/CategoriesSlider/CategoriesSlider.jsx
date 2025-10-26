import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1536, // شاشات XXL
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 1280, // شاشات XL
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1024, // شاشات LG
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768, // التابلت
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480, // الموبايل
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  function fetchCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => setCategories(data.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="w-[90%] mx-auto my-10">
        <h2 className="text-2xl font-semibold text-center mb-6">Top Categories</h2>

        <Slider {...settings}>
          {categories.map((category) => (
            <div key={category._id} className="px-2">
              <div className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:text-white overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-44 sm:h-48 md:h-52 lg:h-56 object-cover hover:scale-105 transition-transform duration-500"
                />
                <h3 className="text-center py-3 text-sm md:text-base font-medium">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
