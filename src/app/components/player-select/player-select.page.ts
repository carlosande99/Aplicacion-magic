import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonToggle, IonButtons, IonIcon, IonButton, IonList, IonItem } from "@ionic/angular/standalone";

@Component({
  selector: 'app-player-select',
  templateUrl: './player-select.page.html',
  styleUrls: ['./player-select.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonToggle, FormsModule, IonButtons, IonIcon, IonButton, IonList, IonItem]
})
export class PlayerSelectPage implements OnInit{
  paletteToggle = false;
  @Input() showMenu: boolean = true;
  @Input() numPlayers: number = 2;
  @Output() menuEleccion = new EventEmitter<number>();

  ngOnInit() {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize the dark palette based on the initial
    // value of the prefers-color-scheme media query
    this.initializeDarkPalette(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
  }

  menu(numPlayers: number){
    this.menuEleccion.emit(numPlayers);
  }

  // Check/uncheck the toggle and update the palette based on isDark
  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  // Listen for the toggle check/uncheck to toggle the dark palette
  toggleChange(event: CustomEvent) {
    this.toggleDarkPalette(event.detail.checked);
  }

  // Add or remove the "ion-palette-dark" class on the html element
  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }
}
