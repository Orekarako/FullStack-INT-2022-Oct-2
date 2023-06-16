import RecipeModel from './RecipeModel';

export const getRecipes = async (req: any, res: any) => {
  try {
    const recipes = await RecipeModel.find();
    res.status(200).send(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).send({ Error: error.message });
  }
};

export const addRecipe = async (req: any, res: any) => {
  try {
    const { title, description, author } = req.body;
    console.log(title, description, author);

    const recipeDB = await RecipeModel.create({ title, description, author });
    console.log(recipeDB);

    res.status(201).send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ Error: error.message });
  }
};

export const deleteRecipe = async (req: any, res: any) => {
  try {
    const { _id } = req.body;
    await RecipeModel.findByIdAndDelete(_id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send({ Error: error.message });
  }
};

export const getRecipe = async (req: any, res: any) => {
  try {
    const { recipeId } = req.body;
    const recipe = await RecipeModel.findById(recipeId);

    res.send({ ok: true, recipe });

  } catch (error) {
    console.error(error);
    res.status(500).send({ Error: error.message });
  }
};

