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