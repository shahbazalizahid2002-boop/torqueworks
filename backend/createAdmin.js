import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/User.js";

dotenv.config({ quiet: true });

const ADMIN = {
  name: "Workshop Admin",
  email: "admin@torqueworks.pk",
  phone: "03000000000",
  password: "admin123",
};

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await User.findOne({ email: ADMIN.email });
    if (existing) {
      existing.role = "admin";
      await existing.save();
      console.log("Admin already exists. Role confirmed as admin.");
    } else {
      await User.create({ ...ADMIN, role: "admin" });
      console.log("Admin account created!");
    }

    console.log(`Email:    ${ADMIN.email}`);
    console.log(`Password: ${ADMIN.password}`);
  } catch (error) {
    console.error("Failed:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

run();