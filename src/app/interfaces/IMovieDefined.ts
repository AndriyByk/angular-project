import {IGenre} from "./IGenre";
import {IProductionCountry} from "./IProductionCountry";
import {ICompany} from "./ICompany";

export interface IMovieDefined {
  original_title: string;
  poster_path: string | null;
  vote_count: number;
  vote_average: number;
  original_language: string;
  production_countries: IProductionCountry[];
  overview: string | null;
  genres: IGenre[];
  runtime: number | null;
  release_date: string;
  title: string;
  homepage: string;
  production_companies: ICompany[];
  company: string;
  budget: number;
}
