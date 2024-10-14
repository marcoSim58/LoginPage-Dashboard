import React from "react";
import { Carousel } from "antd";
import Image from "next/image";
import cr1 from "../Component/images/Carousel/Carousel1.gif";
import cr2 from "../Component/images/Carousel/Carousel2.gif";
import cr3 from "../Component/images/Carousel/Carousel3.gif";

const contentStyle: React.CSSProperties = {
  height: "100%",
};

const CarouselCustom = () => {
  return (
    <Carousel autoplay dots fade>
      <div>
        <Image style={contentStyle} priority src={cr1} alt="carousel-img" />
      </div>
      <div>
        <Image style={contentStyle} priority src={cr2} alt="carousel-img" />
      </div>
      <div>
        <Image style={contentStyle} priority src={cr3} alt="carousel-img" />
      </div>
    </Carousel>
  );
};

export default CarouselCustom;
