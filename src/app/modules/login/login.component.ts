import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ClientService} from '../../commons/services/client.service';
import {AuthService} from '../../commons/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private clientService: ClientService,
              private readonly router: Router,
              private readonly auth: AuthService) {}

  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      login: [null, Validators.required],
      password: [null, Validators.required]
    });
  }


  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }



  logInForm(): void {

    // for (const i in this.registerForm.controls) {
    //   this.registerForm.controls[i].markAsDirty();
    //   this.registerForm.controls[i].updateValueAndValidity();
    // }
    console.log("submit..........");
    this.submitted = true;
    console.log("submitted",this.submitted)
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }


       // const self = this;
        this.clientService.login(this.registerForm.value).subscribe(
          res => {
            const token = 'token';
            const role = 'role';
            const id = 'id';
          //  if (res && res[token]) {
              console.log("check result")
              this.auth.signIn(res[id],res[token],res[role]);
              if (res[role].indexOf("ROLE_ADMINISTRATEUR") > -1) {
                this.router.navigate(['/products']);
              } else if (res[role].indexOf("ROLE_CLIENT") > -1){
                this.router.navigate(['/accesstofinance']);
              }
         //   }

          }
        )





  }









}
