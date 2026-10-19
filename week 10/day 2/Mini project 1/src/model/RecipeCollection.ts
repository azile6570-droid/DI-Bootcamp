import { RecipeItem } from './RecipeItem'

type StoredRecipe = {
  id: string
  title: string
  ingredients: string[]
  instructions: string
  isFavorite: boolean
}

const STORAGE_KEY = 'gather-recipes'

function isStoredRecipe(value: unknown): value is StoredRecipe {
  if (typeof value !== 'object' || value === null) return false

  const recipe = value as Record<string, unknown>
  return (
    typeof recipe.id === 'string' &&
    recipe.id.length > 0 &&
    typeof recipe.title === 'string' &&
    Array.isArray(recipe.ingredients) &&
    recipe.ingredients.every((ingredient) => typeof ingredient === 'string') &&
    typeof recipe.instructions === 'string' &&
    typeof recipe.isFavorite === 'boolean'
  )
}

export class RecipeCollection {
  private recipes: RecipeItem[] = []

  constructor(
    private readonly storage: Storage,
    private readonly storageKey = STORAGE_KEY,
  ) {}

  getAll(): RecipeItem[] {
    return [...this.recipes]
  }

  load(): RecipeItem[] {
    const savedRecipes = this.storage.getItem(this.storageKey)
    if (savedRecipes === null) {
      this.recipes = []
      return this.getAll()
    }

    const parsed: unknown = JSON.parse(savedRecipes)
    if (!Array.isArray(parsed) || !parsed.every(isStoredRecipe)) {
      throw new Error('Saved recipes are not in the expected format. Clear your recipes to start fresh.')
    }

    this.recipes = parsed.map(
      (recipe) => new RecipeItem(recipe.title, recipe.ingredients, recipe.instructions, recipe.isFavorite, recipe.id),
    )
    return this.getAll()
  }

  add(title: string, ingredients: string[], instructions: string): RecipeItem {
    const recipe = new RecipeItem(title, ingredients, instructions)
    this.recipes.unshift(recipe)
    try {
      this.save()
    } catch (error) {
      this.recipes.shift()
      throw error
    }
    return recipe
  }

  remove(id: string): boolean {
    const index = this.recipes.findIndex((recipe) => recipe.id === id)
    if (index === -1) return false

    const [removed] = this.recipes.splice(index, 1)
    try {
      this.save()
    } catch (error) {
      this.recipes.splice(index, 0, removed)
      throw error
    }
    return true
  }

  toggleFavorite(id: string): RecipeItem | undefined {
    const recipe = this.recipes.find((item) => item.id === id)
    if (!recipe) return undefined

    recipe.isFavorite = !recipe.isFavorite
    try {
      this.save()
    } catch (error) {
      recipe.isFavorite = !recipe.isFavorite
      throw error
    }
    return recipe
  }

  clear(): void {
    const previousRecipes = this.recipes
    this.recipes = []
    try {
      this.save()
    } catch (error) {
      this.recipes = previousRecipes
      throw error
    }
  }

  private save(): void {
    this.storage.setItem(this.storageKey, JSON.stringify(this.recipes))
  }
}
