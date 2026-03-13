import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-select',
  templateUrl: './player-select.page.html',
  styleUrls: ['./player-select.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PlayerSelectPage {
  @Input() showMenu: boolean = true;
  @Input() numPlayers: number = 2;
  @Output() menuEleccion = new EventEmitter<number>();

  menu(numPlayers: number){
    this.menuEleccion.emit(numPlayers);
  }
}
