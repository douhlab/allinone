import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UploadLocalComponent} from './upload-local.component';
import {FileService} from "../../services/file.service";
import {of} from "rxjs";

global.URL.createObjectURL = jest.fn();

describe('UploadLocalComponent', () => {
  let component: UploadLocalComponent;
  let fixture: ComponentFixture<UploadLocalComponent>;

  let fileService: any;

  window.alert = jest.fn();

  beforeEach(async () => {
    fileService = {
      listFilesFromLocal: jest.fn(),
      uploadFileToLocal: jest.fn(),
      downloadFileFromLocal: jest.fn(),
      deleteFileFromLocal: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [UploadLocalComponent],
      providers: [
        {provide: FileService, useValue: fileService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadLocalComponent);
    component = fixture.componentInstance;

    // mock ViewChild
    component.fileInput = {
      nativeElement: {
        files: null
      }
    } as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load files on init', () => {
    fileService.listFilesFromLocal.mockReturnValue(of([
      {fileName: 'a.txt', uploadedAt: '2026-01-01'}
    ]));

    component.loadFiles();

    expect(component.uploadedFiles.length).toBe(1);
    expect(component.uploadedFiles[0].name).toBe('a.txt');
  });

  it('should upload file and update list', () => {
    component.selectedFile = new File(['abc'], 'test.txt');

    fileService.uploadFileToLocal.mockReturnValue(of({
      name: 'test.txt',
      originalName: 'test.txt',
      uploadedAt: '2026-01-01'
    }));

    component.upload();

    expect(fileService.uploadFileToLocal)
      .toHaveBeenCalledWith(expect.any(File));

    expect(component.uploadedFiles.length).toBe(1);
    expect(component.selectedFile).toBeUndefined();
  });

  it('should not upload when no file selected', () => {
    component.selectedFile = undefined;

    component.upload();

    expect(fileService.uploadFileToLocal).not.toHaveBeenCalled();
  });

  it('should delete file and reload list', () => {
    const spy = jest.spyOn(component, 'loadFiles');

    fileService.deleteFileFromLocal.mockReturnValue(of(void 0));

    component.delete('file.txt');

    expect(fileService.deleteFileFromLocal)
      .toHaveBeenCalledWith('file.txt');

    expect(spy).toHaveBeenCalled();
  });

  it('should download file', () => {
    const blob = new Blob(['data'], {type: 'text/plain'});

    fileService.downloadFileFromLocal.mockReturnValue(of(blob));

    const createSpy = jest.spyOn(document, 'createElement');

    component.download('file.txt');

    expect(fileService.downloadFileFromLocal)
      .toHaveBeenCalledWith('file.txt');

    expect(createSpy).toHaveBeenCalledWith('a');
  });

  it('should preview image file', () => {
    const blob = new Blob(['img'], {type: 'image/png'});

    fileService.downloadFileFromLocal.mockReturnValue(of(blob));

    global.URL.createObjectURL = jest.fn(() => 'blob:url');

    component.preview('img.png');

    expect(component.previewType).toBe('image');
  });

  it('should preview text file', () => {
    const blob = new Blob(['hello'], {type: 'text/plain'});

    fileService.downloadFileFromLocal.mockReturnValue(of(blob));

    const readerMock = {
      readAsText: jest.fn(),
      result: 'hello',
      onload: null as any
    };

    global.FileReader = jest.fn(() => readerMock) as any;

    component.preview('file.txt');

    expect(component.previewType).toBe('text');
  });

});
