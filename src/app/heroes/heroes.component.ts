import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  add(heroName: string): void{
    heroName = heroName.trim();

    if(!heroName) {return; }

    this.heroService.addHero({name: heroName} as Hero)
        .subscribe(hero => {this.heroes.push(hero)});

  }

  delete(hero: Hero): void{
    const index = this.heroes.findIndex(h => h.id === hero.id);

    this.heroService.deleteHero(hero.id)
    .subscribe(() => this.heroes.splice(index, 1));
  }
}
