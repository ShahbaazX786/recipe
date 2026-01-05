import express from "express";
import renderTickerJob from "./config/cron.js";
import { ENV } from "./config/env.js";
import recipeRoutes from "./routes/recipe.route.js";

const app = express();
const PORT = ENV.PORT;
if (ENV.NODE_ENV === "production") renderTickerJob.start();

app.use(express.json());
app.use("/api/v1/favorites", recipeRoutes);

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is up and running" });
});

app.listen(PORT, () => {
  console.log("Server Running at PORT:", PORT);
});
