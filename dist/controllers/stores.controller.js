"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStore = void 0;
const printful_service_1 = require("../services/printful.service");
const getStore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Fetching store by id from Printful...");
        const storeId = req.params.store_id;
        const storeInfo = yield printful_service_1.PrintfulService.getStoreInfo(storeId);
        res.status(200).json(storeInfo);
    }
    catch (error) {
        next(error);
    }
});
exports.getStore = getStore;
