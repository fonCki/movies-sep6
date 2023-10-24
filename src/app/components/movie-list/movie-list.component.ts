import { Component, OnInit, Input } from '@angular/core';  // <- Import Input
import { TmdbService } from '../../services/tmdb.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  @Input() genre: number | null = null; 
  @Input() sortBy: string = 'latest';
  @Input() filterFavorites: boolean = false;  // <- Define the @Input() property

  movies: any[] = [];

  constructor(private tmdbService: TmdbService) { }

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    // Use the filterFavorites property somehow when fetching movies...
    this.tmdbService.getPopularMovies().subscribe(
      data => {
        console.log('Popular Movies: ', data);
        this.movies = data.results;
      },
      error => {
        console.error('There was an error fetching the movie data!', error);
      }
    );
  }
}


