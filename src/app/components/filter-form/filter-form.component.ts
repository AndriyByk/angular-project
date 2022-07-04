import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {KeywordsService} from "../../services/keywords.service";
import {StoreService} from "../../services/store.service";
import {NextFilteredMoviesService} from "../../services/query-services/next-filtered-movies.service";
import {PreviousFilteredMoviesService} from "../../services/query-services/previous-filtered-movies.service";
import {IKeyword} from "../../interfaces/IKeyword";
import {IGenre} from "../../interfaces/IGenre";
import {GenreService} from "../../services/genre.service";
import {IMoviesResult} from "../../interfaces/IMoviesResult";
import {FilteredMoviesService} from "../../services/query-services/filtered-movies.service";

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css']
})
export class FilterFormComponent implements OnInit {
  genres: IGenre[];
  keyW: IKeyword[] = [];
  actual_page: number;
  movies_results: IMoviesResult;
  form: FormGroup;

  constructor(private keywordsService: KeywordsService,
              private storeService: StoreService,
              private nextFilteredMoviesService: NextFilteredMoviesService,
              private previousFilteredMoviesService: PreviousFilteredMoviesService,
              private filteredMoviesService: FilteredMoviesService,
              private genreService: GenreService) {

  }

  ngOnInit(): void {
    this.createForm();

    this.actual_page = this.storeService.actual_page.getValue();
    this.genreService.getAll().subscribe(value => {
      let {genres} = value;
      this.genres = genres;
      this.storeService.genres.next(genres);
    });

    this.storeService.movies_results.subscribe(value => {
      this.movies_results = value
    });
  }

  createForm(): void {
    this.form = new FormGroup({
      keywords: new FormControl(null),
      release_after: new FormControl(null),
      release_before: new FormControl(null),
      genre: new FormControl()
    })
  }

  mediate() {
    this.keywordsService.getAll(this.form.getRawValue().keywords).subscribe(value => {
      let {results} = value;
      console.log(value);
      this.storeService.keywords.next(results);
      this.storeService.keywords.subscribe(value1 => {
        console.log(value1);
      })
      this.keyW = results;
    });
  }

  takeFilterInfo(): void {
    this.storeService.genre.next(this.form.getRawValue().genre);
    this.storeService.release_after.next(this.form.getRawValue().release_after);
    this.storeService.release_before.next(this.form.getRawValue().release_before);
    // this.storeService.keywords.next(this.form.getRawValue().keywords);
    console.log("info was taken")
    this.storeService.actual_page.next(1)
    this.filteredMoviesService.getAll().subscribe(value => {

      let {results, total_results, total_pages} = value;
      console.log(value);
      console.log(results);

      this.storeService.movies.next(results);
      this.movies_results = {pages: total_pages, results: total_results}
    })
  }

  goNextPage() {
    this.storeService.actual_page.subscribe(actual_page => {
      this.actual_page = actual_page;
    })

    this.storeService.movies_results.subscribe(movies_results => {
      this.movies_results = movies_results;
    })

    if (this.actual_page < this.movies_results.pages) {
      this.nextFilteredMoviesService.getAll().subscribe(value => {
        let {results, total_results, total_pages} = value;
        this.storeService.movies.next(results);
        this.movies_results = {pages: total_pages, results: total_results}
      })
    }
  }

  goBackPage() {
    if (this.actual_page > 1) {
      this.previousFilteredMoviesService.getAll().subscribe(value => {
        let {results, total_results, total_pages} = value;
        this.storeService.movies.next(results);
        this.movies_results = {pages: total_pages, results: total_results}
      })
    }
  }
}
