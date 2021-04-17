import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../commons/services/client.service';
import {Router} from '@angular/router';
import {AuthService} from '../../commons/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private clientService: ClientService,
              private readonly router: Router,
              private readonly auth: AuthService) {}

  ngOnInit(){
    this.changePasswordForm = this.formBuilder.group({
   //   login: [null, Validators.required],
      oldPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      checkNewPassword: [null, Validators.required]
    });
  }


  // convenience getter for easy access to form fields
  get form() { return this.changePasswordForm.controls; }



  changePassword(): void {

    // for (const i in this.registerForm.controls) {
    //   this.registerForm.controls[i].markAsDirty();
    //   this.registerForm.controls[i].updateValueAndValidity();
    // }
    console.log("submit..........");
    this.submitted = true;
    console.log("submitted",this.submitted)
    // stop here if form is invalid
    if (this.changePasswordForm.invalid) {
      return;
    }


    // const self = this;
    this.clientService.changePassword(this.changePasswordForm.value).subscribe((data:any)=>{
      console.log(data)
    });
  }




}
