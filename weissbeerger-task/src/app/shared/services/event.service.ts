import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { MovieBase } from "src/app/model/movie.model";


@Injectable({
    providedIn: 'root'
})
export class EventService {

    private modalShowHideSource = new Subject<boolean>();
    private addToWishlistSource = new Subject<MovieBase>();
    

    modalShowHideMessage = this.modalShowHideSource.asObservable();
    addToWishlistMessage = this.addToWishlistSource.asObservable();
    

    map: Record<EventType, Subject<any>>  = {
        [EventType.MODAL_SHOW_HIDE]: this.modalShowHideSource,
        [EventType.ADD_TO_WISHLIST]: this.addToWishlistSource,
        
    };

    
}

export enum EventType  {
    MODAL_SHOW_HIDE = 0,
    ADD_TO_WISHLIST = 1
}