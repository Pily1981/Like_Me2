import express from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";
import postRoutes from "./routes/post.routes.js";

dotenv.config();

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto http://localhost:${PORT}.`);
});

