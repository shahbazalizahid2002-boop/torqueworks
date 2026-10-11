import express from "express";
import {
  createBooking,
  getMyBookings,
  cancelBooking,
  getAllBookings,
  updateBooking,
} from "../controllers/bookingController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createBooking).get(protect, adminOnly, getAllBookings);
router.get("/my", protect, getMyBookings);
router.patch("/:id/cancel", protect, cancelBooking);
router.patch("/:id", protect, adminOnly, updateBooking);

export default router;