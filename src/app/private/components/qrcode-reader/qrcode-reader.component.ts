import {Component } from '@angular/core';
import jsQR from "jsqr";

@Component({
  selector: 'app-qrcode-reader',
  templateUrl: './qrcode-reader.component.html',
  styleUrl: './qrcode-reader.component.scss'
})
export class QrcodeReaderComponent {

  qrCodeContent: string ='';
  selectedImage: string | null = null;

  zoom: number = 1;
  paneZoom: number = 1;
  offsetX = 0;
  offsetY = 0;

  isDragging = false;
  startX = 0;
  startY = 0;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image');
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: any) => {
      const img = new Image();
      this.selectedImage = e.target.result;
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;

        ctx?.drawImage(img, 0, 0, img.width, img.height);

        const imageData = ctx?.getImageData(0, 0, img.width, img.height);

        if (imageData) {
          const code = jsQR(imageData.data, imageData.width, imageData.height);

          if (code) {
            this.qrCodeContent = code.data;
          } else {
            console.log('No QR found');
          }
        }
        reader.readAsDataURL(file);
      };
    };

    reader.readAsDataURL(file);
  }


  onZoom(event: WheelEvent) {
    event.preventDefault();
    this.paneZoom += event.deltaY * -0.001;
    this.paneZoom = Math.min(Math.max(1, this.paneZoom), 5);
  }

  startDrag(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.clientX - this.offsetX;
    this.startY = event.clientY - this.offsetY;
  }

  onDrag(event: MouseEvent) {
    if (!this.isDragging) return;

    this.offsetX = event.clientX - this.startX;
    this.offsetY = event.clientY - this.startY;
  }

  stopDrag() {
    this.isDragging = false;
  }
}
