import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthFacade } from '@app/store/auth';
import { User } from '@shared/interfaces/user/User';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import { Observable, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const onlyLettersRegex: RegExp = /[a-zA-Z ]*/;
const phoneRegex: RegExp = /[0-9-]/;

const vLetters = Validators.compose([
  Validators.required,
  Validators.pattern(onlyLettersRegex),
]);

const vEmail = Validators.compose([Validators.required, Validators.email]);

const vPhone = Validators.compose([
  Validators.required,
  Validators.pattern(phoneRegex),
  Validators.maxLength(14),
]);

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, PrimeNGModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {
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
    this.userForm = this.fb.group({
      id: [null],
      firstName: ['', vLetters],
      lastName: ['', vLetters],
      email: ['', vEmail],
      phone: ['', vPhone],
    });

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
      firstName: user.name.firstname,
      lastName: user.name.lastname,
      email: user.email,
      phone: user.phone,
    });

    this.userForm.markAllAsTouched();
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    const formData = this.userForm.value;

    const userUpdate: Partial<User> = {
      id: formData.id,
      name: {
        firstname: formData.firstName,
        lastname: formData.lastName,
      },
      phone: formData.phone,
      email: formData.email,
    };

    this.authFacade.updateUser(userUpdate);
  }
}
