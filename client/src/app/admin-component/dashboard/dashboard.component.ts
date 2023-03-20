import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  projects=[];
  portfolioId="";
  constructor(private http:HttpService,private route:Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.http.validateLogin(token).subscribe(res=>{
      if(res.validity == "true" || res.validity == true){
        this.http.getPortfolio().subscribe(res=>{
          this.portfolioId= res.id;
          this.projects = res.Projects;
        });    
      }else{
        this.route.navigate(["/"]);
      }
    },err=>{
      this.route.navigate(["/"]);
    });
  }

}
