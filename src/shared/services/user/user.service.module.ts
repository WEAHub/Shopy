import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@NgModule({
  providers: [HttpClient, UserService],
})
export class UserServiceModule {}
