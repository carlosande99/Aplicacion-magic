import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCardTitle, ModalController } from '@ionic/angular/standalone';
import { Ocr, TextDetections } from '@capacitor-community/image-to-text';
import { Api } from '../services/api';
import { BusquedaAvanzadaModalComponent } from '../components/busqueda-avanzada-modal/busqueda-avanzada-modal.component';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCardTitle]
})
export class Tab4Page {
  imagen: string | undefined;
  nombre: any[] = [];
  nombreCarta: string = '';
  escaneando = false;
  procesando = false; // evita solapamientos
  ultimaLectura = '';
  carta: any = null;
  constructor(private api: Api, private modalCtrl: ModalController) { }
  
  @ViewChild('video', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('scanBox', { static: true }) scanBoxRef!: ElementRef<HTMLDivElement>;


  stream: MediaStream | null = null;

  ngOnInit() {
    this.iniciarCamara();
  }

  ngAfterViewInit() {
    this.iniciarEscaneo();
  }

  iniciarEscaneo() {
    this.escaneando = true;
    this.loopEscaneo();
  }

  detenerEscaneo() {
    this.escaneando = false;
  }

  detenerCamara() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }

    if (this.videoRef?.nativeElement) {
      this.videoRef.nativeElement.srcObject = null;
    }
  }

  async loopEscaneo() {
    if (!this.escaneando) return;

    // evita ejecutar múltiples OCR a la vez
    if (this.procesando) {
      setTimeout(() => this.loopEscaneo(), 300);
      return;
    }

    this.procesando = true;

    try {
      await this.capturarZonaYEscanear();
    } catch (e) {
      console.error(e);
      this.detenerEscaneo();
      this.detenerCamara();
    }

    this.procesando = false;

    // ⏱️ frecuencia (ajusta aquí)
    setTimeout(() => this.loopEscaneo(), 1000);
  }
  
  async iniciarCamara() {
    try{
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment' // cámara trasera
        },
        audio: false
      });

      this.videoRef.nativeElement.srcObject = this.stream;
      await this.videoRef.nativeElement.play();
    }catch(e){
      console.error('Error accediendo a la cámara:', e);
      this.detenerCamara();
      this.detenerEscaneo();
    }
  }

  async capturarZonaYEscanear() {
    try{
      const video = this.videoRef.nativeElement;
      const scanBox = this.scanBoxRef.nativeElement;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      const rect = scanBox.getBoundingClientRect();
      const videoRect = video.getBoundingClientRect();

      const scaleX = videoWidth / videoRect.width;
      const scaleY = videoHeight / videoRect.height;

      const sx = (rect.left - videoRect.left) * scaleX;
      const sy = (rect.top - videoRect.top) * scaleY;
      const sw = rect.width * scaleX;
      const sh = rect.height * scaleY;

      canvas.width = sw;
      canvas.height = sh;

      ctx.drawImage(video, sx, sy, sw, sh, 0, 0, sw, sh);

      const base64 = canvas.toDataURL('image/png').split(',')[1];

      await this.escanearCarta(base64);
    }catch(e){
      console.error('Error capturando o escaneando:', e);
      this.detenerCamara();
      this.detenerEscaneo();
    }
  }

  async escanearCarta(imageBase64: string) {
    // Recortar solo la zona superior donde está el nombre
    const base64Recortado = await this.recortarZonaNombre(imageBase64);

    // Mostrar imagen recortada en la app
    this.imagen = 'data:image/png;base64,' + imageBase64;

    // Detectar texto con ML Kit OCR
    const result: TextDetections = await Ocr.detectText({
      base64: base64Recortado
    });

    if (result.textDetections.length > 0) {
      // Obtener solo la primera línea como nombre de la carta
      this.nombreCarta = result.textDetections[0].text.trim();
      console.log('Nombre de carta:', this.nombreCarta);
    } else {
      this.nombreCarta = 'No se detectó nombre';
    }

    // Llamada a tu API para buscar la carta
    this.nombre = await this.api.buscarCartasNombre(this.nombreCarta);
    console.log(this.nombre);
    
    if (this.nombreCarta && this.nombreCarta !== 'No se detectó nombre') {
      this.detenerEscaneo(); // Detener escaneo después de obtener un resultado
      this.carta = this.nombre[0]; // Tomar la primera carta encontrada
      this.abrirModal(this.carta); // Abrir modal con la carta encontrada
    }
  }


  async recortarZonaNombre(imageBase64: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject('No se pudo obtener contexto del canvas');
          return;
        }

        // Dimensiones reales de la imagen
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        // Solo 20% superior de la carta (ajústalo según tus cartas)
        const cropHeight = height * 0.2;

        canvas.width = width;
        canvas.height = cropHeight;

        // Dibujar solo la parte superior
        ctx.drawImage(img, 0, 0, width, cropHeight, 0, 0, width, cropHeight);

        // Obtener base64 solo de la zona recortada
        const croppedDataUrl = canvas.toDataURL('image/png');
        const base64Cropped = croppedDataUrl.split(',')[1];

        resolve(base64Cropped);
      };

      img.onerror = () => reject('Error cargando la imagen');

      // Importante: usar data URL completo para que funcione en móvil
      img.src = 'data:image/jpeg;base64,' + imageBase64;
    });
  }

  async abrirModal(carta: any) {
    const modal = await this.modalCtrl.create({
      component: BusquedaAvanzadaModalComponent,
      componentProps: {
        carta: carta
      }
    });

    await modal.present();
  }
}
