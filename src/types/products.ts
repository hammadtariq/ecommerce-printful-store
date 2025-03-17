export interface Item {
    variant_id: number;
    quantity: number;
  }
  
  export interface Recipient {
    country_code: string;
  }
  
  export interface ShippingRatesRequest {
    recipient: Recipient;
    items: Item[];
    store_id: string;
  }
  