import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonImg, IonText } from '@ionic/angular/standalone';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Api } from '../services/api';

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

  constructor(private fb: FormBuilder, private api:Api) {
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

}
