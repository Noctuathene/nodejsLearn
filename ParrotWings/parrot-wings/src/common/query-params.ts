export class QueryParams {
  skip: number;
  private _take: number;
  searchString: string;

  constructor(skip: number, take: number, searchString: string) {
    this._take = take > 10 ? 10 : take;
    skip = skip;
    searchString;
  }

  public set take(theTake: number) {
    this._take = theTake > 10 ? 10 : theTake;
  }
}
