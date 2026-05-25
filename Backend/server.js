//Importerar paketen
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//aktiverar dotenv så att vi faktiskt kan läsa från .env filen
dotenv.config();

//Skapar express-app
const app = express();

//MIDDLEWARE
//Nedan låter appen läsa JSON i request-bodyn, t.ex. när man skickar in ett formulär, annars hade det inte gått att tolka.
app.use(express.json());

//tillåter react-appen som är en annan port att prata med denna server genom cors
app.use(cors());

//test för att bekräfta funktionalitet
app.get("/", (req,res)=>{
    res.json({message:"AURA API is running"});
});

//Startar servern på port 5000 (eller vad .env säger, just nu tom)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});