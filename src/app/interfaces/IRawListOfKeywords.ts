import {IKeyword} from "./IKeyword";

export interface IRawListOfKeywords {
  page: number,
  results: IKeyword[],
  total_pages: number,
  total_results: number
}
