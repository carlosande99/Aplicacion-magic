import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Player, Contador } from 'src/app/services/game';

@Component({
  selector: 'app-contadores-general',
  templateUrl: './contadores-general.component.html',
  styleUrls: ['./contadores-general.component.scss'],
})
export class ContadoresGeneralComponent{
  @Input() jugador: Player | null = null;
  @Input() contadores: Contador[] = [];
  @Output() consola = new EventEmitter<void>();
  @Output() morir = new EventEmitter<void>();

  incrementar(contador: Contador) {
    if (typeof contador.valor === 'number') {
      if(contador.nombre === 'ANILLO' && contador.valor === 4){
        return;
      }
      contador.valor += 1;
      if(contador.nombre === 'VENENO' && contador.valor >= 10){
        this.muerte();
      }
      
    }else{
      if(contador.valor === false){
        contador.valor = true
      }else{
        contador.valor = false
      }
    }
    this.mostrarConsola()
  }

  decrementar(contador: Contador) {
    if (typeof contador.valor === 'number') {
      if(contador.valor > 0){
        contador.valor -= 1;
      }
    }else{
      if(contador.valor === false){
        contador.valor = true
      }else{
        contador.valor = false
      }
    }
    this.mostrarConsola()
  }

  mostrarConsola(){
    this.consola.emit()
  }

  muerte(){
    this.morir.emit()
  }

}
