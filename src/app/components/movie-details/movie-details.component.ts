import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd} from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import {filter} from "rxjs/operators";  // Import your TMDB Service
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailComponent implements OnInit {

  movieId: number | null = null;
  movie: any = null;
  backgroundImageUrl: string | null = null;
  selectedMediaType: string = 'movie'; // Default to 'movies'

  constructor(private route: ActivatedRoute, private tmdbService: TmdbService, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setMediaTypeFromRoute();
    });
  }


  setMediaTypeFromRoute() {
    const path = this.router.url.split('?')[0];
    if (path.includes('/tv')) {
      this.selectedMediaType = 'tv';
    } else if (path.includes('/movie')) {
      this.selectedMediaType = 'movie';
    }

    console.log('Selected Media Type: ', this.selectedMediaType);
  }

  ngOnInit(): void {
    this.setMediaTypeFromRoute();
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
  this.tmdbService.getDetails(this.selectedMediaType,this.movieId as number).subscribe(
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
  this.tmdbService.getCast("tv",(this.movieId as number)).subscribe(
    data => {
      this.actors = data.cast;
    },
    error => {
      console.error('There was an error fetching the movie cast!', error);
    }
  );
}
}
