import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Product from "../models/Product.js";
import User from "../models/User.js";

dotenv.config();

//Produktdata
// Anpassad från db.json – notes är nu capitalized för att matcha enum
const products = [
  {
    name: "Bleu de Chanel",
    brand: "Chanel",
    price: 149,
    volume: 100,
    description:
      "A woody aromatic fragrance for the man who defies convention. Fresh, clean and deeply sophisticated.",
    categories: ["Men"],
    notes: ["Woody", "Citrus", "Fresh"],
    popular: true,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400",
  },
  {
    name: "Coco Mademoiselle",
    brand: "Chanel",
    price: 159,
    volume: 100,
    description:
      "An intense, sensual fragrance with a zesty, fresh start. A modern, free-spirited character.",
    categories: ["Women"],
    notes: ["Rose", "Jasmine", "Vanilla"],
    popular: true,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=400",
  },
  {
    name: "Acqua di Gio",
    brand: "Giorgio Armani",
    price: 119,
    volume: 100,
    description:
      "Inspired by the Mediterranean sea. A timeless aquatic fragrance that evokes freedom and nature.",
    categories: ["Men"],
    notes: ["Citrus", "Fresh", "Woody"],
    popular: false,
    image: "https://images.unsplash.com/photo-1594913257021-96a84a937e26?w=400",
  },
  {
    name: "Black Opium",
    brand: "Yves Saint Laurent",
    price: 139,
    volume: 50,
    description:
      "An addictive feminine fragrance. The warmth of coffee and the sensuality of vanilla.",
    categories: ["Women"],
    notes: ["Vanilla", "Sweet", "Musky"],
    popular: true,
    image: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=400",
  },
  {
    name: "CK One",
    brand: "Calvin Klein",
    price: 79,
    volume: 100,
    description:
      "A shared fragrance for a man and a woman. Fresh, clean and modern — a true classic.",
    categories: ["Unisex"],
    notes: ["Citrus", "Fresh", "Musky"],
    popular: false,
    image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=400",
  },
  {
    name: "Flowerbomb",
    brand: "Viktor & Rolf",
    price: 169,
    volume: 50,
    description:
      "An explosion of flowers. A rich floral bouquet that's both powerful and deeply feminine.",
    categories: ["Women"],
    notes: ["Floral", "Rose", "Jasmine", "Amber"],
    popular: true,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400",
  },
  {
    name: "La Vie Est Belle",
    brand: "Lancôme",
    price: 129,
    volume: 75,
    description:
      "Life is beautiful. A radiant fragrance built around iris, praline and sandalwood.",
    categories: ["Women"],
    notes: ["Floral", "Vanilla", "Musky"],
    popular: false,
    image: "https://images.unsplash.com/photo-1566977776052-6e61e35bf9be?w=400",
  },
  {
    name: "Molecule 01",
    brand: "Escentric Molecules",
    price: 189,
    volume: 100,
    description:
      "A single molecule fragrance. Reacts uniquely with each individual's skin chemistry.",
    categories: ["Unisex"],
    notes: ["Woody", "Musky"],
    popular: true,
    image: "https://images.unsplash.com/photo-1705338670422-01133208eab9?w=400",
  },
];

// testanvändare
// Ska kunna logga in med username: "user", password: "password"
const testUser = {
  firstName: "Test",
  lastName: "User",
  username: "user",
  email: "user@aura.com",
  password: "password", // hashas nedan innan sparning
};

// seed funktion
const seed = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("MongoDB connected!");

    // Rensar befintlig data så vi inte får dubbletter vid omseed
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Old data cleared.");

    // Skapar produkter
    await Product.insertMany(products);
    console.log(`${products.length} products inserted.`);

    // Hashar lösenordet innan vi sparar användaren
    // bcrypt.hash(lösenord, saltRounds) – 10 är ett bra standardvärde
    const hashedPassword = await bcrypt.hash(testUser.password, 10);
    await User.create({ ...testUser, password: hashedPassword });
    console.log("Test user created: username='user', password='password'");

    console.log("Seed complete!");
    process.exit(0); // Avslutar scriptet framgångsrikt
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seed();
