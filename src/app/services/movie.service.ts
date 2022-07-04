import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {baseURL, movieUrl} from "../urls/urls";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }

  getAll(queries?: string): Observable<any> {
    return this.httpClient.get(baseURL + movieUrl.filteredMovies + queries)
  }

  getById(id: number) : Observable<any> {
    return this.httpClient.get(`${baseURL}${movieUrl.definedMovie}/${id}?`)
  }

  getByQuery(query: string) : Observable<any> {
    return this.httpClient.get(`${baseURL}${movieUrl.searchedMovies}${query}`)
  }
}
