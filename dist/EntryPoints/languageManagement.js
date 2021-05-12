"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = __importDefault(require("../Domain/Language/index-controller"));
const router = express_1.Router();
let _LanguageManagement = new index_controller_1.default();
router.get("/languages", _LanguageManagement.getLanguages);
router.get("/languages/:type", _LanguageManagement.getLanguageByType);
router.get("/languagesDetail", _LanguageManagement.getDetailLanguages);
router.get("/languagesDetail/:type", _LanguageManagement.getDetailLanguageByType);
// router.post("/languages", getLanguage);
// router.put('/languages/:id', getLanguage)
// router.delete('/languages/:id', getLanguage)
exports.default = router;
