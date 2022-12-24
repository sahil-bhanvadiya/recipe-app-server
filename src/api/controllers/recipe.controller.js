const httpStatus = require('http-status');
const Recipe = require('../models/recipe.model');

exports.createRecipe = async (req, res, next) => {
  try {
    const createRecipe = {
      name: req.body.name,
      imgUrl: req.body.imgUrl,
      description: req.body.description,
      userId: req.user._id,
    };
    const recipe = new Recipe(createRecipe);
    const savedRecipe = await recipe.save();
    res.status(httpStatus.CREATED);
    res.json(savedRecipe);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.recipeId;
    const updatedRecipe = await Recipe.findById(id);
    updatedRecipe.name = req.body.name;
    updatedRecipe.imgUrl = req.body.imgUrl;
    updatedRecipe.description = req.body.description;
    await updatedRecipe.save();
    res.json(updatedRecipe);
  } catch (error) {
    next(error);
  }
};

exports.recipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({ userId: String(req.user._id) });
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const id = req.params.recipeId;
    await Recipe.findByIdAndDelete(id);
    res.json('Deleted!');
  } catch (error) {
    next(error);
  }
};
