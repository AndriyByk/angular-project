import {Component, Input, OnInit} from '@angular/core';
import {IMovieCommon} from "../../interfaces/IMovieCommon";
import {baseImgURL, imgSize} from "../../urls/urls";
import {GenreService} from "../../services/genre.service";
import {StoreService} from "../../services/store.service";
import {IGenre} from "../../interfaces/IGenre";

@Component({
  selector: 'app-movies-list-card',
  templateUrl: './movies-list-card.component.html',
  styleUrls: ['./movies-list-card.component.css']
})
export class MoviesListCardComponent implements OnInit {
  @Input()
  movie: IMovieCommon;
  id: number;
  url: string;
  //
  genres: IGenre[];

  constructor(private genreService: GenreService,
              private storeService: StoreService) {
  }

  ngOnInit(): void {
    this.url = baseImgURL + imgSize.logo_w300;

    this.genres = this.changeGenres(this.movie);

    this.storeService.id.subscribe(id => {
      this.id = id;
    })
    console.log(this.id);
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
}
