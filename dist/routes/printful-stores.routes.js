"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stores_controller_1 = require("../controllers/stores.controller");
const auth_1 = require("../middlewares/auth");
const express_1 = require("express");
const router = (0, express_1.Router)();
// Get store
router.get("/?store_id", auth_1.authenticate, stores_controller_1.getStore);
exports.default = router;
