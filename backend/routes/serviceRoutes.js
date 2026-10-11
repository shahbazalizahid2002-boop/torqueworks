import express from "express";
import services, { timeSlots } from "../data/services.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ services, timeSlots });
});

export default router;