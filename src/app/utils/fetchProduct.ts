import { useEffect } from "react";
import { useAuth } from "../AuthContext";
import { NEXT_PUBLIC_LOCAL } from "../helper/constant";

export type ProductProps = {
  data: [
    {
      _id: string;
      seller_id: string;
      category_id: string;
      name: string;
      img: string[];
      video: string;
      sold: number;
      discount_percentage: number;
      price: number;
      color: string[];
      material: string[];
      dimensions: string;
      origin: string;
      handmade: boolean;
      warranty: string;
      care_instructions: string;
      description: string;
      inventory: number;
      tags: string[];
      status: string;
    }
  ];
  currentPage: number;
  totalPages: number;
  message: string;
};


export type ProductListProps = {
      _id: string;
      seller_id: string;
      category_id: string;
      name: string;
      img: string[];
      video: string;
      sold: number;
      discount_percentage: number;
      price: number;
      color: string[];
      material: string[];
      dimensions: string;
      origin: string;
      handmade: boolean;
      warranty: string;
      care_instructions: string;
      description: string;
      inventory: number;
      tags: string[];
      status: string;
      quantity: number;
};

export type CategoryProps = {
  data: [
    {
      _id: string;
      name: string;
      slug: string;
      status: boolean;
    }
  ];
  message: string;
};
export type ArticleProps = {
  data: [
    {
      _id: string;
      title: string;
      img: string[];
      source: string;
      content: string;
      tags: string[];
      date_at: Date;
      author: string;
      views: number;
      status: string;
    }
  ];
  message: string;
};

export type ReviewProps = {
  data: [
    {
      _id: string;
      product_id: string;
      user_id: string;
      rating: number;
      comment: string;
      images: string[];
    }
  ];
  message: string;
};
export const FetchProducts = () => {
  const { setListProducts, setListCategory, setArticle } = useAuth();
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(`${NEXT_PUBLIC_LOCAL}/api/get/product`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: ProductProps = await res.json();
        return setListProducts(data);
      } catch (error) {
        console.log(error);
        return null;
      }
    };
    const getCategory = async () => {
      try {
        const res = await fetch(`${NEXT_PUBLIC_LOCAL}/api/get/category`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: CategoryProps = await res.json();
        return setListCategory(data);
      } catch (error) {
        console.log(error);
      }
    };
    const getArticle = async () => {
      try {
        const res = await fetch(`${NEXT_PUBLIC_LOCAL}/api/get/article`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data: ArticleProps = await res.json();
        return setArticle(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
    getProducts();
    getArticle();
  }, [setListCategory, setListProducts, setArticle]);
};
