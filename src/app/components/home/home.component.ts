// home.component.ts

import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';  

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  genres: any[] = [];
  selectedGenre: number | null = null;
  selectedSortBy: string = 'latest';
  movies: any[] = [];

  constructor(private tmdbService: TmdbService) { }

  ngOnInit(): void {
    this.fetchGenres();
    this.fetchMovies();
  }

  fetchGenres(): void {
    this.tmdbService.getMovieGenres().subscribe({
       next: data => {
         this.genres = data.genres;
      
    }
  }
    );
  }

  filterMovies(): void {
    // Call service to fetch movies based on filter criteria
    console.log('Filtering movies by genre: ', this.selectedGenre, ' and sort by: ', this.selectedSortBy);
    this.tmdbService.getFilteredMovies(this.selectedGenre, this.selectedSortBy).subscribe({
      next: data => {
        this.movies = data.results || [];
        console.log('Filtered movies: ', this.movies);
      },
      error: error => {
        console.error('There was an error fetching the filtered movie data!', error);
      }
    });
  }

  fetchMovies(): void {
    // Use the filterFavorites property somehow when fetching movies...
    this.tmdbService.getPopularMovies().subscribe({
      next: data => {
        this.movies = data.results || [];
      },
      error: error => {
        console.error('There was an error fetching the movie data!', error);
      }
    });
    
  }
}
