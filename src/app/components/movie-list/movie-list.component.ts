import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from  '../../services/tmdb.service';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {

  movies: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const genreId = params['genre']; // this will be your genre ID from the query param
      if (genreId) {
        this.tmdbService.getFilteredMovies(genreId, 'popular').subscribe(data => {
          this.movies = data.results; // Assuming the data comes back with a 'results' array
        });
      } else {
        // get a popular list of movies
        this.tmdbService.getPopularMovies().subscribe(data => {this.movies = data.results;});
        // Get some default list of movies or handle the absence of a genre parameter
      }
    });
  }
}
