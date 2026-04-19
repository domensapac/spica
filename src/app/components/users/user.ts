import { Component, inject, signal, OnInit, computed } from '@angular/core';
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
  
  currentPage = signal(1);
  pageSize = signal(20); 

  
  ngOnInit(): void {
    if(this.userList().length === 0){
      this.getUsers();
    }
  }

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

  paginatedUsers = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize(); 
    const endIndex = startIndex + this.pageSize(); 
    return this.userList().slice(startIndex, endIndex); 
  })

  goToPage(page: number){
    this.currentPage.set(page);
  }

  copyToClipboard(text: string){
    navigator.clipboard.writeText(text);
  }
}
