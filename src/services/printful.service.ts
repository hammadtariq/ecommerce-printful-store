/* eslint-disable @typescript-eslint/no-explicit-any */
import { printfulClient } from "../config/printful";
import { Category } from "../types/categories";
import { CreateOrderRequest } from "../types/orders";
import {
  ProductStatus,
  ShippingRatesRequest,
  SyncProductRequest,
} from "../types/products";
import { sanitizeUrlsInObject, transformToSnakeCase } from "../utils/common";
import logger from "../utils/logger";

export class PrintfulService {
  /**
   * Get all products from Printful store.
   */
  static async getProductsByStore(
    storeId: string,
    status?: ProductStatus,
    categoryId?: string[]
  ) {
    try {
      logger.info("Fetching products by store from Printful...", { storeId });

      const response = await printfulClient.get(`/store/products`, {
        params: { store_id: storeId, category_id: categoryId, status },
      });

      logger.info("Products fetched successfully");
      return response.data;
    } catch (error: any) {
      logger.error(
        "Printful API Error:",
        error.response?.data || error.message
      );
      throw new Error("Failed to fetch products from Printful");
    }
  }

  /**
   * Get details of a specific product.
   */
  static async getProductById(productId: string) {
    try {
      logger.info(`Fetching details for product ID: ${productId}`);

      const response = await printfulClient.get(`/products/${productId}`);

      logger.info("Product details fetched successfully");
      return response.data;
    } catch (error: any) {
      logger.error(
        "Printful API Error:",
        error.response?.data || error.message
      );
      throw new Error("Failed to fetch product details from Printful");
    }
  }

  /**
   * Get placement details of a specific product.
   */
  static async getProductMockupById(
    productId: string,
    storeId: string
  ) {
    try {
      logger.info(`Fetching placement details for product ID: ${productId}`);

      const response = await printfulClient.get(
        `/mockup-generator/templates/${productId}`,
        {
          params: { store_id: storeId },
        }
      );

      logger.info("Product placement details fetched successfully");

      return response.data;
    } catch (error: any) {
      logger.error(
        "Printful API Error:",
        error.response?.data || error.message
      );
      throw new Error(
        "Failed to fetch product placement details from Printful"
      );
    }
  }

  /**
   * Get details of a specific product in a store.
   */
  static async getStoreProductById(productId: string, storeId: string) {
    try {
      logger.info(`Fetching store product details for ID: ${productId}`);

      const response = await printfulClient.get(
        `/store/products/${productId}`,
        {
          params: { store_id: storeId },
        }
      );

      logger.info("Store product details fetched successfully");
      return response.data;
    } catch (error: any) {
      logger.error(
        "Printful API Error:",
        error.response?.data || error.message
      );
      throw new Error("Failed to fetch store product details from Printful");
    }
  }

  /**
   * Get all product categories.
   */
  static async getProductCategories(): Promise<Category[]> {
    try {
      logger.info("Fetching product categories");

      const response = await printfulClient.get<Category[]>("/categories");

      logger.info("Product categories fetched successfully");
      return response.data;
    } catch (error: any) {
      logger.error(
        "Printful API Error:",
        error.response?.data || error.message
      );
      throw new Error("Failed to fetch product categories from Printful");
    }
  }

  /**
   * Get category by id.
   */
  static async getCategoryById(id: string): Promise<Category> {
    try {
      logger.info("Fetching category by id", { id });

      const response = await printfulClient.get<Category>(`/categories/${id}`);

      logger.info("Category by id fetched successfully");
      return response.data;
    } catch (error: any) {
      logger.error(
        "Printful API Error:",
        error.response?.data || error.message
      );
      throw new Error(`Failed to fetch category by id ${id} from Printful`);
    }
  }

  /**
   * Get Printful store information.
   */
  static async getStoreInfo(storeId: string) {
    try {
      logger.info("Fetching store information...", { storeId });

      const response = await printfulClient.get(`/store`, {
        params: { store_id: storeId },
      });

      logger.info("Store information fetched successfully");
      return response.data;
    } catch (error: any) {
      logger.error(
        "Printful API Error:",
        error.response?.data || error.message
      );
      throw new Error("Failed to fetch store information from Printful");
    }
  }

  /**
   * Get details of a specific order.
   */
  static async getOrderById(orderId: string, storeId: string) {
    try {
      logger.info(`Fetching details for order ID: ${orderId}`);

      const response = await printfulClient.get(`/orders/${orderId}`, {
        params: { store_id: storeId },
      });

      logger.info("Order details fetched successfully");
      return response.data;
    } catch (error: any) {
      logger.error(
        "Printful API Error:",
        error.response?.data || error.message
      );
      throw new Error("Failed to fetch order details from Printful");
    }
  }

  /**
   * Get tracking details for an order.
   */
  static async getOrderTracking(orderId: string) {
    try {
      logger.info(`Fetching tracking details for order ID: ${orderId}`);

      const response = await printfulClient.get(`/orders/${orderId}/tracking`);

      logger.info("Order tracking fetched successfully");
      return response.data;
    } catch (error: any) {
      logger.error(
        "Printful API Error:",
        error.response?.data || error.message
      );
      throw new Error("Failed to fetch tracking information from Printful");
    }
  }

  /**
   * Create a new order.
   */
  static async createOrder(
    orderData: CreateOrderRequest,
    storeId: string,
    isConfirmed: boolean = false
  ) {
    try {
      const orderSnakeCase =
        transformToSnakeCase<CreateOrderRequest>(orderData);
      logger.info("Creating new order...", { orderData });

      const response = await printfulClient.post("/orders", orderSnakeCase, {
        headers: { "X-PF-Store-Id": storeId },
        params: { confirm: isConfirmed },
      });

      logger.info("Order created successfully");
      return response.data;
    } catch (error: any) {
      logger.error(
        "Printful API Error:",
        error.response?.data || error.message
      );
      throw new Error("Failed to create order in Printful");
    }
  }

  /**
   * Get shipping rates for an order.
   */
  static async getShippingRates(params: ShippingRatesRequest) {
    try {
      const { recipient, items } = params;
      logger.info("Fetching shipping rates...", { recipient, items });

      const response = await printfulClient.post(`/shipping/rates`, {
        recipient,
        items,
      });

      logger.info("Shipping rates fetched successfully");
      return response.data;
    } catch (error: any) {
      logger.error(
        "Printful API Error:",
        error.response?.data || error.message
      );
      throw new Error("Failed to fetch shipping rates from Printful");
    }
  }

  /**
   * Sync new products with Printful store.
   */
  static async syncProduct(productData: SyncProductRequest, storeId: string) {
    try {
      logger.info("Syncing new product with Printful...", { productData });

      const sanitizedRequestBody =
        sanitizeUrlsInObject<SyncProductRequest>(productData);

      const productSnakeCase =
        transformToSnakeCase<SyncProductRequest>(sanitizedRequestBody);

      const response = await printfulClient.post(
        `/store/products`,
        productSnakeCase,
        { headers: { "X-PF-Store-Id": storeId } }
      );

      logger.info("Product synced successfully");
      return response.data;
    } catch (error: any) {
      logger.error(
        "Printful API Error:",
        error.response?.data?.error?.message || error.message
      );
      throw new Error("Failed to sync product with Printful");
    }
  }
}
