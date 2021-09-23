import { Router } from "express";
import RestrictionManagement from "../Domain/Restriction/restrictionUseCases";
const router = Router();

let _RestrictionManagement = new RestrictionManagement();

router.post("/restriction/unique_name", _RestrictionManagement.uniqueName);

router.post(
  "/restriction/quantity_element",
  _RestrictionManagement.quantityElement
);

router.post(
  "/restriction/quantity_target",
  _RestrictionManagement.quantityTarget
);

export default router;
