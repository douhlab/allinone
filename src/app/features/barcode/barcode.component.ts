import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import JsBarcode from "jsbarcode";
import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrl: './barcode.component.scss'
})
export class BarcodeComponent implements AfterViewInit {
  qrData: string = 'hello world';
  barcodeValue: string = '123456789';


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

}
