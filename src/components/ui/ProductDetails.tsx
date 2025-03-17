import {
  SfRating,
  SfButton,
  SfLink,
  SfCounter,
  SfIconShoppingCart,
  SfIconCompareArrows,
  SfIconFavorite,
  SfIconPackage,
  SfIconRemove,
  SfIconAdd,
  SfIconWarehouse,
  SfIconSafetyCheck,
  SfIconShoppingCartCheckout,
} from "@storefront-ui/react";
import { useCounter } from "react-use";
import type { ChangeEvent } from "react";
import { useId } from "react";
import { clamp } from "@storefront-ui/shared";
import { Product } from "../../types/Product";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const inputId = useId();
  const min = 1;
  const max = 999;
  const [value, { inc, dec, set }] = useCounter(min);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = parseFloat(event.target.value);
    set(Number(clamp(nextValue, min, max)));
  };

  return (
    <section className="md:max-w-[640px]">
      <h1 className="mb-1 font-bold typography-headline-4">{product.syncProduct.name}</h1>
      <strong className="block font-bold typography-headline-3">
        ${product.syncVariants[0].retailPrice}
      </strong>

      <div className="inline-flex items-center mt-4 mb-2">
        <SfRating size="xs" value={5} max={5} />
        <SfCounter className="ml-1" size="xs">
          {/* {product.rating.count} */}
        </SfCounter>
        <SfLink
          href="#"
          variant="secondary"
          className="ml-2 text-xs text-neutral-500"
        >
          5 reviews
        </SfLink>
      </div>

      <p
        className="mb-4 font-normal typography-text-sm"
        dangerouslySetInnerHTML={{ __html: product.syncVariants[0].availabilityStatus }}
      ></p>

      <div className="py-4 mb-4 border-gray-200 border-y">
        <div className="bg-primary-100 text-primary-700 flex justify-center gap-1.5 py-1.5 typography-text-sm items-center mb-4 rounded-md">
          <SfIconShoppingCartCheckout /> 1 in cart
        </div>

        <div className="items-start xs:flex">
          <div className="flex flex-col items-stretch xs:items-center xs:inline-flex">
            <div className="flex border border-neutral-300 rounded-md">
              <SfButton
                variant="tertiary"
                square
                className="rounded-r-none p-3"
                disabled={value <= min}
                aria-controls={inputId}
                aria-label="Decrease value"
                onClick={() => dec}
              >
                <SfIconRemove />
              </SfButton>
              <input
                id={inputId}
                type="number"
                role="spinbutton"
                className="grow mx-2 w-8 text-center bg-transparent font-medium appearance-none focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
                min={min}
                max={max}
                value={value}
                onChange={handleOnChange}
              />
              <SfButton
                variant="tertiary"
                square
                className="rounded-l-none p-3"
                disabled={value >= max}
                aria-controls={inputId}
                aria-label="Increase value"
                onClick={() => inc}
              >
                <SfIconAdd />
              </SfButton>
            </div>
            <p className="self-center mt-1 mb-4 text-xs text-neutral-500 xs:mb-0">
              <strong className="text-neutral-900">{max}</strong> in stock
            </p>
          </div>
          <SfButton
            size="lg"
            className="w-full xs:ml-4"
            slotPrefix={<SfIconShoppingCart size="sm" />}
          >
            Add to cart
          </SfButton>
        </div>

        <div className="flex justify-center mt-4 gap-x-4">
          <SfButton
            size="sm"
            variant="tertiary"
            slotPrefix={<SfIconCompareArrows size="sm" />}
          >
            Compare
          </SfButton>
          <SfButton
            size="sm"
            variant="tertiary"
            slotPrefix={<SfIconFavorite size="sm" />}
          >
            Add to list
          </SfButton>
        </div>
      </div>

      <div className="flex first:mt-4">
        <SfIconPackage
          size="sm"
          className="flex-shrink-0 mr-1 text-neutral-500"
        />
        <p className="text-sm">
          Free shipping, arrives by Thu, Apr 7. Want it faster?
          <SfLink href="#" variant="secondary" className="mx-1">
            Add an address
          </SfLink>
          to see options
        </p>
      </div>

      <div className="flex mt-4">
        <SfIconWarehouse
          size="sm"
          className="flex-shrink-0 mr-1 text-neutral-500"
        />
        <p className="text-sm">
          Pickup not available at your shop.
          <SfLink href="#" variant="secondary" className="ml-1">
            Check availability nearby
          </SfLink>
        </p>
      </div>

      <div className="flex mt-4">
        <SfIconSafetyCheck
          size="sm"
          className="flex-shrink-0 mr-1 text-neutral-500"
        />
        <p className="text-sm">
          Free 30-days returns.
          <SfLink href="#" variant="secondary" className="ml-1">
            Details
          </SfLink>
        </p>
      </div>
    </section>
  );
}
