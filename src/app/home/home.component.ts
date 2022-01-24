import { TmdbApiService } from './../core/services/tmdb-api/tmdb-api.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, Observable, tap } from 'rxjs';
import { MovieTvBase } from '../core/models/movie-tv-base';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  trending$!: Observable<MovieTvBase[]>
  results$?: Observable<MovieTvBase[]>
  readonly placeHolder = 'http://www.mdtop.com.br/wp-content/uploads/2021/01/placeholder-images-image_large.png'

  constructor(private tmdbApi: TmdbApiService) { }

  createImageLink(poster: string) {
    if(poster) {
      return `https://image.tmdb.org/t/p/w300/${poster}`
    }
    return this.placeHolder
  }

  @ViewChild('searchInput') searchInput!: ElementRef

  ngAfterViewInit(): void {
    //cria um evento que identifica toda a vez que digito uma tecla no campo de busca
    fromEvent(this.searchInput.nativeElement,'keyup').pipe(
      filter(Boolean), //retira tods os valores falsy
      debounceTime(400), //espera 400ms até para capturar o que foi digitado
      distinctUntilChanged(), //só emite um resposta quando o valor atual for diferente do último (não emite se for iguais)
      tap(() => {
        const query = this.searchInput.nativeElement.value
        console.log(query)
        if(query) {
          this.results$ = this.tmdbApi.search(query)
        }else {
          this.results$ = undefined
        }
      })

    ).subscribe()
  }

  ngOnInit(): void {
    this.trending$ = this.tmdbApi.trending()
  }
}
