const express = require('express');
// const validate = require('express-validation');
const controller = require('../../controllers/recipe.controller');
const { authorize } = require('../../middlewares/auth');
// const { authorize, LOGGED_USER } = require('../../middlewares/auth');
// const {
//   updateUser,
// } = require('../../validations/user.validation');

const router = express.Router();

router
  .route('/create')
  .post(authorize(), controller.createRecipe);

router
  .route('/list')
  .get(authorize(), controller.recipes);

router
  .route('/:recipeId')
  .put(authorize(), controller.update)
  .delete(authorize(), controller.remove);

module.exports = router;
