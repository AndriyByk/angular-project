import {Component, OnInit} from '@angular/core';
import {baseImgURL, imgSize} from "../../urls/urls";
import {StoreService} from "../../services/store.service";
import {ActivatedRoute} from "@angular/router";
import {IMovieCommon} from "../../interfaces/IMovieCommon";
import {MovieService} from "../../services/movie.service";
import {IGenre} from "../../interfaces/IGenre";

@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.css']
})
export class MovieDetailsPageComponent implements OnInit {

  url: string;
  id: number;
  movie: IMovieCommon;
  genres: IGenre[];


  constructor(private storeService: StoreService,
              private route: ActivatedRoute,
              private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.url = baseImgURL + imgSize.backdrop_original;

    this.route.params.subscribe(({id}) => {
      this.id = id;
      this.storeService.id.next(id);
      console.log(this.id);

      let {data} = history.state;
      if (data != undefined) {
        this.movie = data;
      }
      else {
        this.movieService.getById(id).subscribe(value => {
          this.movie = value;
        })
      }
    });

    this.genres = this.changeGenres(this.movie);
  }

  changeGenres(movie: IMovieCommon): IGenre[] {
    let allGenres = this.storeService.genres.getValue();
    let movieGenres: number[] = movie.genre_ids;
    let genresWithNames: IGenre[] = [];
    for (let genre of allGenres) {
      for (let genreId of movieGenres) {
        if (genre.id === genreId) {
          genresWithNames.push(genre);
        }
      }
    }
    return genresWithNames;
  }
  // execute scroll
}
