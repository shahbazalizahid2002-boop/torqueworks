import Booking from "../models/Booking.js";
import serviceList, { timeSlots } from "../data/services.js";

const MAX_PER_SLOT = 3; // how many cars the workshop can take in one time slot

// POST /api/bookings  (customer creates a booking)
export const createBooking = async (req, res) => {
  try {
    const { serviceKeys, car, date, timeSlot, notes } = req.body || {};

    const keys = Array.isArray(serviceKeys) ? [...new Set(serviceKeys)] : [];
    const chosen = keys.map((k) => serviceList.find((s) => s.key === k)).filter(Boolean);
    if (chosen.length === 0 || chosen.length !== keys.length) {
      return res.status(400).json({ message: "Please choose at least one valid service" });
    }
    if (!car?.make || !car?.model || !car?.plate) {
      return res.status(400).json({ message: "Please enter your car's make, model and number plate" });
    }
    if (!date || !timeSlots.includes(timeSlot)) {
      return res.status(400).json({ message: "Please choose a date and a time slot" });
    }

    const bookingDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(bookingDate) || bookingDate < today) {
      return res.status(400).json({ message: "Please choose today or a future date" });
    }

    const sameSlot = await Booking.countDocuments({
      date: bookingDate,
      timeSlot,
      status: { $ne: "Cancelled" },
    });
    if (sameSlot >= MAX_PER_SLOT) {
      return res.status(400).json({ message: "This time slot is fully booked. Please choose another time." });
    }

    const booking = await Booking.create({
      user: req.user._id,
      services: chosen.map(({ key, name, price }) => ({ key, name, price })),
      totalPrice: chosen.reduce((sum, s) => sum + s.price, 0),
      car: {
        make: car.make,
        model: car.model,
        year: car.year ? Number(car.year) : undefined,
        plate: car.plate,
      },
      date: bookingDate,
      timeSlot,
      notes,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/bookings/my  (customer's own bookings)
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH /api/bookings/:id/cancel  (customer cancels own booking)
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking || booking.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Booking not found" });
    }
    if (!["Pending", "Confirmed"].includes(booking.status)) {
      return res.status(400).json({ message: "This booking can no longer be cancelled" });
    }

    booking.status = "Cancelled";
    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/bookings  (admin: all bookings)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH /api/bookings/:id  (admin: update status, mechanic, bill)
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const { status, mechanic, finalBill } = req.body || {};
    if (status !== undefined) booking.status = status;
    if (mechanic !== undefined) booking.mechanic = mechanic;
    if (finalBill !== undefined) booking.finalBill = finalBill === "" ? null : Number(finalBill);

    await booking.save();
    await booking.populate("user", "name email phone");
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};