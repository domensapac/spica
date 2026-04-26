import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { Component, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../../services/user-service';
import { SpinnerComponent } from '../spinner/spinner';

@Component({
  selector: 'app-add-user',
  imports: [CommonModule, FormsModule, RouterModule, SpinnerComponent],
  templateUrl: './add-user.html',
  styleUrl: './add-user.css',
})
export class AddUser {
  router = inject(Router);
  userService = inject(UserService);
  feedback = signal<{type: 'success' | 'error' } | null>(null);

  now: string = new Date().toISOString().split('T')[0];

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
          this.feedback.set({ 
          type: 'success' 
        });
        setTimeout(() => this.router.navigate(['/users']) , 3000);
        this.submitted = false;
        },
      error: (err) => {
        this.feedback.set({ 
          type: 'error' 
        });
        this.submitted = false;
        }
    });
  }
}
