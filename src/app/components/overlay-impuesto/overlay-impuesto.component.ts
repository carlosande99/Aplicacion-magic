import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-overlay-impuesto',
  templateUrl: './overlay-impuesto.component.html',
  styleUrls: ['./overlay-impuesto.component.scss']
})
export class OverlayImpuestoComponent {

  @Input() visible: boolean = false;
  @Input() valorPrincipal: number = 0;
  @Input() valorSecundario: number = 0;
  @Input() nombre: string = '';
  @Input() camaradaValor: boolean = false;

  @Output() cerrar = new EventEmitter<void>();
  @Output() guardarPrincipal = new EventEmitter<number>();
  @Output() guardarSecundario = new EventEmitter<number>();
  @Output() camarada = new EventEmitter<boolean>();
  @Output() consola = new EventEmitter<void>();

  sumarPrincipal() {
    this.valorPrincipal += 2;
  }

  restarPrincipal() {
    if (this.valorPrincipal > 0) {
      this.valorPrincipal -= 2;
    }
  }

  sumarSecundario() {
    this.valorSecundario += 2;
  }

  restarSecundario() {
    if (this.valorSecundario > 0) {
      this.valorSecundario -= 2;
    }
  }

  cerrarOverlay() {
    this.cerrar.emit()
    this.mostrarConsola()
  }

  guardarValor() {
    this.guardarPrincipal.emit(this.valorPrincipal);

    if(this.camaradaValor) {
      this.guardarSecundario.emit(this.valorSecundario);
    }

    this.cerrarOverlay()
  }

  guardarCamarada(event: Event) {
    this.camarada.emit((event.target as HTMLInputElement).checked);
  }

  mostrarConsola(){
    this.consola.emit()
  }
}
