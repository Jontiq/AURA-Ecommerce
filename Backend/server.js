import express from "express";
import cors from "cors"; //Cross-Origin Resource Sharing
import dotenv from "dotenv"; //Hämtar "hemliga" miljövaribler
import mongoose from "mongoose"; //Kommunicering till mongodb 

//ROUTES
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config(); //Läser in min .env fil

const app = express(); //Skapar serverinstans

app.use(express.json()); //Omvandlar svar till JSON
app.use(cors()); //Aktiverar CORS skyddtill app
//Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// Databasanslutningen skapad
// mongoose.connect() returnerar ett Promise, så vi använder async/await. Lägger här istället för i nån config.
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); //Stänger servern om DB-kopplingen misslyckas
  }
};

connectDB(); //Ansluter

// Test-route
app.get("/", (req, res) => {
  res.json({ message: "AURA API is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
