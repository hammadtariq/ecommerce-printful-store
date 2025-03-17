import { config } from "../config/env";
import { printfulClient } from "../config/printful";
import { ShippingRatesRequest } from "../types/products";
import logger from "../utils/logger";

export class PrintfulService {

  /**
   * Get all products from Printful store.
   */
  static async getProductsByStore(storeId: string){
    try {
      logger.info("Fetching products by store from Printful...", { storeId });

      const response = await printfulClient.get(`/store/products`, {
        params: { store_id: storeId },
      });
      logger.info("Products fetched successfully");
      return response.data;
    } catch (error: any) {
      logger.error("Printful API Error:", error.response?.data || error.message);
      throw new Error("Failed to fetch products from Printful");
    }
  }

  /**
   * Get details of a specific product.
   * @param productId - The Printful product ID.
   */
  static async getProductById(productId: string, storeId: string) {
    try {
      logger.info(`Fetching details for product ID: ${productId}`);

      const response = await printfulClient.get(`/store/products/${productId}`, {
        params: { store_id: storeId },
      });

      logger.info("Product details fetched successfully");
      return response.data;
    } catch (error: any) {
      logger.error("Printful API Error:", error.response?.data || error.message);
      throw new Error("Failed to fetch product details from Printful");
    }
  }

  /**
   * Get Printful store information.
   */
  static async getStoreInfo(storeId: string) {
    try {
      logger.info("Fetching store information...");

      const response = await printfulClient.get(`/store`,{
        params: { store_id: storeId },
      });

      logger.info("Store information fetched successfully");
      return response.data;
    } catch (error: any) {
      logger.error("Printful API Error:", error.response?.data || error.message);
      throw new Error("Failed to fetch store information from Printful");
    }
  }

  /**
   * Get details of a specific order.
   * @param orderId - The Printful order ID.
   */
  static async getOrderById(orderId: string, storeId: string) {
    try {
      logger.info(`Fetching details for order ID: ${orderId}`);

      const response = await printfulClient.get(`/orders/${orderId}`);

      logger.info("Order details fetched successfully");
      return response.data;
    } catch (error: any) {
      logger.error("Printful API Error:", error.response?.data || error.message);
      throw new Error("Failed to fetch order details from Printful");
    }
  }

  /**
   * Get tracking details for an order.
   * @param orderId - The Printful order ID.
   */
  static async getOrderTracking(orderId: string, storeId: string) {
    try {
      logger.info(`Fetching tracking details for order ID: ${orderId}`);

      const response = await printfulClient.get(`/orders/${orderId}/tracking`);

      logger.info("Order tracking fetched successfully");
      return response.data;
    } catch (error: any) {
      logger.error("Printful API Error:", error.response?.data || error.message);
      throw new Error("Failed to fetch tracking information from Printful");
    }
  }

  /**
   * Get shipping rates for an order.
   * @param recipient - The recipient's country code.
   * @param items - Array of items (variant_id and quantity).
   */
  static async getShippingRates(params: ShippingRatesRequest) {
    try {
      const { recipient, items, store_id } = params;
      logger.info("Fetching shipping rates...", { recipient, items });

      const response = await printfulClient.post(`/shipping/rates`, {
        recipient,
        items,
      });

      logger.info("Shipping rates fetched successfully");
      return response.data;
    } catch (error: any) {
      logger.error("Printful API Error:", error.response?.data || error.message);
      throw new Error("Failed to fetch shipping rates from Printful");
    }
  }
}
