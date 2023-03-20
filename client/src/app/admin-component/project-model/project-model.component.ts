import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { HttpService } from 'src/app/service/http.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-project-model',
  templateUrl: './project-model.component.html',
  styleUrls: ['./project-model.component.scss']
})
export class ProjectModelComponent implements OnInit {
  newTech:string = "";
  portfolioId:String="";
  projectId="undefined";
  s3Url = 'https://dharmikportfoliobucket.s3.amazonaws.com/';
  model:any={
    name:"Project Name",
    image:"",
    shortDesc:"short desc",
    description:"<p>Description</p>",
    technologies:[],
    pages:[]
  };
  
  imageObject:{
    key:String,
    title:String,
    description:String
  }={
    key: "",
    title: "",
    description: ""
  }

  fileObj: File | undefined;
  selectedFileSrc: string="";
  imageLink:String = "";
  constructor(private fileservice:FileUploadService,private http:HttpService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    // this.model.description="DES";
     this.route.params.subscribe(params => {
      this.portfolioId = params['portfolio_id']; // (+) converts string 'id' to a number
      this.projectId = params['project_id'];
      if(this.projectId != undefined && this.projectId != "undefined"){
        this.http.getProject(this.portfolioId,this.projectId).subscribe(res=>{
          this.model.image = res.image;
          this.model.name = res.name;
          this.model.shortDesc = res.shortDesc;
          this.model.description = res.description;
          this.model.technologies = res.technologies;
          this.model.pages = res.Projectpages;

          if(this.model.image != undefined && this.model.image != ""){
            this.fileservice.getImage(this.model.image).subscribe(res2=>{
              this.imageLink =  res2.url;
            })
          }
        })
      }
    });
  }
  
  onClickSubmit(result:any) {
  //  new project
  if(this.projectId == undefined || this.projectId == "undefined"){
    this.http.createProject(this.portfolioId,this.model).subscribe(res=>{
    })
  }else{
    this.http.updateProject(this.portfolioId,this.projectId,this.model).subscribe(res=>{
    })
  }
    
 }

 
 addTech(){
  this.model.technologies.push(this.newTech);
  this.newTech="";
 }

 onFilePicked(imageInput:any): void {
  
  // Getting the file info into FILE
  const file:File = imageInput.files[0];
  
  //Reading the file
  const reader = new FileReader();
  
  this.fileservice.uploadProfileImage(file).subscribe(res=>{
    this.imageObject.key = res.key;
  },(err)=>{
  });
}

onFilePickedMain(imageInput:any): void {
  // Getting the file info into FILE
  const file:File = imageInput.files[0];
  //Reading the file
  const reader = new FileReader();
  
  this.fileservice.uploadProfileImage(file).subscribe(res=>{
    this.model.image = res.key;
  },(err)=>{
  });
}

onFileUpload() {
  this.model.pages.push(JSON.parse(JSON.stringify(this.imageObject)));
 
}

deleteTech(index:number){
  if(this.model.technologies.length > index){
    this.model.technologies.splice(index,1);
  }
}

deletePage(index:number){
  if(this.model.pages.length > index){
    this.model.pages.splice(index,1);
  }
}
}
