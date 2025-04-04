import { Request, Response, NextFunction } from "express";
import axios from "axios";

export const proxyImageMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const imageUrl = req.query.url as string;

    if (!imageUrl) {
      next( "Image URL is required")
    }

    // Fetch image using Axios
    const response = await axios.get(imageUrl, { responseType: "stream" });

    // Set appropriate headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Content-Type",
      response.headers["content-type"] || "image/jpeg"
    );
    res.setHeader("Cache-Control", "public, max-age=86400");

    // Pipe the image directly to the response
    response.data.pipe(res);
  } catch (error) {
    console.error("❌ Error fetching image:", error);
    next(error); // Pass the error to Express error handler
  }
};
