import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  
  getMovieGenres(): Observable<any> {
    return this.http.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
}
getFilteredMovies(genre: number | null, sortBy: string): Observable<any> {
  let endpoint = `${BASE_URL}discover/movie?api_key=${API_KEY}`;
  
  // Create a new HttpParams object
  let params = new HttpParams();

  // If genre exists, append 'with_genres' parameter
  if (genre !== null) {
    params = params.append('with_genres', genre.toString());
  }

  // Translate the sortBy value to one of the acceptable 'sort_by' values
  switch (sortBy) {
    case 'latest':
      params = params.append('sort_by', 'release_date.desc');
      break;
    case 'popular':
      params = params.append('sort_by', 'popularity.desc');
      break;
    case 'rating':
      params = params.append('sort_by', 'vote_average.desc');
      break;
  }

  return this.http.get(endpoint, { params });
}


}