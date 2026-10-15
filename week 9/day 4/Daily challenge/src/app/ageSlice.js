import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const UPDATE_DELAY_MS = 1000;

const waitForUpdate = (change) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(change), UPDATE_DELAY_MS);
  });

export const ageUpAsync = createAsyncThunk(
  "age/ageUp",
  () => waitForUpdate(1),
);

export const ageDownAsync = createAsyncThunk(
  "age/ageDown",
  () => waitForUpdate(-1),
);

const ageSlice = createSlice({
  name: "age",
  initialState: {
    age: 25,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type === ageUpAsync.pending.type ||
          action.type === ageDownAsync.pending.type,
        (state) => {
          state.loading = true;
        },
      )
      .addMatcher(
        (action) =>
          action.type === ageUpAsync.fulfilled.type ||
          action.type === ageDownAsync.fulfilled.type,
        (state, action) => {
          state.age = Math.max(0, state.age + action.payload);
          state.loading = false;
        },
      )
      .addMatcher(
        (action) =>
          action.type === ageUpAsync.rejected.type ||
          action.type === ageDownAsync.rejected.type,
        (state) => {
          state.loading = false;
        },
      );
  },
});

export default ageSlice.reducer;
