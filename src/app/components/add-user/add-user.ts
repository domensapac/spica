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
  Email : string = '';
  MiddleName : string = ''; 
  BirthDate : string = ''; 
  Address : string = ''; 
  City : string = ''; 
  State : string = '';
  Phone : string = '';
  Mobile : string = ''; 
  Gender : string = '';
  submitted = false;

  onSubmit() {
    this.submitted = true; 
    const newUser = {
      FirstName : this.FirstName,
      LastName : this.LastName,
      Email : this.Email,
      MiddleName : this.MiddleName,
      BirthDate : this.BirthDate,
      Address : this.Address, 
      City : this.City,
      State : this.State, 
      Phone : this.Phone,
      Mobile : this.Mobile, 
      Gender : this.Gender
    }

    this.userService.addUser(newUser).subscribe({
      next: (response) => {
          this.router.navigate(['/users']);
        },
      error: (err) => {
        console.log("error adding user");
        this.submitted = false;
        }
    });

  }
}
