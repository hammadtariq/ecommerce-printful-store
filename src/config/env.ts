import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT,
  printfulApiKey: process.env.PRINTFUL_API_KEY || "",
  printfulStoreId: process.env.PRINTFUL_STORE_ID || "", // Add this
};
