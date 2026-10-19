import type { RecipeItem } from '../model/RecipeItem'

type RecipeActions = {
  onToggleFavorite: (id: string) => void
  onDelete: (id: string) => void
}

export class RecipeTemplate {
  constructor(
    private readonly container: HTMLElement,
    private readonly actions: RecipeActions,
  ) {}

  render(recipes: RecipeItem[]): void {
    this.container.replaceChildren()

    if (recipes.length === 0) {
      const emptyState = document.createElement('div')
      emptyState.className = 'empty-state'

      const icon = document.createElement('span')
      icon.className = 'empty-icon'
      icon.setAttribute('aria-hidden', 'true')
      icon.textContent = '✳'

      const title = document.createElement('h3')
      title.textContent = 'Your recipe book is ready.'

      const message = document.createElement('p')
      message.textContent = 'Add something delicious and it’ll find a home here.'

      emptyState.append(icon, title, message)
      this.container.append(emptyState)
      return
    }

    const list = document.createElement('ul')
    list.className = 'recipe-list-items'

    for (const [index, recipe] of recipes.entries()) {
      list.append(this.createRecipeCard(recipe, index))
    }
    this.container.append(list)
  }

  private createRecipeCard(recipe: RecipeItem, index: number): HTMLLIElement {
    const item = document.createElement('li')
    item.className = 'recipe-card'

    const cardHeader = document.createElement('div')
    cardHeader.className = 'card-header'

    const number = document.createElement('span')
    number.className = `recipe-number recipe-number-${index % 4}`
    number.textContent = String(index + 1).padStart(2, '0')
    number.setAttribute('aria-hidden', 'true')

    const title = document.createElement('h3')
    title.className = 'recipe-title'
    title.textContent = recipe.title

    const favoriteButton = document.createElement('button')
    favoriteButton.className = `favorite-button${recipe.isFavorite ? ' is-favorite' : ''}`
    favoriteButton.type = 'button'
    favoriteButton.textContent = recipe.isFavorite ? '♥' : '♡'
    favoriteButton.setAttribute('aria-pressed', String(recipe.isFavorite))
    favoriteButton.setAttribute(
      'aria-label',
      recipe.isFavorite ? `Remove ${recipe.title} from favorites` : `Add ${recipe.title} to favorites`,
    )
    favoriteButton.addEventListener('click', () => this.actions.onToggleFavorite(recipe.id))

    cardHeader.append(number, title, favoriteButton)

    const details = document.createElement('details')
    details.className = 'recipe-details'

    const summary = document.createElement('summary')
    summary.textContent = 'See recipe'

    const detailContent = document.createElement('div')
    detailContent.className = 'details-content'

    const ingredientsHeading = document.createElement('h4')
    ingredientsHeading.textContent = 'Ingredients'

    const ingredientsList = document.createElement('ul')
    ingredientsList.className = 'ingredients-list'
    for (const ingredient of recipe.ingredients) {
      const ingredientItem = document.createElement('li')
      ingredientItem.textContent = ingredient
      ingredientsList.append(ingredientItem)
    }

    const instructionsHeading = document.createElement('h4')
    instructionsHeading.textContent = 'Instructions'

    const instructions = document.createElement('p')
    instructions.className = 'instructions'
    instructions.textContent = recipe.instructions

    detailContent.append(ingredientsHeading, ingredientsList, instructionsHeading, instructions)
    details.append(summary, detailContent)

    const cardFooter = document.createElement('div')
    cardFooter.className = 'card-footer'

    const ingredientCount = document.createElement('span')
    ingredientCount.textContent = `${recipe.ingredients.length} ${recipe.ingredients.length === 1 ? 'INGREDIENT' : 'INGREDIENTS'}`

    const deleteButton = document.createElement('button')
    deleteButton.className = 'delete-button'
    deleteButton.type = 'button'
    deleteButton.textContent = 'Remove'
    deleteButton.setAttribute('aria-label', `Delete ${recipe.title}`)
    deleteButton.addEventListener('click', () => this.actions.onDelete(recipe.id))

    cardFooter.append(ingredientCount, deleteButton)
    item.append(cardHeader, details, cardFooter)
    return item
  }
}
