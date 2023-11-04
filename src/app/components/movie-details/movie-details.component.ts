import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';  // Import your TMDB Service

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailComponent implements OnInit {

  movieId: number | null = null;
  movie: any = null;

  backgroundImageUrl: string | null = null;

  constructor(private route: ActivatedRoute, private tmdbService: TmdbService) { }  // Use TmdbService instead of HttpClient

  ngOnInit(): void {
    // Fetch the movie ID from the route
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Movie ID: ', id);
    this.movieId = id ? +id : null;

    if (this.movieId) {
      this.fetchMovieDetail();
    } else {
      console.error('Movie ID not provided in the route!');
    }
  }

actors: any[] = [];

fetchMovieDetail(): void {

  this.tmdbService.getMovieDetails(this.movieId as number).subscribe(
    data => {
      this.movie = data;
      console.log('Movie Details: ', this.movie);
      this.fetchMovieCast();
      this.backgroundImageUrl = 'https://image.tmdb.org/t/p/original' + this.movie.backdrop_path;
    },
    error => {
      console.error('There was an error fetching the movie details!', error);
    }
  );
}

fetchMovieCast(): void {
  this.tmdbService.getMovieCast(this.movieId as number).subscribe(
    data => {
      this.actors = data.cast;
    },
    error => {
      console.error('There was an error fetching the movie cast!', error);
    }
  );
}
}
