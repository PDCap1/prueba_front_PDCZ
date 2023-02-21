import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Heroes } from './heroes.model';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient) { }

  getHeroes() {
    return this.http
      .get('./assets/heroes.json')
  }

  getHeroesFilter(filter: string) {
    return this.http
      .post('./assets/heroes.json',{ filter: filter }).subscribe(data => {
        console.log(data)
    })
  }

  getHeroesById(id: number) {
    return this.http
      .post('./assets/heroes.json',{ id: id }).subscribe(data => {
        console.log(data)
    })
  }

  modHero(id: number, hero: Heroes) {
    return this.http
      .put('./assets/heroes.json',{ id: id, hero: hero }).subscribe(data => {
        console.log(data)
    })
  }

  delHero(id: number) {
    return this.http
      .delete(`./assets/heroes.json/${id}`).subscribe(data => {
        console.log(data)
    })
  }

}
