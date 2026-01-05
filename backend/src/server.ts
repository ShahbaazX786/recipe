import express from "express";
import { ENV } from "./config/env.js";

const app = express();
const PORT = ENV.PORT;

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is up and running" });
});

app.listen(PORT, () => {
  console.log("Server Running at PORT:", PORT);
});
