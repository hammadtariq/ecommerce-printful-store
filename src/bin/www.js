#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app")); // Ensure this file exists as app.ts
const debug_1 = __importDefault(require("debug"));
const http_1 = __importDefault(require("http"));
const debugLog = (0, debug_1.default)("ecommerce-server:server");
/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || "3000");
app_1.default.set("port", port);
/**
 * Create HTTP server.
 */
const server = http_1.default.createServer(app_1.default);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
console.log(`🚀 Server running at http://localhost:${port}`);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port))
        return val; // Named pipe
    if (port >= 0)
        return port; // Port number
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    // Handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    if (addr) {
        const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
        debugLog(`Listening on ${bind}`);
    }
}
