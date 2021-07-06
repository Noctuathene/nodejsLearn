import { ApiProperty, ApiPropertyOptions} from "@nestjs/swagger";

export class QueryParams {
  @ApiProperty({required: false, default: 0})
  skip: number;
  private _take: number;
  @ApiProperty({required : false})
  searchString: string = "";

  constructor(skip: number, take: number, searchString: string) {
    this._take = take > 10 ? 10 : take;
    skip = skip;
    searchString;
  }
  @ApiProperty({required : false, default: 10})
  public set take(theTake: number) {
    this._take = theTake > 10 ? 10 : theTake;
  }
  public get take() {
    return this._take;
  }
}
