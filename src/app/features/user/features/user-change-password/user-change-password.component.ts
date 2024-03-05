import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthFacade } from '@app/store/auth';
import { InputValidatorComponent } from '@shared/components/input-validator/input-validator.component';
import { User } from '@shared/interfaces/user/User';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import PasswordValidation from '@shared/validators/password.validator';
import { Observable, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-change-password',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PrimeNGModule,
    InputValidatorComponent,
  ],
  templateUrl: './user-change-password.component.html',
  styleUrl: './user-change-password.component.scss',
})
export class UserChangePasswordComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  $user: Observable<User> = this.authFacade.getUser$();
  $userLoading: Observable<boolean> = this.authFacade.isLoading$();

  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    this.prepareForm();
  }

  private prepareForm(): void {
    this.userForm = this.fb.group(
      {
        id: [null],
        password: [
          '',
          Validators.compose([
            Validators.required,
            PasswordValidation.verify(),
          ]),
        ],
        newPassword: [
          '',
          Validators.compose([
            Validators.required,
            PasswordValidation.verify(),
          ]),
        ],
        repeatPassword: [
          '',
          Validators.compose([
            Validators.required,
            PasswordValidation.verify(),
          ]),
        ],
      },
      {
        validators: [
          PasswordValidation.cantMatch('password', 'newPassword'),
          PasswordValidation.match('newPassword', 'repeatPassword'),
        ],
      }
    );

    this.$user
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(this.fillForm.bind(this))
      )
      .subscribe();
  }

  private fillForm(user: User): void {
    this.userForm.patchValue({
      id: user.id,
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    const formData = this.userForm.value;

    const userUpdate: Partial<User> = {
      password: formData.newPassword,
    };

    this.authFacade.updateUser(formData.id, userUpdate);
  }
}
