import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { Game, Player } from '../services/game';
import { CommonModule } from '@angular/common';
import { OverlayImpuestoComponent } from '../components/overlay-impuesto/overlay-impuesto.component';
import { OverlayContadoresComponent } from '../components/overlay-contadores/overlay-contadores.component';
import { DanoComandanteComponent } from '../components/dano-comandante/dano-comandante.component';
import { MasContadoresComponent } from '../components/mas-contadores/mas-contadores.component';
import { PlayerSelectPage } from '../components/player-select/player-select.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonContent, CommonModule, OverlayImpuestoComponent, OverlayContadoresComponent, DanoComandanteComponent, MasContadoresComponent, PlayerSelectPage],
})
export class Tab1Page implements OnInit {
  constructor(public game: Game) {}
  showMenu: boolean = true;
  showPlay: boolean = false;
  numPlayers: number = 2;

  menuEleccion(numPlayers : number){
    this.game.createGame(numPlayers);
    this.showMenu = false;
    this.showPlay = true;
  }

  ngOnInit() {
    // this.game.createGame(this.numPlayers);
  }

  overlayImpuestoAbrir(index: number){
    this.game.overlayImpuestoAbrir(index)
  }

  overlayImpuestoCerrar(index: number){
    this.game.overlayImpuestoCerrar(index)
  }

  impuesto(index: number, amount: number) {
    this.game.impuesto(index, amount);
  }

  consola(index:number){
    this.game.consola(index)
  }

  overlayContadoresAbrir(index: number){
    this.game.overlayContadoresAbrir(index)
  }

  overlayContadoresCerrar(index: number){
    this.game.overlayContadoresCerrar(index)
  }

  muerte(index: number){
    this.game.changePoison(index)
  }

  danoComandante(key: number, attackey: number, amount: number, comandante: 1 | 2){
    this.game.danoComandante(key, attackey, amount, comandante);
  }

  overlayVisibleComandanteAbrir(index: number){
    this.game.overlayVisibleComandanteAbrir(index);
  }

  overlayVisibleComandanteCerrar(index: number){
    this.game.overlayVisibleComandanteCerrar(index);
  }
  tieneDanoComandante(player: Player): boolean {
    return this.game.tieneDanoComandante(player);
  }
  getDanoEntries(player: Player) {
    return Object.entries(player.danoComandante);
  }

  overlayVisibleMasContadoresAbrir(index: number){
    this.game.overlayVisibleMasContadoresAbrir(index);
  }

  overlayVisibleMasContadoresCerrar(index: number){
    this.game.overlayVisibleMasContadoresCerrar(index);
  }


}
