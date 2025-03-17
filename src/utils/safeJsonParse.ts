import logger from "./logger";

/**
 * Safely parses a JSON string.
 * @param jsonString The stringified JSON input
 * @param fallback The fallback value in case of an error (default: empty array)
 * @returns Parsed JSON object or fallback value
 */
export const safeJsonParse = <T>(jsonString: string | undefined, fallback: T): T => {
    try {
      if (!jsonString) {
        logger.warn("safeJsonParse: Received undefined or empty string");
        return fallback;
      }
      return JSON.parse(jsonString) as T;
    } catch (error) {
      logger.error(`safeJsonParse: Failed to parse JSON - ${error}`);
      return fallback;
    }
  };