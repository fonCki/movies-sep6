import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {

  @Input() genre: number | null = null;
  @Input() sortBy: string = 'latest';
  @Input() movies: any[] = [];

  onInit(): void {
    console.log('Genre: ', this.genre);
    console.log('Sort by: ', this.sortBy);
    console.log('Movies: ', this.movies);
  }
}
