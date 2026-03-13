import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game, Player } from 'src/app/services/game';
@Component({
  selector: 'app-dano-comandante',
  templateUrl: './dano-comandante.component.html',
  styleUrls: ['./dano-comandante.component.scss'],
})
export class DanoComandanteComponent {

  constructor(public game: Game) {}
  
  @Input() visible: boolean = false;
  @Input() jugadorKey: number = 0;
  @Input() jugadores: Player[] = [];
  @Input() nombre: string = "";
  @Input() danoComandante: Record<number, {c1: number; c2: number}> = {};
  @Output() cerrar = new EventEmitter<void>();
  @Output() consola = new EventEmitter<void>();

  cerrarOverlay() {
    this.cerrar.emit()
  }

  mostrarConsola(){
    this.consola.emit()
  }

  guardarCamarada(event: Event, key: number) {
    const checked = (event.target as HTMLInputElement).checked;
    this.jugadores[key].camarada = checked;
  }
  
  sumarDano(atacanteKey: number, comandante: 1 | 2) {
    // Buscar la víctima por su key (importante, no por índice)
    const victimaIndex = this.game.players.findIndex(
      p => p.key === this.jugadorKey
    );

    if (victimaIndex === -1) return;

    this.game.danoComandante(
      victimaIndex,
      atacanteKey,
      1,
      comandante
    );
    this.mostrarConsola()
  }

  restarDano(atacanteKey: number, comandante: 1 | 2) {
    const victimaIndex = this.game.players.findIndex(
      p => p.key === this.jugadorKey
    );

    if (victimaIndex === -1) return;

    this.game.restarComandante(
      victimaIndex,
      atacanteKey,
      1,
      comandante
    );
    this.mostrarConsola()
  }


}
