import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }
  
  url = environment.apiUrl;
  
  sendFeedback(feedback:any){
    return this.http.post<any>(this.url+"/feedback",feedback);
  }

  createUser(data:any){
    return this.http.post<any>(this.url+"/user",data);
  }
  
  getPortfolio(){
      return this.http.get<any>(this.url+"/portfolio");
  }

  deleteProject(portfolioId:String,projectId:String){
    const token = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders().append('Authorization', `Bearer ${token}`)
    }
    return this.http.delete<any>(`${this.url}/portfolio/${portfolioId}/project/${projectId}`,options);
  }

  getAllProjects(){
    return this.http.get<any>(this.url+"/projects");
}
  getProject(portfolioId:String,projectId:String){
    return this.http.get<any>(`${this.url}/portfolio/${portfolioId}/project/${projectId}`);
   }

  createProject(portfolioId:String,data:any){
    const token = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders().append('Authorization', `Bearer ${token}`)
    }
    return this.http.post<any>(`${this.url}/portfolio/${portfolioId}/project`,data,options);
  }

  updateProject(portfolioId:String,projectId:any,data:any){
    const token = localStorage.getItem('token');
    const options = {
      headers: new HttpHeaders().append('Authorization', `Bearer ${token}`)
    }
    return this.http.put<any>(`${this.url}/portfolio/${portfolioId}/project/${projectId}`,data,options);
  }


  validateLogin(token:any){
    const options = {
      headers: new HttpHeaders().append('Authorization', `Bearer ${token}`)
    }
    return this.http.post<any>(this.url+"/login",null,options);
  }

}
