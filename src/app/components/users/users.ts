import { Component, inject, signal, OnInit, computed, ViewChild } from '@angular/core';
import { UserService } from '../../services/user-service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-userscomponent',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, RouterModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class UsersComponent {
  users = inject(UserService); 
  private _liveAnnouncer = inject(LiveAnnouncer);

  userList = signal<any[]>([]); 
  
  currentPage = signal(1);
  pageSize = signal(20); 
  displayedColumns: string[] = ['FirstName', 'LastName', 'Id', 'Email', 'changes'];
  dataSource = new MatTableDataSource<any | null>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    if(this.userList().length === 0){
      this.getUsers();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUsers(){
    this.users.getUsers().subscribe({
      next: (res : any) => {
        console.log("Success");
        console.log(res) ; 
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) =>{
        console.log("Error"); 
      }
    })
  }

  showDialog(event : Event, id : string){
    event.preventDefault();
    const conf = confirm("Are you sure you want to delete this user");

    if(conf){
      const userId : string = id;
      this.deleteUser(userId);
    }
  }

  openEditDialog(){}

  deleteUser(userId : string){
    console.log(userId);
    
    this.dataSource.data = this.dataSource.data.filter(u => u?.Id !== userId);

    // Če uporabljaš cachedUsers signal v servisu, posodobi še tega (za konsistentnost)
    this.users.cachedUsers.update(userList =>
      userList.filter((u : any) => u.Id !== userId)
    );

    this.users.deleteUser(userId).subscribe({
      next: (res : any) => {
        console.log("success");
      }, 
      error: (res : any) => {
        this.getUsers();
      }
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  /*
  paginatedUsers = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize(); 
    const endIndex = startIndex + this.pageSize(); 
    return this.userList().slice(startIndex, endIndex); 
  })

  goToPage(page: number){
    this.currentPage.set(page);
  }
  */

  copyToClipboard(text: string){
    navigator.clipboard.writeText(text);
  }
}
