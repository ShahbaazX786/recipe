import { Request, Response } from "express";
import { db } from "../config/db.js";
import { favoritesTable } from "../db/schema.js";

const addToFavorite = async (req: Request, res: Response) => {
  try {
    const { userId, recipeId, title, image, cookTime, servings } = req.body;
    if (!userId || !recipeId || !title) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Required Fields" });
    }

    const newFavorite = await db
      .insert(favoritesTable)
      .values({ userId, recipeId, title, image, cookTime, servings })
      .returning();

    res.status(201).json({
      success: true,
      message: "Added to Favorites",
      value: newFavorite[0],
    });
  } catch (error) {
    console.log("Error adding favorite");
    res
      .status(500)
      .json({
        success: false,
        message:
          "Something went wrong while trying to add the item to the favorite list",
      });
  }
};

export { addToFavorite };
