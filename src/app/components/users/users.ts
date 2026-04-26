import { Component, inject, signal, OnInit, computed, ViewChild, effect } from '@angular/core';
import { UserService } from '../../services/user-service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { parse } from 'path';
import { AbsenceService } from '../../services/absence-service';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-userscomponent',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, RouterModule, SlicePipe],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class UsersComponent {
  userService = inject(UserService); 
  absenceService = inject(AbsenceService);

  private _liveAnnouncer = inject(LiveAnnouncer);

  userList = signal<any[]>([]); 
  
  currentPage = signal(1);
  pageSize = signal(20); 
  displayedColumns: string[] = ['FirstName', 'LastName', 'Id', 'Email', 'Absence', 'Actions'];
  dataSource = new MatTableDataSource<any | null>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    effect(() => {
      this.dataSource.data = this.userService.cachedUsers();
    });
  }

  ngOnInit() {
    if (this.userService.cachedUsers().length === 0) {
      this.userService.getUsers().subscribe();
    }
    this.absenceService.getAbsenceDefinitions().subscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  getUsers(){
    this.userService.getUsers().subscribe({
      next: (res : any) => {
        //console.log("Success");
        //console.log(res) ; 
        this.dataSource.data = res;
        localStorage.setItem('usersData', JSON.stringify(res));
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
    this.userService.deleteUser(userId).subscribe();
  }

  announceSortChange(sortState: Sort) {
    console.log("a");
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

  copyToClipboard(text: string){
    navigator.clipboard.writeText(text);
  }
}
