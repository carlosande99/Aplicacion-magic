import { Component, Input } from '@angular/core';
import { IonContent, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel, IonButton, IonIcon } from "@ionic/angular/standalone";
import { AnimationController, ModalController } from '@ionic/angular/standalone';
import { Api } from 'src/app/services/api';
import { RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-busqueda-avanzada-modal',
  templateUrl: './busqueda-avanzada-modal.component.html',
  styleUrls: ['./busqueda-avanzada-modal.component.scss'],
  imports: [IonContent, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonThumbnail, IonLabel, IonButton, IonIcon, RouterLinkActive],
})
export class BusquedaAvanzadaModalComponent{
  @Input() carta: any;
  cartasImagenes: any;
  simbolosMana: any;
  constructor(private animationCtrl: AnimationController, private modalCtrl: ModalController, private api:Api) { }

  ngOnInit() {
    this.imagenExt(this.carta.prints_search_uri);
    this.getSimboloMana(this.carta.mana_cost);
  }

  closeModal() {
    console.log(this.carta)
    this.modalCtrl.dismiss();
  }

  async imagenExt(url: string){
    this.cartasImagenes = await this.api.buscarImagenesExtras(url);
    console.log(this.cartasImagenes)
  }

  getPrecio(item: any): string{
    const eur = item.prices?.eur;
    const foil = item.prices?.eur_foil

    if(!eur && !foil){
      return 'No se encontraron precios para esta carta';
    }

    let resultado = ""

    if(eur) resultado += `Normal: ${eur} €\n`;
    if(foil) resultado += `Foil: ${foil} €`;

    return resultado.trim();
  }

  getSimboloMana(manaCost: string): string {
    if(!manaCost){
      manaCost = this.carta.card_faces[0].mana_cost;
    }
    const simbolos = manaCost.match(/{(.*?)}/g);
    if (simbolos) {
      this.simbolosMana = simbolos.map(simbolo => simbolo.replace(/[{}]/g, '').toLowerCase());
    } else {
      this.simbolosMana = [];
    }
    console.log(this.simbolosMana)
    return this.simbolosMana
  }
}

