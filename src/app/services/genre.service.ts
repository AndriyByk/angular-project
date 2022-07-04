import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {baseURL, movieUrl} from "../urls/urls";
import {IRawListOfGenres} from "../interfaces/IRawListOfGenres";

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<IRawListOfGenres> {
    return this.httpClient.get<IRawListOfGenres>(baseURL + movieUrl.allGenres)
  }
}
