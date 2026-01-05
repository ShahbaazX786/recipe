import { Router } from "express";
import { addToFavorite } from "../controllers/recipe.controller.js";

const recipeRouter = Router();

recipeRouter.post("/add", addToFavorite);

export default recipeRouter;