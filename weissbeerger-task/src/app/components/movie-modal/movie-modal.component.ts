import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { catchError, switchMap, takeUntil, tap } from 'rxjs/operators';
import { MovieBase, MovieExtended } from 'src/app/model/movie.model';
import { MovieSearchService } from 'src/app/services/movie-search.service';
import { WishlisthService } from 'src/app/services/wishlist.service';
import { modalShowHide } from 'src/app/shared/animations/animations';
import { EventService, EventType } from 'src/app/shared/services/event.service';

@Component({
	selector: 'movie-modal',
	templateUrl: './movie-modal.component.html',
	styleUrls: ['./movie-modal.component.scss'],
	animations: [
		modalShowHide
	]
})
export class MovieModalComponent implements OnInit, OnDestroy {

	movieData: MovieExtended;
	isLoading: boolean;
	@Input() showHideState: string = 'show';

	private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
	
	constructor(private _eventService: EventService, private _movieService: MovieSearchService,
				private _wishlistService: WishlisthService) { }
	

	ngOnInit(): void {
		this._movieService.movieSubject$
			.pipe(
				tap(() => this.isLoading = true),
				takeUntil(this.destroyed$),
				switchMap(() => this._movieService.onGetMovieExtendedDetails())
			)
			.subscribe((movie: MovieExtended) => {
				console.log(movie)
				this.isLoading = false;
				this.movieData = movie;
			},
			catchError => {
				this.isLoading = false;
			})
	}

	onCloseModal(): void {
		this._eventService.map[EventType.MODAL_SHOW_HIDE].next(false);	
		setTimeout(() => {
			this.isLoading = true;
		}, 600);	
	}

	onAddToWishlist(): void {
		const  movieBase: MovieBase = {
			Poster: this.movieData.Poster, 
			Title: this.movieData.Title,
			Year: this.movieData.Year,
			imdbID: this.movieData.imdbID,
			Type: this.movieData.Type
		}
		this._wishlistService.addMovieToWishlist(movieBase)
	}

	ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}

}
