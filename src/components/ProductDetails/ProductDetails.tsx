import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Product } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import { PaginationOptions } from "swiper/types";
import fetchData from "../../utils/fetchData";
import postData from "../../utils/postData";
import handleError from "../../utils/handleError";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProductDetails() {
  const [token] = useLocalStorage("token");

  const { id } = useParams();

  const {
    isLoading,
    isFetching,
    data: productData,
    error,
    isError,
  } = useQuery<{ data: Product }>({
    queryKey: ["products"],
    queryFn: () => fetchData<{ data: Product }>({ url: `/products/${id}` }),
    staleTime: 5 * 60 * 1000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  async function onAddToCart(id: string) {
    console.log("added to cart", id);
    try {
      const res = await postData({
        url: "/cart",
        data: {
          productId: id,
        },
        token: token as string,
      });

      console.log(res);
    } catch (error) {
      handleError(error);
    }
  }

  if (isLoading || isFetching) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (isError) {
    console.error("Fetching products failed:", error);
    return (
      <div className="text-red-500 text-center">
        Error loading products. Please try again later.
      </div>
    );
  }

  if (!productData) {
    return <div>Product not found</div>;
  }

  const { data: product } = productData;

  const pagination: PaginationOptions = {
    bulletElement: "img",
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return `<img  src=${product?.images[index]}  class=${className} />`;
    },
  };

  return (
    <main className="container mx-auto p-4 flex flex-col lg:flex-row gap-8">
      <Swiper
        navigation
        pagination={pagination}
        modules={[Navigation, Pagination]}
        className="mySwiper overflow-hidden"
      >
        {product?.images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={product.title} className="w-full" />
          </SwiperSlide>
        ))}
      </Swiper>

      <section className="max-w-[35rem] flex justify-stretch flex-col p-6 text-left lg:flex-basis-1/2">
        <h3 className="font-semibold">{product?.brand.name}</h3>
        <h2 className="font-bold">{product?.title}</h2>
        <p>{product?.description}</p>

        <div className="flex items-center gap-4 mt-5">
          <span className="text-2xl font-bold">
            ${product?.priceAfterDiscount || product?.price}
          </span>
          {product?.priceAfterDiscount && (
            <span className="text-gray-500 line-through">${product.price}</span>
          )}
        </div>

        <button
          onClick={() => onAddToCart(product._id)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-auto"
        >
          Add to Cart
        </button>
      </section>
    </main>
  );
}
