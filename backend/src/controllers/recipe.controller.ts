import { and, eq } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../config/db.js";
import { favoritesTable } from "../db/schema.js";

const addToFavorites = async (req: Request, res: Response) => {
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
    res.status(500).json({
      success: false,
      message:
        "Something went wrong while trying to add the item to the favorite list",
    });
  }
};

const removeFromFavorites = async (req: Request, res: Response) => {
  try {
    const { userId, recipeId } = req.params;

    await db
      .delete(favoritesTable)
      .where(
        and(
          eq(favoritesTable.userId, userId),
          eq(favoritesTable.recipeId, parseInt(recipeId))
        )
      );

    res.status(200).json({
      success: true,
      message: "Removed From Favorites Sucessfully",
    });
  } catch (error) {
    console.log("Error removing specified favorite");
    res.status(500).json({
      success: false,
      message:
        "Something went wrong while trying to remove the item from the favorite list",
    });
  }
};

const getFavoriteById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const userFavorites = await db
      .select()
      .from(favoritesTable)
      .where(eq(favoritesTable.userId, userId));

    res.status(200).json({
      success: true,
      message: "Fetched Favorites Sucessfully",
      favorites: userFavorites,
    });
  } catch (error) {
    console.log("Error retrieving favorite");
    res.status(500).json({
      success: false,
      message:
        "Something went wrong while trying to retrieve the item from the favorite list",
    });
  }
};

export { addToFavorites, getFavoriteById, removeFromFavorites };

