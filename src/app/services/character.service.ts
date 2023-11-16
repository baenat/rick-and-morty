import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllCharacterResponse, Character } from '../character/interfaces/character.interfaces';
import { of } from 'rxjs'
import { tap, catchError } from 'rxjs/operators'
import { environment } from '../../environments/environment';
import { EpisodeResponse } from '../character/interfaces/episodes.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  baseUrlApi = `${environment.baseUrl}/${environment.characters}`

  constructor(private httClient: HttpClient) { }

  private requestUrl(request?: string) {
    let partialUrl = '';
    if (request && typeof request === 'string') partialUrl = `/?name=${request}`;

    return this.httClient.get<AllCharacterResponse>(`${this.baseUrlApi}${partialUrl}`);
  }

  getAllCharacter() {
    return this.requestUrl();
  }

  getDetailCharacterById(id: number) {
    return this.httClient.get<Character>(`${this.baseUrlApi}/${id}`);
  }

  searchCharacter(character: string) {
    return this.requestUrl(character).pipe(
      // catchError(resp => of({ results: [], info: null }))
    );
  }

  paginatorUrl(url: string) {
    return this.httClient.get<AllCharacterResponse>(url);
  }

  getByUrl(url: string) {
    return this.httClient.get<EpisodeResponse>(url);
  }

}
