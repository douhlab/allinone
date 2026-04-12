import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FileService} from '../../services/file.service';
import {UploadedFile} from "../../shared/domain/uploads/uploaded-file";

@Component({
  selector: 'app-upload-local',
  templateUrl: './upload-local.component.html',
  styleUrl: './upload-local.component.scss'
})
export class UploadLocalComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  selectedFile?: File;
  uploadedFiles: UploadedFile[] = [];
  uploading = false;

  previewContent: string | ArrayBuffer | null = null;
  previewType: 'image' | 'text' | 'unsupported' | null = null;

  maxSize = 10 * 1024 * 1024; // 10MB

  constructor(private fileService: FileService) {
  }

  ngOnInit() {
    this.loadFiles();
  }

  loadFiles(): void {
    this.fileService.listFilesFromLocal().subscribe((files) => {
      this.uploadedFiles = files.map((f: any) => ({
        name: f.fileName,
        originalName: f.fileName,
        uploadedAt: f.uploadedAt
      }));
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragEnter(event: DragEvent) {
    event.preventDefault(); // optional but safer
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    console.log('DROP FIRED 🔥');

    const files = event.dataTransfer?.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    if (file.size > this.maxSize) {
      alert('File too large');
      return;
    }

    this.selectedFile = file;

    // ✅ Update input field manually
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    this.fileInput.nativeElement.files = dataTransfer.files;
  }

  upload(): void {
    if (!this.selectedFile) return;

    this.uploading = true;

    this.fileService.uploadFileToLocal(this.selectedFile).subscribe({
      next: (response) => {
        this.uploadedFiles.push({
          name: response.name,
          originalName: response.originalName,
          uploadedAt: response.uploadedAt
        });

        this.selectedFile = undefined;
        this.uploading = false;
      },
      error: (err) => {
        console.error('Upload failed', err);
        this.uploading = false;
      }
    });
  }

  download(fileName: string): void {
    this.fileService.downloadFileFromLocal(fileName).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  preview(fileName: string): void {
    this.fileService.downloadFileFromLocal(fileName).subscribe((blob) => {
      const fileType = blob.type;

      // IMAGE
      if (fileType.startsWith('image/')) {
        this.previewType = 'image';
        this.previewContent = URL.createObjectURL(blob);
      }
      // TEXT
      else if (fileType.startsWith('text/') || fileType === 'application/json') {
        this.previewType = 'text';
        const reader = new FileReader();
        reader.onload = () => {
          this.previewContent = reader.result;
        };
        reader.readAsText(blob);
      }
      // UNSUPPORTED
      else {
        this.previewType = 'unsupported';
        this.previewContent = null;
      }
    });
  }

  delete(fileName: string) {
    this.fileService.deleteFileFromLocal(fileName).subscribe(() => {
      this.loadFiles();
    });
  }
}
