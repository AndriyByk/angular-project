import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {baseURL, movieUrl} from "../urls/urls";
import {IRawListOfKeywords} from "../interfaces/IRawListOfKeywords";

@Injectable({
  providedIn: 'root'
})
export class KeywordsService {

  constructor(private httpClient: HttpClient) { }

  getAll(query : string): Observable<IRawListOfKeywords> {
    return this.httpClient.get<IRawListOfKeywords>(`${baseURL}${movieUrl.searchedKeywords}${query}`)
  }
}
