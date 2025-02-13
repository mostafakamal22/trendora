import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { PaginationOptions } from "swiper/types";
import { Product } from "@/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "@/assets/styles/swiper.css";

export default function ProductCarousel({ images, title }: Product) {
  const pagination: PaginationOptions = {
    bulletElement: "img",
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return `<img  src=${images[index]}  class=${className} />`;
    },
  };

  return (
    <Swiper
      navigation
      pagination={pagination}
      modules={[Navigation, Pagination]}
      className="mySwiper overflow-hidden rounded-md"
    >
      {images?.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image} alt={title} className="w-full rounded-lg" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
