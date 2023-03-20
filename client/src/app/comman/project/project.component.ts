import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { ThemeService } from '../../service/theme.service';
import { FileUploadService } from 'src/app/service/file-upload.service';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  portfolioId="";
  projectId="";
  s3Url = 'https://dharmikportfoliobucket.s3.amazonaws.com/';
  pagesFlag=false;

  model:
    {name:String,
      shortDesc:String,
      description:String,
      technologies:any,
      pages:any[],
      image:String,
    }
    = {name:"",shortDesc:"",description:"",technologies:"",pages:[],image:""};
  
  constructor(private themeService:ThemeService,private http:HttpService,private route:ActivatedRoute,private router:Router,
    private fileUploadService:FileUploadService) { }
  
  ngOnInit(){
    // getting data
    this.route.params.subscribe(params => {
      this.portfolioId = params['portfolio_id']; // (+) converts string 'id' to a number
      this.projectId = params['project_id'];
      if(this.projectId != undefined && this.projectId != "undefined"){
        this.http.getProject(this.portfolioId,this.projectId).subscribe(res=>{
          this.model.name = res.name;
          this.model.shortDesc = res.shortDesc;
          this.model.description = res.description.split("\n");
          this.model.technologies = res.technologies;
          this.model.pages = res.Projectpages;
          if(res.image != ""){
          this.fileUploadService.getImage(res.image).subscribe(res1=>{
            this.model.image = res1.url
          });
          }
          if(this.model.pages.length > 0 ){
            this.pagesFlag=true;
            for(let i = 0;i< this.model.pages.length;i++){
              if(this.model.pages[i].key != ""){
                this.fileUploadService.getImage(this.model.pages[i].key).subscribe(res2=>{
                  this.model.pages[i].image = res2.url
                });
              }
              this.model.pages[i].description= this.model.pages[i].description.split("\n");
            }
          }
       })
      }else{
        this.router.navigate(['/']);
      }
    });

    let prevTheme = localStorage.getItem('theme');
    if(prevTheme != null){
      this.changeTheme(prevTheme);
    }
  }

  changeTheme(theme:any){
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
  getUrl(key:string){
    // this.fileUploadService.getImage(key).subscribe(res=>{

    // })
  }

}
