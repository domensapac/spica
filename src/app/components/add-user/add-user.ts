import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-add-user',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-user.html',
  styleUrl: './add-user.css',
})
export class AddUser {
  router = inject(Router);
  userService = inject(UserService);

  FirstName: string = '';
  LastName : string = ''; 
  email : string = '';

  submitted = false;

  onSubmit() {
    this.submitted = true; 
    const newUser = {
      FirstName : this.FirstName,
      LastName : this.LastName,
      Email : this.email
    }
    this.userService.addUser(newUser).subscribe();
    this.router.navigate(['/users']);
  }
}
