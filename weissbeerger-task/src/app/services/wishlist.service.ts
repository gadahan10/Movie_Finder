import { Injectable } from "@angular/core";
import { MovieBase } from "../model/movie.model";
import { EventService, EventType } from "../shared/services/event.service";

@Injectable({
    providedIn: 'root'
})
export class WishlisthService {

    constructor(private _eventService: EventService) {}

    addMovieToWishlist(movie: MovieBase) {
        this._eventService.map[EventType.ADD_TO_WISHLIST].next(movie);
    }
}