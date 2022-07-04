import {Injectable} from '@angular/core';
import {MovieService} from "../movie.service";
import {StoreService} from "../store.service";
import {Observable} from "rxjs";
import {IRawListOfMovies} from "../../interfaces/IRawListOfMovies";

@Injectable({
  providedIn: 'root'
})
export class NextFilteredMoviesService {

  constructor(private moviesService: MovieService,
              private storeService: StoreService) {
  }

  getAll(): Observable<IRawListOfMovies> {
    let queries: string = '';

    queries = queries.concat(`include_adult=${false}`)

    this.storeService.keywords.subscribe(keywords => {
      if (keywords && keywords.length > 0)
        queries = queries.concat(`&with_keywords=${keywords[0].id}`);
    })

    this.storeService.genre.subscribe(genre => {
      if (genre != null) {
        let {name} = genre;
        if (name !== '')
          queries = queries.concat(`&with_genres=${name}`)
      }
    })

    this.storeService.release_after.subscribe(release_after => {
      if (release_after != null) {
        if (release_after !== '' && release_after !== undefined)
          queries = queries.concat(`&release_date.gte=${release_after}`);
      }
    })

    this.storeService.release_before.subscribe(release_before => {
      if (release_before != null) {
        if (release_before !== '' && release_before !== undefined)
          queries = queries.concat(`&release_date.lte=${release_before}`);
      }
    })

    let new_actual_page = 0;
    this.storeService.actual_page.subscribe(actual_page => {
      if (actual_page != null) {
        this.storeService.movies_results.subscribe(value => {
          console.log(value.results);
          console.log(value.pages);

          if (actual_page < value.pages) {
            queries = queries.concat(`&page=${actual_page + 1}`)
            new_actual_page = actual_page + 1;
          }
        })

        console.log(actual_page);
        // this.storeService.actual_page.next(actual_page + 1);
      }
    })
    this.storeService.actual_page.next(new_actual_page);

    return this.moviesService.getAll(queries);
  }
}
