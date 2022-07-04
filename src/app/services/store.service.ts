import { Injectable } from '@angular/core';
import {IGenre} from "../interfaces/IGenre";
import {IMovieCommon} from "../interfaces/IMovieCommon";
import {IKeyword} from "../interfaces/IKeyword";
import {IMoviesResult} from "../interfaces/IMoviesResult";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  movies = new BehaviorSubject<IMovieCommon[]>([{
    poster_path: "",
    overview: "",
    release_date: "",
    genre_ids: [],
    id: 0,
    original_language: "",
    title: "",
    backdrop_path: "",
    vote_count: 0,
    vote_average: 0
  }]);
  genres = new BehaviorSubject<IGenre[]>([]);
  movie = new BehaviorSubject<IMovieCommon>({
    backdrop_path: "",
    genre_ids: [],
    id: 0,
    original_language: "",
    overview: "",
    poster_path: "",
    release_date: "",
    title: "",
    vote_average: 0,
    vote_count: 0
  });
  // movie_short: IMovieCommon;
  actual_page = new BehaviorSubject<number>(1);
  // searched_query: string;
  keyword = new BehaviorSubject<string>("");
  // keywords = new BehaviorSubject<IKeyword[]>([{id:0, name:""}]);
  keywords = new BehaviorSubject<IKeyword[]>([]);

  movies_results = new BehaviorSubject<IMoviesResult>({pages: 0, results: 0});
  genre = new BehaviorSubject<IGenre>({id: 0, name: ""});
  release_after = new BehaviorSubject<string>("");
  release_before = new BehaviorSubject<string>("");
  id = new BehaviorSubject<number>(0);

  constructor() {  }
}
