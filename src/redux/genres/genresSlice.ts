import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { token } from "../../config";
import { Genre } from "../../types/movie";

export const fetchGenresList = createAsyncThunk<
  Genre[],
  undefined,
  { rejectValue: string }
>("genres/fetchGenres", async (_, { rejectWithValue }) => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?",
      options
    );

    const response2 = await fetch(
      "https://api.themoviedb.org/3/genre/tv/list?",
      options
    );

    const promises = await Promise.all([response, response2]).then(
      (responses) => Promise.all(responses.map((r) => r.json()))
    );

    return [...promises[0].genres, ...promises[1].genres];
  } catch (e) {
    if (e instanceof Error) rejectWithValue(e.message);
    return rejectWithValue("Unknown error");
  }
});

interface Genres {
  [index: number]: string;
}

type GenresState = {
  genres: Genres;
  status: "idle" | "loading" | "rejected" | "received";
  error: string | null;
};

const initialState: GenresState = {
  genres: {},
  status: "idle",
  error: null,
};

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenresList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchGenresList.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload || "Cannot load data";
      })
      .addCase(fetchGenresList.fulfilled, (state, action) => {
        state.status = "received";
        action.payload &&
          action.payload.forEach((g) => {
            state.genres[g.id] = g.name;
          });
      });
  },
});

export const genresReducer = genresSlice.reducer;
