import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CharacterService } from './character.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler';
import { AllCharacterResponse, Character } from '../character/interfaces/character.interfaces';
import { environment } from 'src/environments/environment';
import { EpisodeResponse } from '../character/interfaces/episodes.interfaces';

const listCharacter: AllCharacterResponse = {
  info: {
    count: 1,
    pages: 1,
    next: null,
    prev: null
  },
  results: [
    {
      id: 9,
      name: "Agency Director",
      status: "Dead",
      species: "Human",
      type: "",
      gender: "Male",
      origin: {
        name: "Earth (Replacement Dimension)",
        url: "https://rickandmortyapi.com/api/location/20"
      },
      location: {
        name: "Earth (Replacement Dimension)",
        url: "https://rickandmortyapi.com/api/location/20"
      },
      image: "https://rickandmortyapi.com/api/character/avatar/9.jpeg",
      episode: [
        "https://rickandmortyapi.com/api/episode/24"
      ],
      url: "https://rickandmortyapi.com/api/character/9",
      created: new Date()
    }
  ]
}

const mockEpisode: EpisodeResponse = {
  id: 1,
  name: "Pilot",
  air_date: "December 2, 2013",
  episode: "S01E01",
  characters: [],
  url: "https://rickandmortyapi.com/api/episode/1",
  created: "2017-11-10T12:56:33.798Z"
}

describe('CharacterService', () => {
  let service: CharacterService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CharacterService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(CharacterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request with a string', () => {

    // comprobamos que el resultado responda el tipo adecuado
    const testCharacter = 'Agency Director';
    service.searchCharacter(testCharacter).subscribe(resp => {
      expect(resp).toEqual(listCharacter)
    });

    // Verificacion de peticion con metodo GET
    const req = httpMock.expectOne(`${environment.baseUrl}/${environment.characters}/?name=${testCharacter}`);
    expect(req.request.method).toEqual('GET');
    req.flush(listCharacter);
  });

  it('should make a GET request provided URL Paginator', () => {

    // comprobamos que el resultado responda el tipo adecuado
    const testUrl = 'https://rickandmortyapi.com/api/character/?page=2';
    service.paginatorUrl(testUrl).subscribe(resp => {
      expect(resp).toEqual(listCharacter)
    });

    // Verificacion de peticion con metodo GET
    const req = httpMock.expectOne(`${testUrl}`);
    expect(req.request.method).toEqual('GET');
    req.flush(listCharacter);
  });

  it('should return list episodes and GET method', () => {

    // comprobamos que el resultado responda el tipo adecuado
    const testUrl = 'https://rickandmortyapi.com/api/episode/1';
    service.getByUrl(testUrl).subscribe(resp=> {
      console.log('resp => ', resp)
      expect(resp).toEqual(mockEpisode);
    });

    // Verificacion de peticion con metodo GET
    const req = httpMock.expectOne(`${testUrl}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockEpisode);

  })

});
