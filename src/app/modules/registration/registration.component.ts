import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../commons/services/client.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  validateForm: FormGroup;

  submitted = false;


  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }


  constructor(private fb: FormBuilder,
              private clientService:ClientService,
              private readonly router: Router,
              private toastr:ToastrService) {}


  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }



  get form() { return this.validateForm.controls; }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      nom: [null, Validators.required],
      prenom: [null, Validators.required],
      login: [null,Validators.required],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required]],
      adresse:[null,[Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      ville: [null, [Validators.required]],
      tel:[null, [Validators.required]],
    });
  }

  addUser(){


    this.submitted = true

      console.log("validate form=========>",this.validateForm.valid)
      console.log("from value",this.validateForm.value)
      // const self = this;
      this.clientService.registration(this.validateForm.value).subscribe(
        result => {
          console.log(result)
          this.toastr.success(
            "inscription avec succès",
            "Success",
            {
              closeButton: true,
              timeOut: 5000
            })
          this.router.navigate(['']);
        }

      )




  }



}
