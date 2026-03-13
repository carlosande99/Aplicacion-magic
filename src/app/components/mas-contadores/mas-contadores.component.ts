import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from 'src/app/services/game';

@Component({
  selector: 'app-mas-contadores',
  templateUrl: './mas-contadores.component.html',
  styleUrls: ['./mas-contadores.component.scss'],
})
export class MasContadoresComponent {

  constructor(public game: Game) {}

  @Input() visible : boolean = false;
  @Input() jugadorKey : number = 0;
  @Output() cerrar = new EventEmitter<void>();
  contadoresOponentes: number = 0;
  contadoresPlayers: number = 0;
  cerrarOverlay() {
    this.contadoresOponentes = 0;
    this.cerrar.emit();
  }

  danoOponentes(amount: number){
    if(this.contadoresOponentes >= 0 && amount > 0 || this.contadoresOponentes > 0 && amount < 0){
      this.contadoresOponentes += amount;
      this.game.danoOponentes(this.jugadorKey, amount);
    }
  }

  danoPlayers(amount: number){
    if(this.contadoresPlayers >= 0 && amount > 0 || this.contadoresPlayers > 0 && amount < 0){
      this.contadoresPlayers += amount;
      this.game.danoPlayers(amount);
    }
  }

  rendirse(){
    this.game.removePlayer(this.jugadorKey)
    this.cerrarOverlay();
  }
}
