import { ENUMS } from "../constants";

export interface Item {
  variantId: number;
  quantity: number;
}

export interface Recipient {
  country_code: string;
}

export interface ShippingRatesRequest {
  recipient: Recipient;
  items: Item[];
  storeId: string;
}

export interface CreateOrderRequest {
  externalId: string;
  shipping: string;
  recipient: {
    name: string;
    company?: string;
    address1: string;
    address2?: string;
    city: string;
    stateCode: string;
    stateName?: string;
    countryCode: string;
    countryName?: string;
    zip: string;
    phone: string;
    email: string;
    taxNumber?: string;
  };
  items: {
    id: number;
    externalId: string;
    variantId: number;
    syncVariantId?: number;
    externalVariantId?: string;
    warehouseProductVariantId?: number;
    productTemplateId?: number;
    externalProductId?: string;
    quantity: number;
    price: string;
    retailPrice?: string;
    name: string;
    product?: {
      variantId: number;
      productId: number;
      image: string;
      name: string;
    };
    files?: {
      type: string;
      url: string;
      options?: {
        id: string;
        value: string;
      }[];
      filename?: string;
      visible?: boolean;
      position?: {
        areaWidth: number;
        areaHeight: number;
        width: number;
        height: number;
        top: number;
        left: number;
        limitToPrintArea?: boolean;
      };
    }[];
    options?: {
      id: string;
      value: string;
    }[];
    sku?: string | null;
    discontinued?: boolean;
    outOfStock?: boolean;
  }[];
  retailCosts?: {
    currency: string;
    subtotal: string;
    discount: string;
    shipping: string;
    tax: string;
  };
  gift?: {
    subject: string;
    message: string;
  };
  packingSlip?: {
    email: string;
    phone: string;
    message?: string;
    logoUrl?: string;
    storeName?: string;
    customOrderId?: string;
  };
}

export interface SyncProductRequest {
  syncProduct: {
    externalId: string;
    name: string;
    thumbnail: string;
    isIgnored: boolean;
  };
  syncVariants: SyncVariant[];
}

interface SyncVariant {
  externalId: string;
  variantId: number;
  retailPrice: string;
  isIgnored: boolean;
  sku: string;
  files: SyncFile[];
  options: SyncOption[];
  availabilityStatus: string;
}

interface SyncFile {
  type: string;
  url: string;
  options: SyncOption[];
  filename: string;
  visible: boolean;
}

interface SyncOption {
  id: string;
  value: string;
}
export interface SyncProductRequest {
  name: string;
  variants: Item[];
  thumbnail?: string;
  description?: string;
}

export type ProductStatus = (typeof ENUMS.PRODUCT_STATUS)[number];
