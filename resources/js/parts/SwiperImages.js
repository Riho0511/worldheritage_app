import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const SwiperImages = (props) => {
    const settings = {
        autoplay: true,
        dots: true,
        infinite: true,
        speed: 400,
    };
    const images = props.images;
  
  
    return (
        <Slider {...settings}>
            {images.map(image => {
                return <img key={image.id} src={'https://world-heritage-images.s3.ap-northeast-1.amazonaws.com/' + image.image} />
            })}
        </Slider>
    );
}

export default SwiperImages;