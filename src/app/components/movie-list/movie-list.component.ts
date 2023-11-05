import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  items: any[] = []; // Renamed to items since it can be movies or series
  private currentPage = 1;
  private isLoading = false;
  private contentMode: 'tv' | 'movie' = 'movie'; // Default to movies
  private sortby: 'latest' | 'popular' | 'rating' = 'popular'; // Default sort by popular
  private genreId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService
  ) {}

  ngOnInit(): void {
    // Determine if we are showing movies or series from the route segment
    this.route.url.subscribe(url => {
      this.contentMode = url[0].path === 'series' ? 'tv' : 'movie'; // Adjust according to your routing
      this.reloadContent();
    });

    this.route.queryParams.subscribe(params => {
      this.genreId = params['genre'] ? Number(params['genre']) : null;
      this.sortby = params['sortby'] || this.sortby; // Use existing sortby if no new sortby is provided
      this.reloadContent();
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.isLoading) {
      this.loadMoreItems();
    }
  }

  private reloadContent(): void {
    this.currentPage = 1;
    this.items = []; // Reset items
    this.fetchContent();
  }

  private fetchContent(): void {
    this.isLoading = true;
    this.tmdbService.getItems(this.contentMode, this.currentPage, this.genreId, this.sortby).subscribe(
      data => {
        this.items = [...this.items, ...data.results];
        this.isLoading = false;
      },
      error => {
        console.error(`Error fetching ${this.contentMode} content:`, error);
        this.isLoading = false;
      }
    );
  }

  private loadMoreItems(): void {
    this.currentPage++;
    this.fetchContent();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    // You might want to trigger some functionality on resize events as well
  }
}
