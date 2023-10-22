import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  movies: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.http.get('assets/sample-movies.json').subscribe(
      (data: any) => {
        this.movies = data;
      },
      (error) => {
        console.error('There was an error fetching the movie data!', error);
      }
    );
  }
}

