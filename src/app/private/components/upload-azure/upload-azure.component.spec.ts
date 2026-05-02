import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UploadAzureComponent} from './upload-azure.component';
import {FileService} from "../../services/file.service";
import {of} from "rxjs";

describe('UploadAzureComponent', () => {
  let component: UploadAzureComponent;
  let fixture: ComponentFixture<UploadAzureComponent>;

  let fileService: any;

  beforeEach(async () => {
    fileService = {
      listFilesFromAzure: jest.fn(),
      uploadFileToAzure: jest.fn(),
      downloadFileFromAzure: jest.fn(),
      deleteFileFromAzure: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [UploadAzureComponent],
      providers: [
        {provide: FileService, useValue: fileService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadAzureComponent);
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

  it('should load Azure files', () => {
    fileService.listFilesFromAzure.mockReturnValue(of([
      {fileName: 'file1.txt', uploadedAt: '2026-01-01'}
    ]));

    component.loadFiles();

    expect(component.uploadedFiles.length).toBe(1);
    expect(component.uploadedFiles[0].name).toBe('file1.txt');
  });

  it('should upload file to Azure', () => {
    component.selectedFile = new File(['abc'], 'test.txt');

    fileService.uploadFileToAzure.mockReturnValue(of({
      name: 'test.txt',
      originalName: 'test.txt',
      uploadedAt: '2026-01-01'
    }));

    component.upload();

    expect(fileService.uploadFileToAzure)
      .toHaveBeenCalledWith(expect.any(File));

    expect(component.uploadedFiles.length).toBe(1);
  });

  it('should not upload if no file selected', () => {
    component.selectedFile = undefined;

    component.upload();

    expect(fileService.uploadFileToAzure).not.toHaveBeenCalled();
  });

  it('should delete file and reload list', () => {
    const spy = jest.spyOn(component, 'loadFiles');

    fileService.deleteFileFromAzure.mockReturnValue(of(void 0));

    component.delete('file.txt');

    expect(fileService.deleteFileFromAzure)
      .toHaveBeenCalledWith('file.txt');

    expect(spy).toHaveBeenCalled();
  });

  it('should download file', () => {
    const blob = new Blob(['data'], {type: 'text/plain'});

    fileService.downloadFileFromAzure.mockReturnValue(of(blob));

    global.URL.createObjectURL = jest.fn(() => 'blob:url');

    const createSpy = jest.spyOn(document, 'createElement');

    component.download('file.txt');

    expect(fileService.downloadFileFromAzure)
      .toHaveBeenCalledWith('file.txt');

    expect(createSpy).toHaveBeenCalledWith('a');
  });

  it('should preview image file', () => {
    const blob = new Blob(['img'], {type: 'image/png'});

    fileService.downloadFileFromAzure.mockReturnValue(of(blob));

    global.URL.createObjectURL = jest.fn(() => 'blob:url');

    component.preview('img.png');

    expect(component.previewType).toBe('image');
  });

  it('should preview text file', () => {
    const blob = new Blob(['hello'], {type: 'text/plain'});

    fileService.downloadFileFromAzure.mockReturnValue(of(blob));

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
