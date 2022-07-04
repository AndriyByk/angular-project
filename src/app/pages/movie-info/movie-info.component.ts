import { Component, OnInit } from '@angular/core';
import {baseImgURL, imgSize} from "../../urls/urls";
import {ActivatedRoute, Router} from "@angular/router";
import {IMovieDefined} from "../../interfaces/IMovieDefined";
import {MovieService} from "../../services/movie.service";


@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {
  movie: IMovieDefined;
  url: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.url = baseImgURL + imgSize.backdrop_w1280;
    this.activatedRoute.params.subscribe(({id}) => {
      this.movieService.getById(id).subscribe(value => {
        this.movie = value;
      })
    })
  }

  navigate(s: string) {
    this.router.navigate(['s']);
  }
}
