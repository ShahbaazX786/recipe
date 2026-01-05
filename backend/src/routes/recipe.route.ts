import { Router } from "express";
import {
    addToFavorites,
    removeFromFavorites,
} from "../controllers/recipe.controller.js";

const recipeRouter = Router();

recipeRouter.post("/add", addToFavorites);
recipeRouter.delete("/:userId/:recipeId", removeFromFavorites);

export default recipeRouter;
