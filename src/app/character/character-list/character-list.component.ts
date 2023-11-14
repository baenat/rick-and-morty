import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { AllCharacterResponse, Character, InfoPaginator } from '../interfaces/character.interfaces';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  characters: Character[] = [];
  info: InfoPaginator | null = {
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  }

  constructor(
    private characterService: CharacterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.characterService.getAllCharacter().subscribe({
      next: (resp) => this.validateResponse(resp),
      error: (error) => console.warn(error)
    });
  }

  searchCharacter(characterName: string) {
    if (characterName == '' || characterName.length>3) {
      this.characterService.searchCharacter(characterName).subscribe({
        next: (resp) => this.validateResponse(resp),
        error: (error) => console.warn(error)
      });
    }
  }

  paginator(url?: string|null) {
    if (!url) return;
    this.characterService.paginatorUrl(url).subscribe({
      next: (resp) => this.validateResponse(resp),
      error: (error) => console.warn(error)
    });
  }

  detailCharacter(data: Character) {
    this.router.navigate(['/detail'], { queryParams: { data: JSON.stringify(data) }, skipLocationChange: true });
  }

  scroll() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  validateResponse(resp: AllCharacterResponse) {
    const { info, results } = resp;
    this.info = info;
    this.characters = [...results];
  }


}
