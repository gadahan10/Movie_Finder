import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchResultsItemComponent } from './components/search-results-item/search-results-item.component';
import { MovieSearchService } from './services/movie-search.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GatewayService } from './shared/services/gateway.service';
import { ConfigService } from './shared/services/config.service';
import { HttpClientModule } from '@angular/common/http';
import { MovieModalComponent } from './components/movie-modal/movie-modal.component';
import { EventService } from './shared/services/event.service';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { WishlisthService } from './services/wishlist.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    SearchResultsComponent,
    SearchResultsItemComponent,
    MovieModalComponent,
    WishlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    MovieSearchService,
    GatewayService,
    ConfigService,
    EventService,
    WishlisthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
