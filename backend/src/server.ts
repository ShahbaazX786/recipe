import express from "express";
import { ENV } from "./config/env.js";
import recipeRoutes from './routes/recipe.route.js'

const app = express();
const PORT = ENV.PORT;

app.use(express.json())

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is up and running" });
});

app.use('/api/v1/favorites', recipeRoutes);

app.listen(PORT, () => {
  console.log("Server Running at PORT:", PORT);
});
