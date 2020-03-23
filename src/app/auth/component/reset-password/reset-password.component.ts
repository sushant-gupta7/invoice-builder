import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  userForm:FormGroup;
  this
  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private route:ActivatedRoute) {
    this.initializeUserForm();
    this.getURLInformation();
   }

  ngOnInit(): void {
  }

  getURLInformation() {
    this.route.queryParams.subscribe(res=>{
      console.log(res);
    })
  }

  initializeUserForm() {
    this.userForm = this.formBuilder.group({
      password:["",Validators.required],
      confirmPassword:["",Validators.required],
    })
  }

  submit() {
    console.log(this.userForm.value)
    this.authService.resetPassword(this.userForm.value).then(data=>{
      console.log(data);
    }).catch(err=>{
      console.log(err);
    })
  }

  get userFormErrors() {
    return this.userForm.controls;
  }

}
