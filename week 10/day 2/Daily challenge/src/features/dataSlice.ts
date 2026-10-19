import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { searchRecipes } from '../api/api'
import type { Recipe, RequestStatus } from '../types/types'

interface DataState {
  recipes: Recipe[]
  status: RequestStatus
  error: string | null
  query: string
  totalResults: number
}

const initialState: DataState = {
  recipes: [],
  status: 'idle',
  error: null,
  query: 'pasta',
  totalResults: 0,
}

export const fetchRecipes = createAsyncThunk<
  Awaited<ReturnType<typeof searchRecipes>>,
  string,
  { rejectValue: string }
>('data/fetchRecipes', async (query, { rejectWithValue, signal }) => {
  try {
    return await searchRecipes(query, import.meta.env.VITE_SPOONACULAR_API_KEY ?? '', signal)
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw error
    }
    return rejectWithValue(error instanceof Error ? error.message : 'Unable to load recipes.')
  }
})

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state, action) => {
        state.status = 'loading'
        state.error = null
        state.query = action.meta.arg
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.recipes = action.payload.results
        state.totalResults = action.payload.totalResults
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        if (action.meta.aborted) return
        state.status = 'failed'
        state.error = action.payload ?? action.error.message ?? 'Unable to load recipes.'
      })
  },
})

export default dataSlice.reducer
