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
    <div className="lg:mx-24 xl:mx-48 2xl:mx-80 pt-28">
      <CarouselHome />
      <CategoryList listCategory={listCategory} />
      <p className="text-3xl font-bold text-[var(--color-text-root)] flex justify-center items-center pt-20">Gợi ý hôm nay</p>
      <ProductList listCategory={listCategory} listProducts={listProducts} />
      <ArticleList article={article} />
      <ServiceHighlights />
    </div>
  );
}
