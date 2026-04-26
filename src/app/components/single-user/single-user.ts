import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user-service';
import { SpinnerComponent } from '../spinner/spinner';

@Component({
  selector: 'app-single-user-component',
  imports: [CommonModule, FormsModule, RouterModule, SpinnerComponent],
  templateUrl: './single-user.html',
  styleUrl: './single-user.css',
})
export class SingleUserComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);
  feedback = signal<{type: 'success' | 'error' } | null>(null);

  id : string | null = ''; 
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


  ngOnInit(){
    this.route.paramMap.subscribe((obs) => {
      this.id = obs.get('id');
    });

    const user = this.userService.cachedUsers()?.find((u: any) => u.Id === this.id);
    
    if(this.id){
      this.fillForm(user);
    }
  }

 fillForm(user : any){
  let date : string = ''; 
  if(user.BirthDate !== null)
   date = user.BirthDate.split("T")[0];

  this.FirstName = user.FirstName; 
  this.LastName = user.LastName; 
  this.Email = user.Email; 
  this.MiddleName = user.MiddleName; 
  this.BirthDate = date;
  this.Address = user.Address; 
  this.City = user.City; 
  this.State = user.State; 
  this.Phone = user.Phone; 
  this.Mobile = user.Mobile; 
  this.Gender = user.Gender;
 }

  onSubmit() {
    let formattedDate = null; 
    if(this.BirthDate != ""){
      formattedDate = new Date(this.BirthDate).toISOString();
    }
    else{
      formattedDate = null;
    }
    this.submitted = true; 

    const newUser = {
      Id : this.id,
      FirstName : this.FirstName,
      LastName : this.LastName,
      Email : this.Email,
      MiddleName : this.MiddleName,
      BirthDate : formattedDate,
      Address : this.Address, 
      City : this.City,
      State : this.State, 
      Phone : this.Phone,
      Mobile : this.Mobile, 
      Gender : this.Gender
    }

    this.userService.editUser(this.id, newUser).subscribe({
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
