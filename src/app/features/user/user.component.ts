import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { RouterOutlet } from '@angular/router';
import { AuthFacade } from '@app/store/auth';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BaseLayoutComponent } from '@shared/components/base-layout/base-layout.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [UserMenuComponent, RouterOutlet, BaseLayoutComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  constructor(
    private titleService: Title,
    private authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    this.initTitleHandler();
  }

  private initTitleHandler(): void {
    this.authFacade
      .getUser$()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map(user =>
          this.titleService.setTitle(`Shopy - Perfil de ${user.firstName}`)
        )
      )
      .subscribe();
  }
}
