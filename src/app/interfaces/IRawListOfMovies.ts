import {IMovieCommon} from "./IMovieCommon";

export interface IRawListOfMovies {
  results : IMovieCommon[],
  total_pages: number,
  total_results: number
}
