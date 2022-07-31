import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, ReplaySubject, Subscription } from 'rxjs';
import { MovieSearchService } from 'src/app/services/movie-search.service';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil, tap } from "rxjs/operators";
import { ImdbResult, MovieBase } from 'src/app/model/movie.model';
import { EventService } from 'src/app/shared/services/event.service';
import { RegexPattern } from 'src/app/shared/regex-patterns';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
	selector: 'search-page',
	templateUrl: './search-page.component.html',
	styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, AfterViewInit {

	pageState: SearchPageState = SearchPageState.INITIAL;
	searchResults: MovieBase[] = [];
	searchVal: string = '';
	subscription: Subscription;
	isModalOpened: boolean;
	
	private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

	@ViewChild('searchInput') input: ElementRef

	searchTermForm = new FormGroup({
		searchTerm: new FormControl('', [Validators.pattern(RegexPattern.TEXT), Validators.min(3), Validators.max(40)])
	});
	
	constructor(private _movieSearchService: MovieSearchService, private _eventService: EventService) { }

	ngAfterViewInit(): void {
		fromEvent<any>(this.input.nativeElement, 'keyup')
		.pipe(
			debounceTime(500),			
			filter(() => this.searchTermForm.valid),
			tap(() => this.pageState = SearchPageState.LOADER),
			distinctUntilChanged(),			
			switchMap(() => this._movieSearchService.onSearchMovie(this.searchVal.toLowerCase()))
		).subscribe((result: ImdbResult) => {
			
			if (result && result.totalResults > 0) {
				this.pageState = SearchPageState.RESULTS;
				this.searchResults = result.Search;
			}
			else {
				if (this.searchVal == '') {
					this.pageState = SearchPageState.INITIAL;
				}
				else if (result == null || (result && result.totalResults == 0)) {
					this.pageState = SearchPageState.NOT_FOUND;
				}
			}
			
		},
		catchError => {
			if (this.searchVal === '') {
				this.pageState = SearchPageState.INITIAL;
			}
			else {
				this.pageState = SearchPageState.ERROR;
			}			
		});
	}

	ngOnInit(): void {
		this._eventService.modalShowHideMessage
			.pipe(
				takeUntil(this.destroyed$)
			)
			.subscribe((isOpened: boolean) => {				
				this.isModalOpened = isOpened;
			})
	}
}

export enum SearchPageState {
	INITIAL = 1,
	RESULTS = 2,
	LOADER = 3,
	ERROR = 4,
	NOT_FOUND = 5
}