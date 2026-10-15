import { createAsyncThunk } from "@reduxjs/toolkit";

const PRODUCTS_ENDPOINT = "https://fakestoreapi.com/products?limit=8";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    let response;

    try {
      response = await fetch(PRODUCTS_ENDPOINT);
    } catch {
      return rejectWithValue("Couldn't connect to the shop. Check your connection and try again.");
    }

    if (!response.ok) {
      return rejectWithValue(`The shop couldn't load products (HTTP ${response.status}). Please try again.`);
    }

    let data;
    try {
      data = await response.json();
    } catch {
      return rejectWithValue("The shop returned an unreadable response. Please try again.");
    }

    if (
      !Array.isArray(data) ||
      !data.every(
        (product) =>
          Number.isInteger(product.id) &&
          typeof product.title === "string" &&
          typeof product.description === "string" &&
          typeof product.category === "string" &&
          typeof product.image === "string" &&
          Number.isFinite(product.price) &&
          Number.isFinite(product.rating?.rate),
      )
    ) {
      return rejectWithValue("The shop returned product data in an unexpected format.");
    }

    return data;
  },
);
