import mongoose from "mongoose";

// Exporteras så att andra filer (t.ex. seed.js) kan använda samma lista
export const VALID_CATEGORIES = ["Women", "Men", "Unisex"];

export const VALID_NOTES = [
  "Lavender",
  "Citrus",
  "Woody",
  "Sweet",
  "Rose",
  "Vanilla",
  "Jasmine",
  "Sandalwood",
  "Bergamot",
  "Amber",
  "Musky",
  "Spicy",
  "Fresh",
  "Floral"
];

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please add a name"] },
  brand: { type: String, required: [true, "Please add a brand"] },
  price: { type: Number, required: [true, "Please add a price"] },
  image: { type: String, required: [true, "Please add an image URL"] },
  description: { type: String, required: [true, "Please add a description"] },
  volume: { type: Number, required: [true, "Please add a volume"] },
  popular: { type: Boolean, default: false },

  categories: {
    type: [String],
    required: [true, "Please add at least one category"],
    enum: VALID_CATEGORIES, // Mongoose validerar mot denna lista
  },

  notes: {
    type: [String],
    required: [true, "Please add at least one note"],
    enum: VALID_NOTES,
  },
});

export default mongoose.model("Product", productSchema);
