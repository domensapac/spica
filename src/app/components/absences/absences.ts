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
import { FormControl, FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AbsenceService } from '../../services/absence-service';

@Component({
  selector: 'app-absences-component',
  imports: [FormsModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, RouterModule, MatDatepickerModule],
  templateUrl: './absences.html',
  styleUrl: './absences.css',
})
export class AbsencesComponent {
  userService = inject(UserService);
  absenceService = inject(AbsenceService); 
  
  private _liveAnnouncer = inject(LiveAnnouncer);
  
  pickedDate : string = '';
  currentPage = signal(1);
  pageSize = signal(20); 
  displayedColumns: string[] = ['FirstName', 'LastName', 'Timestamp', 'Absence Type', 'From', 'To', 'changes'];
  dataSource = new MatTableDataSource<any | null>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
  effect(() => {
    this.dataSource.data = this.absenceService.cachedAbsences(); 
    this.pickedDate = this.absenceService.cachedDate();
  });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  refreshData(){
    this.dataSource.data = [];
    this.onSubmit();
  }

  onSubmit(){
    if(!this.pickedDate) return;

    const d = new Date(this.pickedDate);
    d.setHours(12,0,0);
    this.absenceService.getAbsences(d).subscribe(); 
  }

  showDialog(event : Event, id : string){
    event.preventDefault();
    const conf = confirm("Are you sure you want to delete this user");

    if(conf){
      const userId : string = id;
      this.absenceService.deleteAbsence(userId).subscribe();
    }
  }
}
