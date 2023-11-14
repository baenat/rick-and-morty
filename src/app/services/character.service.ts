import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllCharacterResponse } from '../character/interfaces/character.interfaces';
import { of } from 'rxjs'
import { tap, catchError } from 'rxjs/operators'
import { environment } from '../../environments/environment';
import { EpisodeResponse } from '../character/interfaces/episodes.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private httClient: HttpClient) { }

  private requestUrl(request?: string) {
    const url = `${environment.baseUrl}/${environment.characters}`;
    let partialUrl = '';
    if (request && typeof request === 'string') partialUrl = `/?name=${request}`;

    return this.httClient.get<AllCharacterResponse>(`${url}${partialUrl}`);
  }

  getAllCharacter() {
    return this.requestUrl();
  }

  /* getDetailCharacter(id: number) {
    return this.requestUrl(id);
  } */

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
