import { Router } from "express";
import LanguageManagement from "../Domain/Language/index-controller";
const router = Router();

let _LanguageManagement = new LanguageManagement();

router.get("/languages", _LanguageManagement.getLanguages );
router.get("/languages/:type", _LanguageManagement.getLanguageByType );
router.get("/languagesDetail", _LanguageManagement.getDetailLanguages );
router.get("/languagesDetail/:type", _LanguageManagement.getDetailLanguageByType );
// router.post("/languages", getLanguage);
// router.put('/languages/:id', getLanguage)
// router.delete('/languages/:id', getLanguage)

export default router;
