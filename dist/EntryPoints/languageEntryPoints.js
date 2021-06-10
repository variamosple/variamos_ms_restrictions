"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const languageUseCases_1 = __importDefault(require("../Domain/Language/languageUseCases"));
const router = express_1.Router();
let _LanguageManagement = new languageUseCases_1.default();
router.get("/languages", _LanguageManagement.getLanguages);
// router.get("/testcicd", _LanguageManagement.testcicd);
router.get("/languages/detail", _LanguageManagement.getDetailLanguages);
router.get("/languages/:type", _LanguageManagement.getLanguageByType);
router.get("/languages/:type/detail", _LanguageManagement.getDetailLanguageByType);
router.post("/languages", _LanguageManagement.createLanguage);
router.put("/languages/:id", _LanguageManagement.updateLanguage);
router.delete("/languages/:id", _LanguageManagement.deleteLanguage);
exports.default = router;
