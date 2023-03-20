import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { HttpService } from 'src/app/service/http.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login = new FormGroup({
    username : new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl(''),
  });

  signup = new FormGroup({
    first_name:new FormControl(''),
    last_name:new FormControl(''),
    username : new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl(''),
  });

  
  ls_flag:boolean=true;
  
  
  constructor(private http:HttpService, private router:Router) { }

  ngOnInit(): void {
  }


  onLogin():void{
    let token = btoa(this.login.value.username +":"+this.login.value.password);
    this.http.validateLogin(token).subscribe(res=>{
      if(res.validity){
        localStorage.setItem('token',token);
        localStorage.setItem('loginFlag','true');
        this.router.navigate(['/dashboard'])
      }
    });
  }

  onSignup():void{
    this.http.createUser(this.signup.value).subscribe();
  }

  changePopup(){
    this.ls_flag = !this.ls_flag;
  }
}
