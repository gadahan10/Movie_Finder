import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { ImdbResult, MovieBase, MovieExtended } from "../model/movie.model";
import { GatewayService } from "../shared/services/gateway.service";

@Injectable({
    providedIn: 'root'
})
export class MovieSearchService {

    private _selectedMovieId: string;
    private _movieSubject = new Subject<string>();

    movieSubject$ = this._movieSubject.asObservable();


    get selectedMovie(): string {
        return this._selectedMovieId;
    }

    set selectedMovie(movieId: string) {
        this._selectedMovieId = movieId;
        this._movieSubject.next(movieId);

    }

    
    constructor(private _gatewayService: GatewayService){}

    onSearchMovie(searchVal: string): Observable<ImdbResult> {
		return this._gatewayService.get(`search/${searchVal}`);
	}

    onGetMovieExtendedDetails(): Observable<MovieExtended> {
        console.log(this._selectedMovieId)
        return this._gatewayService.get(`getMovieFullDetails/${this._selectedMovieId}`);
    }
}