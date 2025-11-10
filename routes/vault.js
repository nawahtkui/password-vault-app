import express from "express";
import { savePassword, getPasswords } from "../controllers/vaultController.js";
const router = express.Router();

router.post("/save", savePassword);
router.get("/all", getPasswords);

export default router;
