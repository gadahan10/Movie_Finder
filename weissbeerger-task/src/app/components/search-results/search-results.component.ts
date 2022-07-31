import { Component, Input, OnInit } from '@angular/core';
import { MovieBase } from 'src/app/model/movie.model';

@Component({
	selector: 'search-results',
	templateUrl: './search-results.component.html',
	styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

	@Input() results: MovieBase[] = [];
	
	constructor() { }

	ngOnInit(): void {
	}

}
