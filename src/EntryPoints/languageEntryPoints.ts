import { Router } from "express";
import LanguageManagement from "../Domain/Language/languageUseCases";
const router = Router();

let _LanguageManagement = new LanguageManagement();

router.get("/languages", _LanguageManagement.getLanguages);
router.get("/languages/detail", _LanguageManagement.getDetailLanguages);
router.get("/languages/:type", _LanguageManagement.getLanguageByType);

router.get(
  "/languages/:type/detail",
  _LanguageManagement.getDetailLanguageByType
);
router.post("/languages", _LanguageManagement.createLanguage);
router.put("/languages/:id", _LanguageManagement.updateLanguage);
router.delete("/languages/:id", _LanguageManagement.deleteLanguage);

export default router;
