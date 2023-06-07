import { RootState } from "../store";

export const selectGenresById = (state: RootState, ids: number[]) => {
  return ids.map((id) => {
    if (!state.genres.genres[id]) return;
    return state.genres.genres[id];
  });
};
