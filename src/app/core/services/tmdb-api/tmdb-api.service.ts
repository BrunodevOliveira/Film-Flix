import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MovieTvBase } from '../../models/movie-tv-base';

type ApiResponse = {page: number, results: MovieTvBase[]}

@Injectable({
  providedIn: 'root'
})
export class TmdbApiService {

  baseUrl = 'https://api.themoviedb.org/3'

  options = {
    api_key: '9ae6131123aa7d77a739f61839223ed7',
    language: 'pt-BR'
  }

  constructor(private http: HttpClient) { }

  trending(): Observable<MovieTvBase[]>{
    return this.http.get<ApiResponse>(`${this.baseUrl}/trending/all/week`, {
      params: this.options
    }).pipe(map(data => data.results)) //Irá mapear meu JSON trasendo apenas o que eu quero: data.results
  }


  search(query: string): Observable<MovieTvBase[]> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/search/multi`, { //dentro desse objeto tenho o nome da propriedade e seu valor
      params: {
        ...this.options, //desestruturo minha variável e coloco seu conteúdo dentro desse objeto params
        include_adult: false, //informo para API que n quero trazer os filmes adultos
        query: query //procura dentro do meu JSON todos os filmes que contem o parâmetro digitado pelo usuário
      }
    }).pipe(map((data => data.results)))
  }

  getDetailById(id: number, type: 'movie' | 'tv'): Observable<MovieTvBase> {
    return this.http.get<MovieTvBase>(`${this.baseUrl}/${type}/${id}`, {
      params: this.options
    })
  }
}
