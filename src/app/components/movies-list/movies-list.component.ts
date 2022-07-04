import { Component, OnInit } from '@angular/core';
import {StoreService} from "../../services/store.service";
import {IMovieCommon} from "../../interfaces/IMovieCommon";
import {FilteredMoviesService} from "../../services/query-services/filtered-movies.service";

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  movies: IMovieCommon[];

  constructor(private storeService: StoreService,
              private filteredMoviesService: FilteredMoviesService) {
    storeService.movies.subscribe(movies => {
      this.movies = movies;
    })
  }

  ngOnInit(): void {
    this.filteredMoviesService.getAll().subscribe(value => {
      let {results, total_results, total_pages} = value;
      this.storeService.movies_results.next({results: total_results, pages: total_pages})
      this.storeService.movies.next(results);
      this.movies = results;
    })
  }


}
