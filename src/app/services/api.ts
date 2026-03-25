import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private urlCards = "https://api.scryfall.com/"

  constructor(private http: HttpClient) {}

  async buscarCartasNombre(nombre: string): Promise<any[]> {
    let url = nombre;
    let cartas: any[] = [];
    try{
      while (url) {
      const resp: any = await firstValueFrom(this.http.get(`${this.urlCards}cards/search?q=${encodeURIComponent(nombre)}`));
      cartas = [...cartas, ...resp.data];
      url = resp.has_more ? resp.next_page : null;
    }
      return cartas;
    }catch(error){
      return [];
    }
  }

  async buscarSets(): Promise<any[]>{
    let url = this.urlCards + `sets`
    let sets: any[] = [];

    try{
      while(url){
        const resp: any = await firstValueFrom(this.http.get(url));
        sets = [...sets, ...resp.data];
        url = resp.has_more ? resp.next_page : null;
      }

      sets = sets.filter(set => 
        ['expansion', 'core', 'masters', 'commander', 'draft_innovation'].includes(set.set_type) &&
        !set.digital && set.card_count > 0
      );

      sets.sort((a, b) => new Date(b.released_at).getTime() - new Date(a.released_at).getTime());

      return sets;
    }catch(error){
      return [];
    }
  }

  async buscarCartaSet(nombre: string): Promise<any[]>{
    let url = nombre;
    let cartas: any[] = [];
    try{
      while (url) {
        const resp: any = await firstValueFrom(this.http.get(url));
        cartas = [...cartas, ...resp.data];
        url = resp.has_more ? resp.next_page : null;
      }

      return cartas;
    }catch(error){
      return [];
    }
  }

  async buscarImagenesExtras(nombre: string): Promise<any[]>{
    let url = nombre;
    let cartasImages: any[] = [];
    try{
      while (url) {
        const resp: any = await firstValueFrom(this.http.get(url));
        cartasImages = [...cartasImages, ...resp.data];
        url = resp.has_more ? resp.next_page : null;
      }

      const grupos: any = {};

      cartasImages.forEach((item) => {
        if (!grupos[item.set_name]) {
          grupos[item.set_name] = [];
        }
        grupos[item.set_name].push(item);
      });
      return Object.keys(grupos).map(key => ({
        set_name: key,
        cartas: grupos[key]
      }));
      
    }catch(error){
      return [];
    }
  }
}
