import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  formGroup: FormGroup = this.buildFormGroup();

  constructor(private builder: FormBuilder, private userService: UserService, private router: Router) {}

  login() {
    if (this.validateForm()) {
      const request = {
        login: this.formGroup.controls['login'].value,
        password: this.formGroup.controls['password'].value
      };
      this.userService.authenticate(request).subscribe({
        next: () => this.router.navigateByUrl('/')
      });
    }
  }

  private validateForm(): boolean {
    if (this.formGroup.valid) {
      return true;
    }

    const controls = this.formGroup.controls;
    Object.keys(controls).forEach(key => controls[key].markAsTouched());

    return false;
  }

  private buildFormGroup(): FormGroup {
    return this.builder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
