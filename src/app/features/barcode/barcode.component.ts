import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import JsBarcode from "jsbarcode";
import * as htmlToImage from 'html-to-image';
import jsQR from 'jsqr';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrl: './barcode.component.scss'
})
export class BarcodeComponent implements AfterViewInit {
  qrData: string = 'hello world';
  barcodeValue: string = '123456789';

  qrCodeContent: string ='';
  selectedImage: string | null = null;

  zoom: number = 1;

  @ViewChild('barcode', { static: true }) barcode!: ElementRef;
  @ViewChild('qrContainer') qrContainer!: ElementRef;
  @ViewChild('barcodeContainer') barcodeContainer!: ElementRef;

  ngAfterViewInit() {
    JsBarcode(this.barcode.nativeElement, this.barcodeValue, {
      format: "CODE128",
      width: 2,
      height: 100
    });
  }

  generateBarcode() {
    JsBarcode(this.barcode.nativeElement, this.barcodeValue);
  }

  downloadBarcode() {
    htmlToImage.toPng(this.barcodeContainer.nativeElement, { pixelRatio: 2, backgroundColor: 'white' })
      .then((dataUrl) => {
        const name = `barcode-${Date.now()}.png`;
        this.downloadImage(dataUrl, name);
      });
  }

  downloadQR() {
    htmlToImage.toPng(this.qrContainer.nativeElement, { pixelRatio: 2, backgroundColor: 'white' } )
      .then((dataUrl) => {
        const name = `qrcode-${Date.now()}.png`;
        this.downloadImage(dataUrl, name);
      });
  }

  private downloadImage(dataUrl: string, fileName: string) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;
    link.click();
  }

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
            console.log('QR content:', code.data);
          } else {
            console.log('No QR found');
          }
        }
        reader.readAsDataURL(file);
      };
    };

    reader.readAsDataURL(file);
  }
}
