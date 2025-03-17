import logger from "./logger";

/**
 * Safely parses a JSON string.
 * @param jsonString The stringified JSON input
 * @param fallback The fallback value in case of an error (default: empty array)
 * @returns Parsed JSON object or fallback value
 */
export const safeJsonParse = <T>(
  jsonString: string | undefined,
  fallback: T
): T => {
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

/**
 * Converts object keys to snake_case recursively.
 */
function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[-\s]+/g, "_")
    .toLowerCase();
}

/**
 * Recursively transforms object keys to snake_case.
 */
export function transformToSnakeCase<T>(data: T): any {
  if (Array.isArray(data)) {
    return data.map((item) => transformToSnakeCase(item));
  } else if (data !== null && typeof data === "object") {
    return Object.keys(data).reduce<Record<string, any>>((acc, key) => {
      const snakeKey = toSnakeCase(key);
      acc[snakeKey] = transformToSnakeCase((data as Record<string, any>)[key]);
      return acc;
    }, {});
  }
  return data;
}
