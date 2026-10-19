import { RecipeCollection } from './model/RecipeCollection'
import { RecipeTemplate } from './templates/RecipeTemplate'
import './style.css'

function requireElement<T extends Element>(element: T | null, selector: string): T {
  if (!element) {
    throw new Error(`The recipe app is missing the required element: ${selector}`)
  }
  return element
}

const form = requireElement(document.querySelector<HTMLFormElement>('#recipeEntryForm'), '#recipeEntryForm')
const titleInput = requireElement(document.querySelector<HTMLInputElement>('#recipeTitle'), '#recipeTitle')
const ingredientsInput = requireElement(document.querySelector<HTMLTextAreaElement>('#ingredients'), '#ingredients')
const instructionsInput = requireElement(document.querySelector<HTMLTextAreaElement>('#instructions'), '#instructions')
const recipeContainer = requireElement(document.querySelector<HTMLElement>('#recipeContainer'), '#recipeContainer')
const clearButton = requireElement(document.querySelector<HTMLButtonElement>('#clearRecipesButton'), '#clearRecipesButton')
const recipeCount = requireElement(document.querySelector<HTMLElement>('#recipeCount'), '#recipeCount')
const appMessage = requireElement(document.querySelector<HTMLElement>('#appMessage'), '#appMessage')

const collection = new RecipeCollection(window.localStorage)
const template = new RecipeTemplate(recipeContainer, {
  onToggleFavorite: (id) => {
    try {
      const recipe = collection.toggleFavorite(id)
      if (recipe) {
        render()
        showMessage(recipe.isFavorite ? 'Added to your favorites.' : 'Removed from your favorites.')
      }
    } catch (error) {
      showError(error)
    }
  },
  onDelete: (id) => {
    try {
      if (collection.remove(id)) {
        render()
        showMessage('Recipe removed from your book.')
      }
    } catch (error) {
      showError(error)
    }
  },
})

function render(): void {
  const recipes = collection.getAll()
  template.render(recipes)
  recipeCount.textContent = `${recipes.length} ${recipes.length === 1 ? 'RECIPE' : 'RECIPES'}`
}

function showMessage(message: string): void {
  appMessage.textContent = message
  appMessage.classList.remove('is-error')
}

function showError(error: unknown): void {
  const message = error instanceof Error ? error.message : 'Something went wrong while saving your recipes.'
  appMessage.textContent = message
  appMessage.classList.add('is-error')
}

try {
  collection.load()
} catch (error) {
  showError(error)
}
render()

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const title = titleInput.value.trim()
  const ingredients = ingredientsInput.value
    .split(/\r?\n/)
    .map((ingredient) => ingredient.trim())
    .filter(Boolean)
  const instructions = instructionsInput.value.trim()

  if (!title || ingredients.length === 0 || !instructions) {
    showError(new Error('Add a recipe name, at least one ingredient, and cooking instructions.'))
    return
  }

  try {
    collection.add(title, ingredients, instructions)
    render()
    form.reset()
    showMessage(`${title} was added to your recipe book.`)
    titleInput.focus()
  } catch (error) {
    showError(error)
  }
})

clearButton.addEventListener('click', () => {
  if (collection.getAll().length > 0 && !window.confirm('Clear every recipe from your book? This cannot be undone.')) {
    return
  }

  try {
    collection.clear()
    render()
    showMessage('Your recipe book is clear and ready for something new.')
  } catch (error) {
    showError(error)
  }
})
