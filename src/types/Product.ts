export interface Product {
    syncProduct: {
      id: number;
      externalId: string;
      name: string;
      variants: number;
      synced: number;
      thumbnailUrl: string;
      isIgnored: boolean;
    };
    syncVariants: SyncVariant[];
  }
  
  interface SyncVariant {
    id: number;
    externalId: string;
    syncProductId: number;
    name: string;
    synced: boolean;
    variantId: number;
    retailPrice: string;
    currency: string;
    isIgnored: boolean;
    sku: string;
    product: {
      variantId: number;
      productId: number;
      image: string;
      name: string;
    };
    files: FileDetails[];
    options: ProductOption[];
    mainCategoryId: number;
    warehouseProductId: number;
    warehouseProductVariantId: number;
    size: string;
    color: string;
    availabilityStatus: string;
  }
  
  interface FileDetails {
    type: string;
    id: number;
    url: string;
    options: FileOption[];
    hash: string;
    filename: string;
    mimeType: string;
    size: number;
    width: number;
    height: number;
    dpi: number;
    status: string;
    created: number;
    thumbnailUrl: string;
    previewUrl: string;
    visible: boolean;
    isTemporary: boolean;
    stitchCountTier: string;
  }
  
  interface FileOption {
    id: string;
    value: string;
  }
  
  interface ProductOption {
    id: string;
    value: string;
  }
  