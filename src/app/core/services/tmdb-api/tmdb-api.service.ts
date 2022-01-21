import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TmdbApiService {

  baseUrl = 'https://api.themoviedb.org/3/'

  options = {
    api_key: '9ae6131123aa7d77a739f61839223ed7',
    language: 'pt-BR'
  }

  constructor() { }
}
