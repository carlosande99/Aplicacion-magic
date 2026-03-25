import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonText, ModalController } from '@ionic/angular/standalone';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Api } from '../services/api';
import { BusquedaAvanzadaModalComponent } from '../components/busqueda-avanzada-modal/busqueda-avanzada-modal.component';
import { BusquedaAvanzadaComponent } from '../components/busqueda-avanzada/busqueda-avanzada.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ReactiveFormsModule, IonImg, IonText],
})
export class Tab3Page {
  miFormulario: FormGroup;
  cartas: any[] = [];
  sets: any[] = [];
  espera: boolean = true;
  sincartas: boolean = false;
  visibleFace: number = 0;
  cartaSeleccionada: any = null;
  modalAbierto = false;
  idCarta = "";

  constructor(private fb: FormBuilder, private api:Api, private modalCtrl: ModalController) {
    this.miFormulario = this.fb.group({
      nombre: ['']
    });
  }

  async enviar() {
    this.espera = false;
    this.sincartas = false;
    this.cartas = []
    this.sets = []
    const nombre = this.miFormulario.value.nombre;

    this.cartas = await this.api.buscarCartasNombre(nombre);
    console.log(this.cartas)
    if(this.cartas.length <= 0){
      this.espera = true;
      this.sincartas = true;
    }else{
      this.espera = true;
    }

  }

  async ediciones(){
    this.espera = false;
    this.cartas = [];
    this.sincartas = false;
    this.sets = await this.api.buscarSets();
    this.espera = true;
    console.log(this.sets)
  }

  async cartasEdiciones(nombre: string){
    this.espera = false;
    this.cartas = []
    this.sets = []

    this.cartas = await this.api.buscarCartaSet(nombre);

    if(this.cartas.length <= 0){
      this.espera = true;
      this.sincartas = true;
    }else{
      this.espera = true;
    }
  }

  // Alternar cara
  toggleFace() {
    if(this.visibleFace === 0){
      this.visibleFace = 1
    }else{
      this.visibleFace = 0
    }
  }

  async abrirModal(carta: any) {
    const modal = await this.modalCtrl.create({
      component: BusquedaAvanzadaModalComponent,
      componentProps: {
        carta: carta
      }
    });

    await modal.present();
  }

  async abrirModalAvanzadas(){
    const modal = await this.modalCtrl.create({
      component: BusquedaAvanzadaComponent,
    })
    await modal.present();
  }

}
