export interface Recipe {
  id: number
  title: string
  image: string
  imageType: string
}

export interface SpoonacularSearchResponse {
  results: Recipe[]
  offset: number
  number: number
  totalResults: number
}

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
