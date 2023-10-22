import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const API_KEY = 'a7eba6c159cef4431cfddfaa56861157';
const BASE_URL = 'https://api.themoviedb.org/3/';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  constructor(private http: HttpClient) { }

  getPopularMovies(): Observable<any> {
    return this.http.get(`${BASE_URL}movie/popular?api_key=${API_KEY}`);
  }

  getMovieDetails(movieId: number): Observable<any> {
    return this.http.get(`${BASE_URL}movie/${movieId}?api_key=${API_KEY}`);
  }

  getMovieCast(movieId: number): Observable<any> {
    return this.http.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
  }
  
  // ... add more methods as needed.
}