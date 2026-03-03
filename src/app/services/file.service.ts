import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = environment.apiUrl;
  private readonly baseLocalUploadUrl = `${this.apiUrl}/simple-spa/v1/api/local/files`;
  private readonly baseAzureUploadUrl = `${this.apiUrl}/simple-spa/v1/api/azure/files`;

  constructor(private http: HttpClient) {}

  uploadFileToLocal(file: File): Observable<UploadedFile> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<UploadedFile>(`${this.baseLocalUploadUrl}/save`, formData);
  }

  downloadFileFromLocal(fileName: string): Observable<Blob> {
    return this.http.get(`${this.baseLocalUploadUrl}/${fileName}`, {
      responseType: 'blob'
    });
  }

  uploadFileToAzure(file: File): Observable<UploadedFile> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<UploadedFile>(`${this.baseAzureUploadUrl}/save`, formData);
  }

  downloadFileFromAzure(fileName: string): Observable<Blob> {
    return this.http.get(`${this.baseAzureUploadUrl}/${fileName}`, {
      responseType: 'blob'
    });
  }

  listFilesFromAzure(): Observable<any[]> {
    return this.http.get<any[]>(this.baseAzureUploadUrl);
  }

  listFilesFromLocal(): Observable<any[]> {
    return this.http.get<any[]>(this.baseLocalUploadUrl);
  }

  deleteFileFromAzure(fileName: string) {
    return this.http.delete(`${this.baseAzureUploadUrl}/${fileName}`);
  }

  deleteFileFromLocal(fileName: string) {
    return this.http.delete(`${this.baseLocalUploadUrl}/${fileName}`);
  }
}
