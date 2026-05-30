import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

// protect = middleware som skyddar routes som kräver inloggning, samma som validateToken från gränssnittsprojekt
const protect = asyncHandler(async (req, res, next) => {
  let token;
  // Kollar båda stavningarna av headern (liten/stor A)
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    // Splittar "Bearer <token>" och plockar ut själva token-strängen
    token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }

    // Verifierar token mot vår hemliga nyckel i .env
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Not authorized, invalid token");
      }

      // Lägger användarinfo på req så nästa funktion i kedjan kan nå den
      // t.ex. req.user.id för att koppla en order till rätt användare
      req.user = decoded.user;
      next();
    });
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export default protect;
