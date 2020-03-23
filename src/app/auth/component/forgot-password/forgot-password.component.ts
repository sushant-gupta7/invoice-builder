import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  userForm:FormGroup
  constructor(private formBuilder:FormBuilder,
    private authService:AuthService
    ) { 
      this.initializeUserForm();
    }

  ngOnInit(): void {
  }

  initializeUserForm() {
    this.userForm = this.formBuilder.group({
      email:["",Validators.required]
    })
  }

  submit() {
    console.log(this.userForm.value)
    this.authService.forgotPassword(this.userForm.value).then(data=>{
      console.log(data);
    }).catch(err=>{
      console.log(err);
    })
  }

  get userFormErrors() {
    return this.userForm.controls;
  }

}
