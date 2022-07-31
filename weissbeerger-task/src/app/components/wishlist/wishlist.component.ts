import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MovieBase } from 'src/app/model/movie.model';
import { WishlisthService } from 'src/app/services/wishlist.service';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
	selector: 'wishlist',
	templateUrl: './wishlist.component.html',
	styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit, OnDestroy {

	wishlistItems: MovieBase[] = [];
	private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
	
	constructor(private _wishlistService: WishlisthService, private _eventService: EventService) { }
	

	ngOnInit(): void {
		this._eventService.addToWishlistMessage
			.pipe(
				takeUntil(this.destroyed$)
			)
			.subscribe((movie: MovieBase) => {
				const index = this.wishlistItems.findIndex(item => item.imdbID === movie.imdbID);
		
				if (index == -1) {
					this.wishlistItems.push(movie);
					localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems));
				}
			});

		this.checkWishlist();
	}

	removeFromWishlist(movieId: string): void {
		const index = this.wishlistItems.findIndex(item => item.imdbID === movieId);

		if (index >= 0) {
			this.wishlistItems.splice(index, 1);
			localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems));
		}
	}

	ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}

	private checkWishlist(): void {
		const wishlist = localStorage.getItem('wishlist');

		if (wishlist != null) {
			this.wishlistItems = JSON.parse(wishlist);
		}
	}

}
