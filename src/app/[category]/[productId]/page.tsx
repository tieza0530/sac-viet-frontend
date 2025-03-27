"use client";
import { useParams, useRouter } from "next/navigation";
import { fetchProductDetail } from "./components/fetchProductDetail";
import { useCallback, useEffect, useState } from "react";
import { ProductProps, ReviewProps } from "@/app/utils/fetchProduct";
import Image from "next/image";
import * as React from "react";
import { FaStar } from "react-icons/fa6";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { fetchReview } from "./components/fetchReviews";
import { IoAddOutline } from "react-icons/io5";
import { IoRemoveOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { BsCartPlus } from "react-icons/bs";
import { useAuth } from "@/app/AuthContext";
import { NEXT_PUBLIC_LOCAL } from "@/app/helper/constant";
import { ShowAlert } from "@/app/helper/ShowAlert";

export default function ProductID() {
  const param = useParams();
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [review, setReview] = useState<ReviewProps | null>(null);
  const [changeImg, setChangeImg] = useState(0);
  const [quantityChoise, setQuantityChoise] = useState(1);
  const { setCart, accessToken } = useAuth()
  const [showAlert, setShowAlert] = useState(false)
  const route = useRouter()

  const getProductDetail = useCallback(async () => {
    const productId = param.productId;
    if (typeof productId === "string" && productId) {
      try {
        const product = await fetchProductDetail(productId);
        const review = await fetchReview(productId);
        if (product) {
          setProduct(product);
          if (review) {
            setReview(review)
          }
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    }
  }, [param.productId]);
  useEffect(() => {
    getProductDetail();
  }, [param.productId, getProductDetail]);

  const handleChoiseUp = () => {
    const inventory = product?.data[0].inventory
    if (inventory) {
      if (quantityChoise < inventory) {
        setQuantityChoise(quantityChoise + 1)
      }
    }
  }
  const handleChoisedown = () => {
    if (quantityChoise > 1) {
      setQuantityChoise(quantityChoise - 1)
    }
  }
  const handleAddProduct = async () => {
    if(!accessToken){
      return route.push('/login')
    }
    try {
      const res = await fetch(`${NEXT_PUBLIC_LOCAL}/api/post/product-add-card`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          productId: product?.data[0]._id
        })
      })
      if (res.status === 200) {
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 1000);
        try {
          if (accessToken) {
            const res = await fetch(`${NEXT_PUBLIC_LOCAL}/api/get/cart`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
              cache: "no-store",
            });

            if (!res.ok) throw new Error("Unauthorized");
            const data = await res.json();
            return setCart(data.data.flat());
          }
        } catch (error) {
          console.log(error);
          return null;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="xl:mx-48 bg-white p-4 mt-28 mb-10 rounded-sm">
      {product?.data.map((value) => {
        return (
          <div key={`product-${value._id}`} className="grid grid-cols-3">
            <div className="col-span-1">
              <Image
                src={`/do-tho/${value.img[changeImg]}`}
                alt="anh-san-pham"
                width={300}
                height={300}
                className="w-full"
              />
              <div className="flex mt-1 ">
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="w-full relative"
                >
                  <CarouselContent className="pl-4">
                    {value.img.map((valueImg, idx) => (
                      <CarouselItem key={idx} className="basis-1/5 pl-0">
                        <div className="p-1">
                          <Card className="p-0">
                            <CardContent className="flex aspect-square items-center justify-center p-0 cursor-pointer">
                              <Image
                                src={`/do-tho/${valueImg}`}
                                alt="anh-san-pham"
                                width={48}
                                height={48}
                                className="mx-1 w-full h-full"
                                onClick={() => setChangeImg(idx)}
                              />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="text-white hover:bg-inherit hover:text-white bg-inherit border-0 left-0 text-2xl" />
                  <CarouselNext className="text-white hover:bg-inherit hover:text-white bg-inherit border-0 right-0 text-2xl" />
                </Carousel>
              </div>
            </div>
            <div className="col-span-2 ml-10 relative">
              <p className="text-xl">{value.name}</p>
              <div className="flex items-center mt-2">
                <div className="flex justify-center items-center mr-4"><p className="border-b-1 mr-1">{review?.data?.length
                  ? (review.data.reduce((acc, value) => acc + value.rating, 0) / review.data.length).toFixed(1)
                  : "chưa có đánh giá"}</p><span hidden={review?.data?.length ? false : true}><FaStar className="text-yellow-300" /></span></div>
                <div className="flex justify-center items-center mr-4" hidden={review?.data?.length ? false : true}>
                  <p className="border-b-1 mr-1" >{review?.data.length}</p><span className="text-sm text-neutral-600">Đánh giá</span>
                </div>
                <div className="flex justify-center items-center"><p className="border-b-1 mr-1">{value.sold}</p> <span className="text-sm text-neutral-600">Lượt bán</span></div>
              </div>
              <div>
                <p className="text-sm mt-4 line-through">  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value.price)}</p>
                <p className="text-3xl mt-1 text-red-500">{new Intl.NumberFormat("vi-Vn", { style: "currency", currency: "VND" }).format((value.price / 100) * (100 - value.discount_percentage))} <span className="text-sm">-{value.discount_percentage}%</span>
                </p>
              </div>
                <div >
                  <p className="mt-4 text-sm text-neutral-400">An tâm mua sắm cùng Sắc Việt</p>
                  <div className="grid grid-cols-6 mt-2 text-xs justify-between items-center">
                    <p className="border-r">Đổi trả miễn phí trong vòng 15 ngày</p>
                    <p className="border-r mx-1">Hỗ trợ giao hàng tận nhà</p>
                    <p className="border-r mx-1">100% Hoàn tiền nếu sản phẩm lỗi</p>
                    <p className="ml-1">Thanh toán Với nhiều phương thức</p>
                  </div>
                </div>
                <div>
                </div>
              <div className="mt-10 absolute bottom-0">
                <div className="flex items-center mb-10 text-xl w-auto ">
                  <Button onClick={() => handleChoisedown()} className="border mr-2 bg-white text-black hover:bg-white"><IoRemoveOutline /></Button>
                  <span className="flex justify-center items-center w-6 text-sm"> {quantityChoise}</span>
                  <Button onClick={() => handleChoiseUp()} className="border ml-2 bg-white text-black hover:bg-white"><IoAddOutline /></Button>
                  <span className="ml-6 text-sm text-neutral-400">{value.inventory} sản phẩm có sẵn</span>
                </div>
                <div className="flex justify-center items-center">
                  <Button className="p-6 bg-inherit text-red-500 shadow-0 border border-red-300 hover:bg-inherit px-10" onClick={() => handleAddProduct()}><BsCartPlus />Thêm vào giỏ hàng</Button>
                  <Button className="p-6 bg-red-500 text-white shadow-0 hover:bg-red-500/85 px-10 ml-2">Mua ngay</Button>
                </div>
              </div>
            </div>
            {showAlert && ShowAlert("Thêm sản phẩm thành công!")}
          </div>
        );
      })}
    </div>
  );
}

