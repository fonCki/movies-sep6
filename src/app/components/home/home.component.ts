import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';  // Import your TMDB Service


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  genres: any[] = [];
  selectedGenre: number | null = null;
  selectedSortBy: string = 'latest';
  
  constructor(private tmdbService: TmdbService) { }

  ngOnInit(): void {
    this.fetchGenres();
  }

  fetchGenres(): void {
    this.tmdbService.getMovieGenres().subscribe(
      data => {
        this.genres = data.genres;
      },
      error => {
        console.error('There was an error fetching the genres!', error);
      }
    );
  }

  filterMovies(): void {
    // Here, you can do additional actions if required when the filter button is clicked.
    // For instance, if you're storing movies in a list in this component, 
    // you might want to clear it or fetch the filtered movies directly here.

    // If you're using a child component to display the movies,
    // it will receive the updated selectedGenre and selectedSortBy properties, and can react accordingly.
  }
}

