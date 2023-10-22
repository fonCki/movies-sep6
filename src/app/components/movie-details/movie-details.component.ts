import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailComponent implements OnInit {
  
  movies: any[] = [];
  movieName: string | null = null;
  movie: any = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    // Fetch the movie name from the route
    this.movieName = this.route.snapshot.paramMap.get('name');
    
    if (this.movieName) {
      this.fetchMovies();
    } else {
      console.error('Movie name not provided in the route!');
    }
  }

  fetchMovies(): void {
    this.http.get<any[]>('assets/sample-movies.json').subscribe(
      (data: any[]) => {
        this.movies = data;
        // Find the specific movie based on the movie name
        this.movie = this.movies.find(m => m.name === this.movieName);
        if (!this.movie) {
          console.error('Movie not found!');
        }
      },
      (error) => {
        console.error('There was an error fetching the movie data!', error);
      }
    );
  }
}
