import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add a firstName"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please add a lastName"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Please add a username"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      lowercase: true, // Sparar alltid som små bokstäver
      trim: true, // Tar bort dolda mellanslag
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      select: false, // Exkluderas automatiskt vid vanliga databas-sökningar
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true, // Skapar automatiskt createdAt och updatedAt fält
  },
);

export default mongoose.model("User", userSchema);
