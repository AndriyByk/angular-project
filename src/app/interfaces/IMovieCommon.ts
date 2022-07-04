export interface IMovieCommon {
  poster_path: string | null
  overview: string
  release_date: string,
  genre_ids: number[],
  id: number,
  original_language: string,
  title: string,
  backdrop_path: string | null,
  vote_count: number,
  vote_average: number,
}
