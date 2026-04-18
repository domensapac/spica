import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-usercomponent',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class UserComponent {
  users = inject(UserService); 

  userList = signal<any[]>([]); 
  
  getUsers(){
    this.users.getUsers().subscribe({
      next: (res : any) => {
        console.log("Success");
        console.log(res) ; 
        this.userList.set(res as any[]); 
      },
      error: (err) =>{
        console.log("Error"); 
      }
    })
  }
}
