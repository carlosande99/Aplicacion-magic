import { Injectable } from '@angular/core';

export interface Contador {
  nombre: string;
  valor: number | boolean;
  icono: string;
  tipo: number;
}

export interface Player {
  key: number,
  name: string;
  life: number;
  impuesto: [number, number];
  overlayVisibleComandante: boolean;
  danoComandante: Record<number, {c1: number; c2: number}>;
  overlayVisibleImpuesto: boolean;
  camarada: boolean;
  overlayVisibleContadores: boolean;
  contadores: Contador[];
  overlayVisibleMasContadores: boolean;
}

@Injectable({
  providedIn: 'root',
})

export class Game {
  players: Player[] = [];
  jugadores: number = 0;
  
  // ganar vidas o perder vidas
  changeLife(index: number, amount: number) {
    this.players[index].life += amount;
    this.consola(index)
  }
  // muerte por veneno
  changePoison(index: number) {
    this.players[index].life = 0;
    // this.removePlayer(index)
  }
  // reiniciar juego
  resetGame(commander: boolean = false) {
    const startingLife = commander ? 40 : 20;
    this.players.forEach(player => {
      player.life = startingLife;
    });
  }
  // agregar jugador
  addPlayer() {
    if(this.jugadores >= 6) return;
    this.players.push({
      key: this.jugadores,
      name: `Jugador ${this.jugadores + 1}`,
      life: 40,
      impuesto: [0, 0],
      overlayVisibleComandante: false,
      danoComandante: {},
      overlayVisibleImpuesto: false,
      camarada: false,
      overlayVisibleContadores: false,
      overlayVisibleMasContadores: false,
      contadores: [
        {nombre: 'VENENO', valor: 0, icono: 'assets/icon/svg/nph.svg', tipo: 0},
        {nombre: 'RADIACIÓN', valor: 0, icono: 'assets/icon/svg/cc2.svg', tipo: 0},
        {nombre: 'INMORTAL', valor: false, icono: 'assets/icon/svg/eld.svg', tipo: 1},
        {nombre: 'MONARCA', valor: false, icono: 'assets/icon/svg/cn2.svg', tipo: 1},
        {nombre: 'ASCENDER', valor: false, icono: 'assets/icon/svg/rix.svg', tipo: 1},
        {nombre: 'ANILLO', valor: 0, icono: 'assets/icon/svg/ltr.svg', tipo: 0},
        {nombre: 'TORMENTA', valor: 0, icono: 'assets/icon/svg/tmp.svg', tipo: 0},
        {nombre: 'EXPERIENCIA', valor: 0, icono: 'assets/icon/svg/c15.svg', tipo: 0}
      ]
    });
    this.jugadores++;
  }
  // eliminar jugador
  removePlayer(index: number) {
    // this.players.splice(index, 1);
    // this.jugadores--;
    this.players[index].life = 0;
  }
  // impuesto comandante
  impuesto(index: number, amount: number) {
    this.players[index].impuesto[0] += amount;
  }
  // daño comandante
  danoComandante(key: number, attackey: number, amount: number, comandante: 1 | 2) {
    const victima = this.players[key];

    // Crear registro si no existe
    if (!victima.danoComandante[attackey]) {
      victima.danoComandante[attackey] = { c1: 0, c2: 0 };
    }

    // Sumar daño según comandante
    if (comandante === 1) {
      victima.danoComandante[attackey].c1 += amount;

      if (victima.danoComandante[attackey].c1 >= 21) {
        this.removePlayer(key);
        return;
      }
    } else {
      victima.danoComandante[attackey].c2 += amount;

      if (victima.danoComandante[attackey].c2 >= 21) {
        this.removePlayer(key);
        return;
      }
    }
    victima.life -= amount;
  }

    // daño comandante
  restarComandante(key: number, attackey: number, amount: number, comandante: 1 | 2) {
    const victima = this.players[key];

    // Crear registro si no existe
    if (!victima.danoComandante[attackey]) {
      victima.danoComandante[attackey] = { c1: 0, c2: 0 };
    }

    // restar daño según comandante
    if (comandante === 1) {
      if (victima.danoComandante[attackey].c1 <= 0) {
        return;
      }
      victima.danoComandante[attackey].c1 -= amount;
    } else {
      if (victima.danoComandante[attackey].c2 <= 0) {
        return;
      }
      victima.danoComandante[attackey].c2 -= amount;
    }
    victima.life += amount;
  }

  // creacion de la partida
  createGame(catJugadores: number) {
    this.players = [];
    for (let i = 0; i < catJugadores; i++) {
      this.players.push({
        key: i,
        name: `Jugador ${i + 1}`,
        life: 40,
        impuesto: [0, 0],
        overlayVisibleComandante: false,
        danoComandante: {},
        overlayVisibleImpuesto: false,
        camarada: false,
        overlayVisibleContadores: false,
        overlayVisibleMasContadores: false,
        contadores: [
          {nombre: 'VENENO', valor: 0, icono: 'assets/icon/svg/nph.svg', tipo: 0},
          {nombre: 'RADIACIÓN', valor: 0, icono: 'assets/icon/svg/cc2.svg', tipo: 0},
          {nombre: 'INMORTAL', valor: false, icono: 'assets/icon/svg/eld.svg', tipo: 1},
          {nombre: 'MONARCA', valor: false, icono: 'assets/icon/svg/cn2.svg', tipo: 1},
          {nombre: 'ASCENDER', valor: false, icono: 'assets/icon/svg/rix.svg', tipo: 1},
          {nombre: 'ANILLO', valor: 0, icono: 'assets/icon/svg/ltr.svg', tipo: 0},
          {nombre: 'TORMENTA', valor: 0, icono: 'assets/icon/svg/tmp.svg', tipo: 0},
          {nombre: 'EXPERIENCIA', valor: 0, icono: 'assets/icon/svg/c15.svg', tipo: 0}
        ]
      });
    }
    this.jugadores = catJugadores;
  }

  overlayImpuestoAbrir(index: number){
    this.players[index].overlayVisibleImpuesto = true
  }

  overlayImpuestoCerrar(index: number){
    this.players[index].overlayVisibleImpuesto = false
  }

  // muestra datos del jugador por consola
  consola(index: number){
    console.log(this.players[index])
  }

  overlayContadoresAbrir(index: number){
    this.players[index].overlayVisibleContadores = true
  }

  overlayContadoresCerrar(index: number){
    this.players[index].overlayVisibleContadores = false
  }

  overlayVisibleComandanteAbrir(index: number){
    this.players[index].overlayVisibleComandante = true;
  }

  overlayVisibleComandanteCerrar(index: number){
    this.players[index].overlayVisibleComandante = false;
  }

  // comprobador de daño de comandante
  tieneDanoComandante(player: Player): boolean {
    return Object.keys(player.danoComandante).length > 0;
  }

  overlayVisibleMasContadoresAbrir(index: number){
    this.players[index].overlayVisibleMasContadores = true
  }

  overlayVisibleMasContadoresCerrar(index: number){
    this.players[index].overlayVisibleMasContadores = false
  }

  // daño a todos los oponentes
  danoOponentes(key: number, amount: number){
    for(let i = 0; i < this.players.length; i++){
      if(this.players[i].key != key){
        this.players[i].life -= amount;
      }
    }
  }

  // daño a todos los jugadores
  danoPlayers(amount: number){
    for(let i = 0; i < this.players.length; i++){
      this.players[i].life -= amount;
    }
  }
}