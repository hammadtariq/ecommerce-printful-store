import { Link } from "react-router-dom";
import {
  SfButton,
  SfRating,
  SfCounter,
  SfLink,
  SfIconShoppingCart,
  SfIconFavorite,
} from "@storefront-ui/react";

interface Product {
  id: number;
  image: string;
  title: string;
  rating: {
    rate: number;
    count: number;
  };
  description: string;
  price: number;
}

export default function ProductCardVertical({ product }: { product: Product }) {
  return (
    <div className="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px]">
      <div className="relative">
        <Link to={`/product/${product.id}`} className="block">
          <img
            src={product.image}
            alt={product.title}
            className="object-cover h-auto rounded-md aspect-square w-full"
          />
        </Link>
        <SfButton
          variant="tertiary"
          size="sm"
          square
          className="absolute bottom-0 right-0 mr-2 mb-2 bg-white ring-1 ring-inset ring-neutral-200 !rounded-full"
          aria-label="Add to wishlist"
        >
          <SfIconFavorite size="sm" />
        </SfButton>
      </div>
      <div className="p-4 border-t border-neutral-200">
        <Link to={`/product/${product.id}`} className="no-underline">
          <SfLink variant="secondary">{product.title}</SfLink>
        </Link>
        <div className="flex items-center pt-1">
          <SfRating size="xs" value={product.rating.rate} max={5} />
          <Link to="#" className="pl-1 no-underline">
            <SfCounter size="xs">{product.rating.count}</SfCounter>
          </Link>
        </div>
        <p className="block py-2 font-normal text-neutral-700 text-sm">
          {product.description.length > 100
            ? product.description.slice(0, 100) + "..."
            : product.description}
        </p>
        <span className="block pb-2 font-bold text-lg">${product.price}</span>
        <SfButton size="sm" slotPrefix={<SfIconShoppingCart size="sm" />}>
          Add to cart
        </SfButton>
      </div>
    </div>
  );
}
