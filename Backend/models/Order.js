import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // Koppling till användare – optional, null om gäst
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },

    delivery: {
      firstName: { type: String, required: [true, "Please add a first name"] },
      lastName: { type: String, required: [true, "Please add a last name"] },
      streetAddress: {
        type: String,
        required: [true, "Please add a street address"],
      },
      postalCode: {
        type: String,
        required: [true, "Please add a postal code"],
      },
      city: { type: String, required: [true, "Please add a city"] },
      email: { type: String, required: [true, "Please add an email"] },
      phone: { type: String, required: [true, "Please add a phone number"] },
    },

    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: { type: String, required: [true, "Please add a name"] },
        brand: { type: String, required: [true, "Please add a brand"] },
        price: { type: Number, required: [true, "Please add a price"] },
        quantity: { type: Number, required: [true, "Please add a quantity"] },
        itemTotal: {
          type: Number,
          required: [true, "Please add an itemTotal"],
        }, // price * quantity
      },
    ],

    paymentMethod: {
      type: String,
      required: [true, "Please add a paymentMethod"],
      enum: ["card", "swish"], // Enda giltiga värdena
    },

    orderTotal: { type: Number, required: true },
  },
  { timestamps: true }, // Ger oss createdAt automatiskt
);

export default mongoose.model("Order", orderSchema);
