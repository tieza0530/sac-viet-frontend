"use client"
import { useAuth } from "./AuthContext";
import { FetchProducts } from "./utils/fetchProduct";
import { CarouselHome } from "./components/home/CarouselHome";
import { CategoryList } from "./components/home/CategoryList";
import { ProductList } from "./components/home/ProductList";
import { ArticleList } from "./components/home/AricleList";
import { ServiceHighlights } from "./components/home/ServiceHighlights ";

export default function Home() {
  const { listCategory, listProducts, article } = useAuth()
  FetchProducts();
  return (
    <div className="xl:mx-48 pt-28">
      <CarouselHome />
      <CategoryList listCategory={listCategory} />
      <ProductList listCategory={listCategory} listProducts={listProducts} />
      <ArticleList article={article} />
      <ServiceHighlights />
    </div>
  );
}
