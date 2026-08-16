import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/User.js";

dotenv.config();

export const seedAdminUser = async () => {
  const adminEmail = "admin@gmail.com";

  let user = await User.findOne({ email: adminEmail });

  if (user) {
    user.firstName = "System";
    user.lastName = "Admin";
    user.role = "Admin";
    user.status = "Active";
    user.password = "Admin@123";

    await user.save();

    return {
      message: "Admin user updated successfully",
      user: {
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  user = new User({
    firstName: "System",
    lastName: "Admin",
    email: adminEmail,
    phone: "+1 234 567 8900",
    role: "Admin",
    status: "Active",
    password: "Admin@123",
  });

  await user.save();

  return {
    message: "Admin user created successfully",
    user: {
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  };
};

const runSeed = async () => {
  try {
    const mongoUri =
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/user_management_db";
    console.log("Connected to MongoDB");
    await mongoose.connect(mongoUri);

    const result = await seedAdminUser();

    console.log(result.message);

    process.exit(0);
  } catch (error) {
    console.error("Seed failed", error);
    process.exit(1);
  }
};

if (
  process.argv[1] &&
  (process.argv[1].endsWith("seedUsers.ts") ||
    process.argv[1].endsWith("seedUsers.js"))
) {
  runSeed();
}
