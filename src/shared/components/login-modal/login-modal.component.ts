import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import { InputValidatorComponent } from '../input-validator/input-validator.component';
import { AuthFacade } from '@app/store/auth';
import { LoginRequestBody } from '@shared/interfaces/backend/login/LoginRequest';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingOverlayComponent } from '../loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule,
    InputValidatorComponent,
    LoadingOverlayComponent,
  ],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss',
})
export class LoginModalComponent implements OnInit {
  visible: boolean = false;
  loginForm!: FormGroup;
  isLoading$: Observable<boolean> = this.authFacade.isLoading$();
  loginErrors$: Observable<HttpErrorResponse> =
    this.authFacade.getError$();

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    this.prepareForm();
  }

  private prepareForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.loginForm.patchValue({
      username: 'mor_2314',
      password: '83r5^_',
    });
  }

  showModal(): void {
    this.visible = true;
  }

  hideModal(): void {
    this.visible = false;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    const { username, password } = this.loginForm.value;

    const loginBody: LoginRequestBody = {
      username,
      password,
    };

    this.authFacade.login(loginBody);
  }
}
