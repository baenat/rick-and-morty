import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators'
import { Character } from '../interfaces/character.interfaces';
import { CharacterService } from 'src/app/services/character.service';
import { EpisodeResponse } from '../interfaces/episodes.interfaces';
import { Location } from '@angular/common';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent {

  character!: Character;
  episodes: EpisodeResponse[] = [];
  isAnimation: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private characterService: CharacterService,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const { id } = params;
      this.characterService.getDetailCharacterById(id).subscribe({
        next: (data: any) => {
          console.log('data:', data);
          this.character = data;
          this.getEpisodes();
        }
      });

      // this.character = { ...JSON.parse(data) };
      // console.log('this.character => ', this.character)
      // this.getEpisodes();
    });
  }

  toNavigate() {
    // this.router.navigate(['/']);
    this.location.back();
  }

  getEpisodes() {

    for (const url of this.character.episode) {
      this.characterService.getByUrl(url).subscribe({
        next: (data: any) => {
          this.episodes.push(data);
          console.log('data => ', data)
        },
        error: (error: any) => console.log('error => ', error)
      });
    }

  }

  scroll() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  playAnimation() {
    this.isAnimation = !this.isAnimation;
    setTimeout(() => {
      this.isAnimation = !this.isAnimation;
    }, 500);
  }

}
