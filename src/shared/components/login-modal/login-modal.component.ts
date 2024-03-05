import { Component, DestroyRef, OnInit, inject } from '@angular/core';
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
import { LoginRequestBody } from '@shared/interfaces/backend/auth/LoginRequest';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingOverlayComponent } from '../loading-overlay/loading-overlay.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule,
    InputValidatorComponent,
    LoadingOverlayComponent,
    TranslateModule,
  ],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss',
})
export class LoginModalComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  visible: boolean = false;
  loginForm!: FormGroup;
  isLoading$: Observable<boolean> = this.authFacade.isLoading$().pipe();
  loginErrors$: Observable<HttpErrorResponse> =
    this.authFacade.getError$();

  isAuth$: Observable<boolean> = this.authFacade.isAuthenticated$();

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    this.prepareForm();
    this.authHandler();
  }

  private prepareForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.loginForm.patchValue({
      password: 'TestinG123!X',
      email: '31@gmail.com',
    });

    this.loginForm.markAllAsTouched();
  }

  private authHandler(): void {
    this.isAuth$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(isAuth => {
        if (isAuth) {
          this.hideModal();
        }
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
    const { email, password } = this.loginForm.value;

    const loginBody: LoginRequestBody = {
      email,
      password,
    };

    this.authFacade.login(loginBody);
  }
}
