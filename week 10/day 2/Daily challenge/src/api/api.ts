import type { Recipe, SpoonacularSearchResponse } from '../types/types'

const API_BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch'

function isRecipe(value: unknown): value is Recipe {
  if (typeof value !== 'object' || value === null) return false

  const recipe = value as Record<string, unknown>
  return (
    typeof recipe.id === 'number' &&
    typeof recipe.title === 'string' &&
    typeof recipe.image === 'string' &&
    typeof recipe.imageType === 'string'
  )
}

function isSearchResponse(value: unknown): value is SpoonacularSearchResponse {
  if (typeof value !== 'object' || value === null) return false

  const response = value as Record<string, unknown>
  return (
    Array.isArray(response.results) &&
    response.results.every(isRecipe) &&
    typeof response.offset === 'number' &&
    typeof response.number === 'number' &&
    typeof response.totalResults === 'number'
  )
}

export async function searchRecipes(
  query: string,
  apiKey: string,
  signal?: AbortSignal,
): Promise<SpoonacularSearchResponse> {
  const trimmedApiKey = apiKey.trim()
  if (!trimmedApiKey) {
    throw new Error('Add your Spoonacular API key to the .env file before searching.')
  }

  const url = new URL(API_BASE_URL)
  url.searchParams.set('query', query)
  url.searchParams.set('number', '12')
  url.searchParams.set('apiKey', trimmedApiKey)

  const response = await fetch(url, { signal })
  if (!response.ok) {
    const detail = response.status === 401 || response.status === 402
      ? 'Check that your Spoonacular API key is valid and has available quota.'
      : `Spoonacular returned HTTP ${response.status}. Please try again.`
    throw new Error(detail)
  }

  const data: unknown = await response.json()
  if (!isSearchResponse(data)) {
    throw new Error('Spoonacular returned an unexpected response. Please try again.')
  }

  return data
}
