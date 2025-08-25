import axios from 'axios';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';

export default function CategoriesSlider() {
    const [product, setProduct] = useState([]);
    var settings = {
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 8,
        slidesToScroll: 1,
        autoplay: true,

        autoplaySpeed: -1000000,
        cssEase: "linear",
        arrows: false,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],

    }

    function SliderCategory() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
            .then(({ data }) => {
                // console.log(data.data);
                setProduct(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        SliderCategory();
    }, []);

    return (
        <>
            <Slider  {...settings} className='my-10 pb-2 w-[83%] md:w-[90%] m-auto'>
                {product.map((category) => (
                    <div key={category.id}>
                        <img src={category.image} alt={category.name} className="w-full h-[200px]" />
                        <h3 className="text-center">{category.name}</h3>
                    </div>
                ))}
            </Slider>
        </>
    );
}