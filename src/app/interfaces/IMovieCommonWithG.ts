import {IGenre} from "./IGenre";

export interface IMovieCommonWithG {
  poster_path: string | null
  overview: string
  release_date: string,
  genre_ids: IGenre[],
  id: number,
  original_language: string,
  title: string,
  backdrop_path: string | null,
  vote_count: number,
  vote_average: number,
}
