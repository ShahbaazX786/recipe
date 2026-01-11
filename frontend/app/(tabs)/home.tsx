import { homeStyles } from "@/assets/styles/home.styles";
import CategoryFilter from "@/components/CategoryFilter";
import LoadingSpinner from "@/components/LoadingSpinner";
import RecipeCard from "@/components/RecipeCard";
import { COLORS } from "@/constants/colors";
import { MealAPI } from "@/services/mealAPI";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const HomeScreen = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<null | string>(null);
  const [recipes, setRecipes] = useState([] as any);
  const [categories, setCategories] = useState([]);
  const [featuredRecipe, setFeaturedRecipe] = useState<null | any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [apiCategories, featuredMeal, randomMeals] = await Promise.all([
        MealAPI.getCategories(),
        MealAPI.getRandomMeal(),
        MealAPI.getRandomMeals(12),
      ]);

      const transformedCategories = apiCategories.map(
        (category: any, index: number) => ({
          id: index + 1,
          name: category?.strCategory,
          image: category?.strCategoryThumb,
          description: category?.strCategoryDescription,
        })
      );
      setCategories(transformedCategories);

      if (!selectedCategory && transformedCategories.length > 0) {
        setSelectedCategory(transformedCategories[0].name);
      }

      const transformedMeals = randomMeals
        .map((meal: any) => MealAPI.transformMealData(meal))
        .filter((meal: any) => meal !== null);
      setRecipes(transformedMeals);

      const transformedFeaturedMeal = MealAPI.transformMealData(featuredMeal);
      setFeaturedRecipe(transformedFeaturedMeal);
    } catch (error) {
      console.error("Error loading the data", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategoryData = async (category: string) => {
    try {
      const meals = await MealAPI.filterByCategory(category);
      const transformedMeals = meals
        .map((meal: any) => MealAPI.transformMealData(meal))
        .filter((meal: any) => meal !== null);
      setRecipes(transformedMeals);
    } catch (error) {
      console.error("Error loading category data", error);
      setRecipes([]);
    }
  };

  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    await loadCategoryData(category);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading && !refreshing)
    return <LoadingSpinner message="Loading delicious recipes" />;

  return (
    <View style={homeStyles.container}>
      <ScrollView
        contentContainerStyle={homeStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
      >
        <View style={homeStyles.welcomeSection}>
          <Image
            source={require("../../assets/images/chicken.png")}
            style={{ width: 100, height: 100 }}
          />
          <Image
            source={require("../../assets/images/lamb.png")}
            style={{ width: 100, height: 100 }}
          />
          <Image
            source={require("../../assets/images/beef.png")}
            style={{ width: 100, height: 100 }}
          />
        </View>

        {featuredRecipe && (
          <View style={homeStyles.featuredSection}>
            <TouchableOpacity
              style={homeStyles.featuredCard}
              activeOpacity={0.9}
              onPress={() => router.push(`/recipe/${featuredRecipe.id}`)}
            >
              <View style={homeStyles.featuredImageContainer}>
                <Image
                  source={{ uri: featuredRecipe.image }}
                  style={homeStyles.featuredImage}
                  contentFit="cover"
                  transition={500}
                />
                <View style={homeStyles.featuredOverlay}>
                  <View style={homeStyles.featuredBadge}>
                    <Text style={homeStyles.featuredBadgeText}>Featured</Text>
                  </View>

                  <View style={homeStyles.featuredContent}>
                    <Text style={homeStyles.featuredTitle} numberOfLines={2}>
                      {featuredRecipe.title}
                    </Text>

                    <View style={homeStyles.featuredMeta}>
                      <View style={homeStyles.metaItem}>
                        <Ionicons
                          name="time-outline"
                          size={16}
                          color={COLORS.white}
                        />
                        <Text style={homeStyles.metaText}>
                          {featuredRecipe.cookTime}
                        </Text>
                      </View>
                      <View style={homeStyles.metaItem}>
                        <Ionicons
                          name="people-outline"
                          size={16}
                          color={COLORS.white}
                        />
                        <Text style={homeStyles.metaText}>
                          {featuredRecipe.cookTime}
                        </Text>
                      </View>
                      {featuredRecipe.area && (
                        <View style={homeStyles.metaItem}>
                          <Ionicons
                            name="location-outline"
                            size={16}
                            color={COLORS.white}
                          />
                          <Text style={homeStyles.metaText}>
                            {featuredRecipe.cookTime}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {categories.length > 0 && (
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        )}

        <View style={homeStyles.recipesSection}>
          <View style={homeStyles.sectionHeader}>
            <Text style={homeStyles.sectionTitle}>{selectedCategory}</Text>
          </View>

          <FlatList
            data={recipes}
            renderItem={({ item }) => <RecipeCard recipe={item} />}
            keyExtractor={(item: any) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={homeStyles.row}
            contentContainerStyle={homeStyles.recipesGrid}
            scrollEnabled={false}
            ListEmptyComponent={
              <View style={homeStyles.emptyState}>
                <Ionicons
                  name="restaurant-outline"
                  size={64}
                  color={COLORS.textLight}
                />
                <Text style={homeStyles.emptyTitle}>No recipes found</Text>
                <Text style={homeStyles.emptyDescription}>
                  Try a different category
                </Text>
              </View>
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
