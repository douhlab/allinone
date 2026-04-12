import { BarcodeComponent } from './barcode.component';
import { ElementRef } from '@angular/core';
import JsBarcode from 'jsbarcode';
import * as htmlToImage from 'html-to-image';

jest.mock('html-to-image', () => ({
  toPng: jest.fn()
}));

jest.mock('jsbarcode', () => jest.fn());

describe('BarcodeComponent', () => {
  let component: BarcodeComponent;

  HTMLCanvasElement.prototype.getContext = jest.fn();

  beforeEach(() => {
    component = new BarcodeComponent();

    component.barcode = new ElementRef(document.createElement('svg'));
    component.qrContainer = new ElementRef(document.createElement('div'));
    component.barcodeContainer = new ElementRef(document.createElement('div'));

    jest.clearAllMocks();
  });

  // ---------------- ngAfterViewInit ----------------

  it('should call JsBarcode on init', () => {
    component.ngAfterViewInit();

    expect(JsBarcode).toHaveBeenCalledWith(
      component.barcode.nativeElement,
      '123456789',
      expect.objectContaining({
        format: 'CODE128'
      })
    );
  });

  // ---------------- generateBarcode ----------------

  it('should regenerate barcode', () => {
    component.generateBarcode();

    expect(JsBarcode).toHaveBeenCalledWith(
      component.barcode.nativeElement,
      '123456789'
    );
  });

  // ---------------- downloadBarcode ----------------

  it('should call htmlToImage for barcode download', async () => {
    (htmlToImage.toPng as jest.Mock).mockResolvedValue('data-url');

    const downloadSpy = jest.spyOn<any, any>(component as any, 'downloadImage');

    await component.downloadBarcode();

    expect(htmlToImage.toPng).toHaveBeenCalledWith(
      component.barcodeContainer.nativeElement,
      expect.objectContaining({
        pixelRatio: 2,
        backgroundColor: 'white'
      })
    );

    expect(downloadSpy).toHaveBeenCalledWith(
      'data-url',
      expect.stringContaining('barcode-')
    );
  });

  // ---------------- downloadQR ----------------

  it('should call htmlToImage for QR download', async () => {
    (htmlToImage.toPng as jest.Mock).mockResolvedValue('data-url');

    const downloadSpy = jest.spyOn<any, any>(component as any, 'downloadImage');

    await component.downloadQR();

    expect(htmlToImage.toPng).toHaveBeenCalledWith(
      component.qrContainer.nativeElement,
      expect.objectContaining({
        pixelRatio: 2
      })
    );

    expect(downloadSpy).toHaveBeenCalledWith(
      'data-url',
      expect.stringContaining('qrcode-')
    );
  });

  // ---------------- downloadImage ----------------

  it('should trigger download link click', () => {
    const clickSpy = jest.fn();

    const createElementSpy = jest
      .spyOn(document, 'createElement')
      .mockReturnValue({
        click: clickSpy
      } as any);

    (component as any).downloadImage('data-url', 'file.png');

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(clickSpy).toHaveBeenCalled();
  });
});
