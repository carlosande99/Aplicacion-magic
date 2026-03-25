import { Component } from '@angular/core';
import { ModalController, IonHeader, IonToolbar, IonTitle, IonModal, IonButtons, IonButton, IonContent, IonList, IonItem, IonAvatar, IonImg, IonLabel, IonSearchbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-busqueda-avanzada',
  templateUrl: './busqueda-avanzada.component.html',
  styleUrls: ['./busqueda-avanzada.component.scss'],
  imports: [IonHeader, IonToolbar, IonButtons, IonButton, IonContent, IonSearchbar],
})
export class BusquedaAvanzadaComponent{

  constructor(private modalCtrl: ModalController,) {}

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
