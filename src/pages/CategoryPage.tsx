import { useParams } from "react-router-dom";
import CategorySidebar from "../components/ui/CategorySidebar";
import ProductCardVertical from "../components/ui/ProductCard";
import { useCategories, useProducts } from "../hooks/useProducts";
import { Product } from "../types/Product";

export default function CategoryPage() {
  console.log("CategoryPage");
  const { slug } = useParams(); // Get slug from URL
  const { categories, isLoading: loadingCategories } = useCategories();
  const { products, isLoading: loadingProducts } = useProducts(slug || "");

  return (
    <div className="flex justify-center items-center gap-12 md:px-6 md:py-16 md:items-start md:mx-auto xl:max-w-[1400px]">
      <aside className="hidden md:flex w-3/12 flex-col justify-center gap-4 mx-auto">
        {loadingCategories ? (
          <p>Loading categories...</p>
        ) : (
          <CategorySidebar categories={categories} slug={slug || "all"} />
        )}
      </aside>
      <main className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {loadingProducts ? (
          <p>Loading products...</p>
        ) : (
          // products.map((product: Product) => (
          //   <ProductCardVertical key={product.syncProduct.id} product={product} />
          // ))
          "nothing yet"
        )}
      </main>
    </div>
  );
}
