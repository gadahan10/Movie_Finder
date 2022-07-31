import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieBase } from 'src/app/model/movie.model';
import { MovieSearchService } from 'src/app/services/movie-search.service';
import { EventService, EventType } from 'src/app/shared/services/event.service';

@Component({
	selector: 'search-results-item',
	templateUrl: './search-results-item.component.html',
	styleUrls: ['./search-results-item.component.scss']
})
export class SearchResultsItemComponent implements OnInit {

	@Input() showRemove: boolean;
	@Input() movie: MovieBase;
	@Output() movieSelectEvent = new EventEmitter<boolean>();
	@Output() removeFromWishlistEvent = new EventEmitter<string>();

	constructor(private _movieSearchService: MovieSearchService, 
				private _eventService: EventService) { }

	ngOnInit(): void {
		
		
	}

	onMovieSelect(): void {		
		this._movieSearchService.selectedMovie = this.movie.imdbID;
		this._eventService.map[EventType.MODAL_SHOW_HIDE].next(true);
	}

	removeFromWishlist(): void {
		this.removeFromWishlistEvent.next(this.movie.imdbID);
	}
}
