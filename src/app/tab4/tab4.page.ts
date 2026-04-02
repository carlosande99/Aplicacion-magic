import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonButton, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CameraPreview, CameraPreviewOptions } from '@capacitor-community/camera-preview';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Ocr, TextDetections } from '@capacitor-community/image-to-text';
import Tesseract from 'tesseract.js';
import { Api } from '../services/api';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonButton, IonCardSubtitle, IonCardTitle]
})
export class Tab4Page {
  imagen: string | undefined;
  nombre: any[] = [];
  nombreCarta: string = '';
  constructor(private api: Api) { }

  // ionViewDidEnter() {
  //   this.tomarFoto();
  // }


  async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 50,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });

      // this.imagen = 'data:image/jpeg;base64,' + image.base64String;

      this.escanearCarta(image.base64String || '');

    } catch (e) {
      console.error('Error en OCR:', e);
    }
  }

  async escanearCarta(imageBase64: string) {
    // Recortar solo la zona superior donde está el nombre
    const base64Recortado = await this.recortarZonaNombre(imageBase64);

    // Mostrar imagen recortada en la app
    this.imagen = 'data:image/png;base64,' + base64Recortado;

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
}
