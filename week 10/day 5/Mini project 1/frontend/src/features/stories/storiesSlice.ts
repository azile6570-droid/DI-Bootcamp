import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Story } from "../../../../types/models";
import { apiRequest } from "../../lib/api";

interface StoriesState {
  items: Story[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: StoriesState = { items: [], status: "idle", error: null };

export const loadStories = createAsyncThunk("stories/load", () => apiRequest<Story[]>("/stories"));
export const saveStory = createAsyncThunk(
  "stories/save",
  async (story: { title: string; content: string; id?: number }) => {
    const result = await apiRequest<Story>(story.id ? `/stories/${story.id}` : "/stories", {
      method: story.id ? "PATCH" : "POST",
      body: JSON.stringify({ title: story.title, content: story.content }),
    });
    return result;
  },
);
export const removeStory = createAsyncThunk("stories/remove", async (id: number) => {
  await apiRequest<void>(`/stories/${id}`, { method: "DELETE" });
  return id;
});

const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadStories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadStories.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(loadStories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unable to load stories.";
      })
      .addCase(saveStory.fulfilled, (state, action) => {
        const index = state.items.findIndex((story) => story.id === action.payload.id);
        if (index === -1) state.items.unshift(action.payload);
        else state.items[index] = action.payload;
      })
      .addCase(removeStory.fulfilled, (state, action) => {
        state.items = state.items.filter((story) => story.id !== action.payload);
      });
  },
});

export default storiesSlice.reducer;
