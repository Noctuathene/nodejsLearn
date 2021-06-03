export class QueryParams {
    skip: number;
    private _take: number;
    searchString: string;
    
    constructor(skip : number, take: number, searchString: string) {
        this._take = take > 10 ? 10 : take;
        skip = skip; 
        searchString;
    }

    public set take(theTake : number){
        if(theTake > 10) throw new Error(">10");
        
        this._take = theTake > 10 ? 10 : theTake;
    }
}