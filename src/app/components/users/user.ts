import { Component, inject, signal, OnInit, computed, ViewChild } from '@angular/core';
import { UserService } from '../../services/user-service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'app-usercomponent',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class UserComponent {
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

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
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
