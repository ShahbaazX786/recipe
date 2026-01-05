import express from "express";
import { ENV } from "./config/env.js";

const app = express();
const PORT = ENV.PORT;

app.listen(PORT, () => {
  console.log("Server Running at PORT:", PORT);
});
