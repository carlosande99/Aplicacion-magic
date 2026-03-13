import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Contador, Player } from 'src/app/services/game';
import { ContadoresGeneralComponent } from "../contadores-general/contadores-general.component";

@Component({
  selector: 'app-overlay-contadores',
  templateUrl: './overlay-contadores.component.html',
  styleUrls: ['./overlay-contadores.component.scss'],
  imports: [ContadoresGeneralComponent]
})
export class OverlayContadoresComponent {
  @Input() visible: boolean = false;
  @Input() contadores: Contador[] = [];
  @Input() jugador: Player | null = null;

  @Output() cerrar = new EventEmitter<void>();
  @Output() consola = new EventEmitter<void>();
  @Output() morir = new EventEmitter<void>();

  cerrarOverlay() {
    this.cerrar.emit();
    this.mostrarConsola()
  }

  mostrarConsola(){
    this.consola.emit()
  }

  muerte(){
    this.morir.emit()
  }
}
