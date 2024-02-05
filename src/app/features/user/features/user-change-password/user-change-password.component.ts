import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthFacade } from '@app/store/auth';
import { User } from '@shared/interfaces/user/User';
import { PrimeNGModule } from '@shared/modules/primeng/primeng.module';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-change-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, PrimeNGModule],
  templateUrl: './user-change-password.component.html',
  styleUrl: './user-change-password.component.scss',
})
export class UserChangePasswordComponent implements OnInit {
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
      password: [''],
      newPassword: [''],
      repeatPassword: [''],
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    const formData = this.userForm.value;

    const userUpdate: Partial<User> = {
      id: formData.id,
      password: formData.newPassword,
    };

    this.authFacade.updateUser(userUpdate);
  }
}
