import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  
  url = environment.apiUrl; 
  constructor(private http:HttpClient) { }

  uploadProfileImage(image:any){
    const formData = new FormData();
    formData.append('imageFile', image);
    
    return this.http.post<any>(`${this.url}/file`, formData);
  }

  getImage(key:string){  
    return this.http.get<any>(`${this.url}/file/${key}`);
  }
}
