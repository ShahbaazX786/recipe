import { Router } from "express";
import {
    addToFavorites,
    getFavoriteById,
    removeFromFavorites,
} from "../controllers/recipe.controller.js";

const recipeRouter = Router();

recipeRouter.get("/:userId", getFavoriteById);
recipeRouter.post("/add", addToFavorites);
recipeRouter.delete("/:userId/:recipeId", removeFromFavorites);

export default recipeRouter;
