import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@NgModule({
  providers: [HttpClient, AuthService],
})
export class AuthServiceModule {}
