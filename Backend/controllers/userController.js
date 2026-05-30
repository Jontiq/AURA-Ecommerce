import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Hjälpfunktion – genererar en JWT-token med användarens id inbakad
// Tokenen är giltig i 30 dagar, iaf lite likt verklighet
const generateToken = (userId) => {
  return jwt.sign({ user: { id: userId } }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

//@desc     Register a new user
//@route    POST /api/users/register
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  // Validering – alla fält måste finnas
  if (!firstName || !lastName || !username || !email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  // Kolla om email eller username redan används
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    res.status(400);
    throw new Error("Email already in use");
  }

  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    res.status(400);
    throw new Error("Username already taken");
  }

  // Hasha lösenordet innan sparning
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    token: generateToken(user._id),
  });
});

//@desc     Login user & get token
//@route    POST /api/users/login
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
  //HÄMTAR DATA från body
  const { username, password } = req.body;
  //VALIDERA INPUT
  if (!username || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  //KONTROLLERA MED DATABAS (CHECK)
  // select("+password") behövs eftersom password har select:false i schemat, lite safety
  const user = await User.findOne({ username }).select("+password");

  //Om vi ej hittar en user
  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  // Jämför inskrivet lösenord med det hashade i databasen
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  res.status(200).json({
    _id: user._id,
    firstName: user.firstName,
    username: user.username,
    email: user.email,
    token: generateToken(user._id), //Blir samma resultat som in gränssnittsprojektet, bara att vi istället anropar en metod här för signering
  });
});

//@desc     Get current logged in user profile
//@route    GET /api/users/me
//@access   Private
const getMe = asyncHandler(async (req, res) => {
  // req.user.id sätts av protect-middleware
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    favorites: user.favorites,
  });
});

export { registerUser, loginUser, getMe };
