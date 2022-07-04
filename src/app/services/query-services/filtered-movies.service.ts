import {Injectable} from '@angular/core';
import {MovieService} from "../movie.service";
import {StoreService} from "../store.service";
import {Observable} from "rxjs";
import {IRawListOfMovies} from "../../interfaces/IRawListOfMovies";

@Injectable({
  providedIn: 'root'
})
export class FilteredMoviesService {

  constructor(private moviesService: MovieService,
              private storeService: StoreService) {

  }

  getAll(): Observable<IRawListOfMovies> {
    let genre_;
    let release_before_;
    let release_after_;
    let keywords_;

    let queries: string = '';

    queries = queries.concat(`include_adult=${false}`)

    // this.storeService.keywords.subscribe(keywords => {
    //   console.log(keywords);
    //   if (keywords != undefined) {
    //     queries = queries.concat(`&with_keywords=${keywords}`);
    //     keywords_ = keywords;
    //   }
    // })

    this.storeService.keywords.subscribe(keywords => {
      // console.log(keywords);
      // console.log(keywords[0]);
      // console.log(keywords[0].id);
      if (keywords != undefined
        && keywords.length > 0
        && keywords[0].id != 0
        && keywords[0] != undefined) {
        queries = queries.concat(`&with_keywords=${keywords[0].id}`);
        keywords_ = keywords;
      }
    })

    this.storeService.genre.subscribe(genre => {
      if (genre != null) {
        let {name} = genre;
        if (name !== '') {
          queries = queries.concat(`&with_genres=${name}`)
          genre_ = name;
        }
      }
    })

    this.storeService.release_after.subscribe(release_after => {
      if (release_after !== '' && release_after !== null) {
        queries = queries.concat(`&release_date.gte=${release_after}`);
        release_after_ = release_after;
      }
    })

    this.storeService.release_before.subscribe(release_before => {
      if (release_before !== '' && release_before !== null) {
        queries = queries.concat(`&release_date.lte=${release_before}`);
        release_before_ = release_before;
      }
    })

    this.storeService.actual_page.subscribe(actual_page => {
      if (actual_page && actual_page !== 1)
        queries = queries.concat(`&page=${actual_page}`)
    })


    if (genre_ != null && !release_before_ && !release_after_ && (!keywords_ || keywords_[0] === null)) {
      return this.moviesService.getAll();
    }


    // let keywords = this.storeService.keywords;
    // let genre = this.storeService.genre;
    // let release_after = this.storeService.release_after;
    // let release_before = this.storeService.release_before;
    //
    // let actual_page = this.storeService.actual_page;
    //
    // if (!genre && !release_before && !release_after && (!keywords||keywords.length === 0)) {
    //   return this.moviesService.getAll();
    // }
    //
    // let queries : string = '';
    //
    // queries = queries.concat(`include_adult=${false}`)
    //
    // if (keywords.length > 0)
    //   queries = queries.concat(`&with_keywords=${keywords[0].id}`);
    //
    // if (genre !== '' && genre != null)
    //   queries = queries.concat(`&with_genres=${genre}`)
    //
    // if (release_after !== '' && release_after !== undefined)
    //   queries = queries.concat(`&release_date.gte=${release_after}`);
    //
    // if (release_after !== '' && release_after !== undefined)
    //   queries = queries.concat(`&release_date.lte=${release_before}`);
    //
    // if (actual_page && actual_page !== 1)
    //   queries = queries.concat(`&page=${actual_page}`)

    return this.moviesService.getAll(queries);
  }
}
