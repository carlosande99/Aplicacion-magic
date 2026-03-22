import { Component, Input } from '@angular/core';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/angular/standalone";
import { AnimationController, ModalController } from '@ionic/angular/standalone';
import { Api } from 'src/app/services/api';

@Component({
  selector: 'app-busqueda-avanzada',
  templateUrl: './busqueda-avanzada.component.html',
  styleUrls: ['./busqueda-avanzada.component.scss'],
  imports: [IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent],
})
export class BusquedaAvanzadaComponent{
  @Input() carta: any;
  cartasImagenes: any;
  constructor(private animationCtrl: AnimationController, private modalCtrl: ModalController, private api:Api) { }

  ngOnInit() {
    this.imagenExt(this.carta.prints_search_uri);
  }

  closeModal() {
    console.log(this.carta)
    this.modalCtrl.dismiss();
  }

  async imagenExt(url: string){
    this.cartasImagenes = await this.api.buscarImagenesExtras(url);
    console.log(this.cartasImagenes)
  }
}

