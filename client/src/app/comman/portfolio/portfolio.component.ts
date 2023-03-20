import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/service/theme.service';
import { HttpService } from 'src/app/service/http.service';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploadService} from 'src/app/service/file-upload.service';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  constructor(private themeService:ThemeService,private httpService:HttpService,private router:Router,
    private uploadFileService:FileUploadService) { }
  portfolio:any;
  projects:any[]=[];
  submitted = false;
  resumeLink = "";
  feedback = new FormGroup({
    name:new FormControl('',[
      Validators.required
    ]),
    message:new FormControl('',
    [Validators.required]),
    email : new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    subject: new FormControl('',[
      Validators.required
    ]),
  });
  
  thankYouHeader = "Get in Touch";
 
  ngOnInit(){
    // Generating resume Link
    this.uploadFileService.getImage("Dharmik_Harkhani_Resume.pdf").subscribe(res2=>{
      this.resumeLink=  res2.url;
    })

    if(localStorage.getItem("date")==undefined || localStorage.getItem("date") != new Date().toISOString().slice(0, 10)){
      localStorage.setItem("date",new Date().toISOString().slice(0, 10))
    }
    if(localStorage.getItem("count")== undefined ||localStorage.getItem("date") != new Date().toISOString().slice(0, 10)){
      localStorage.setItem("count","5")
    }
    
    // getting Previous theme
    let prevTheme = localStorage.getItem('theme');
    if(prevTheme != null){
      this.changeTheme(prevTheme);
    }
    // getting portfolio Data
    this.httpService.getPortfolio().subscribe(res=>{
       this.portfolio = res;
       this.projects = this.portfolio.Projects;
       if(this.projects != null){
          this.projects.forEach(project =>{
            if(project.image != ""){
            // get the project image
              this.uploadFileService.getImage(project.image).subscribe(res2=>{
                project.imageBody =  res2.url;
              })
            } 
          });
       }
    });
    }

  openLogin(){
    this.router.navigate(['/login']);
  }

  changeTheme(theme:string){
     localStorage.setItem('theme',theme);
    if(theme == 'blue'){
      this.themeService.setBlue();
    }else if(theme == 'default'){
      this.themeService.setDefault();
    }else if(theme == 'green'){
      this.themeService.setGreen();
    }else if(theme == 'purple'){
      this.themeService.setPurple();
    }

  }

  submitFeedback(){
    this.submitted=true;
    if(!this.feedback.valid){
      this.thankYouHeader = "Please Enter valid data";
      setTimeout(() => {
        this.thankYouHeader = "Get in Touch";
        this.submitted = false;
      }, 3000);  
      return
    }

    let count= parseInt(localStorage.getItem("count")!);
    if(count > 0){
      count -= 1
      localStorage.setItem("count",""+count);
      this.httpService.sendFeedback(this.feedback.value).subscribe();  
      this.feedback.reset()
      this.thankYouHeader = "Thanks for reaching out.";
    
      setTimeout(() => {
        this.thankYouHeader = "Get in Touch";
      }, 5000); 
      
    }else{
      this.thankYouHeader = "Please try again Tomorrow";
    }
    this.submitted=false;


  }

  get f() { return this.feedback.controls; }
}
