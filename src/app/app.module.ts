import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthorisationInterceptor} from "./authorisation.interceptor";
import {FooterComponent} from './components/footer/footer.component';
import {FilterFormComponent} from './components/filter-form/filter-form.component';
import {HeaderComponent} from './components/header/header.component';
import {MoviesListCardComponent} from './components/movies-list-card/movies-list-card.component';
import {MovieDetailsPageComponent} from './pages/movie-details-page/movie-details-page.component';
import {MovieInfoComponent} from './pages/movie-info/movie-info.component';
import {MoviesPageComponent} from './pages/movies-page/movies-page.component';
import {MoviesListComponent} from './components/movies-list/movies-list.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    FilterFormComponent,
    HeaderComponent,
    MoviesListCardComponent,
    MovieDetailsPageComponent,
    MovieInfoComponent,
    MoviesPageComponent,
    MoviesListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: AuthorisationInterceptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
