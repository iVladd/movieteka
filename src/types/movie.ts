export interface Movie {
  adult: boolean;
  backdrop_path: string;
  created_by: { id: number; name: string }[];
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  name: string;
  first_air_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetail extends Movie {
  genres: { id: number; name: string }[];
  tagline: string;
  status: string;
  runtime: number;
}

export interface MovieResult {
  page?: number;
  results: Movie[];
  total_pages?: number;
  total_results?: number;
}

export interface Credits {
  cast: {
    adult: boolean;
    cast_id: number;
    character: string;
    id: number;
    known_for_department: string;
    name: string;
    profile_path: string | null;
  }[];
  crew: {
    department: string;
    id: number;
    job: string;
    name: string;
    original_name: string;
    profile_path: string | null;
  }[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenreResult {
  genres: Genre[];
}
