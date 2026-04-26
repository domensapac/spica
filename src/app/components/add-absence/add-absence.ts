import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { AbsenceService } from '../../services/absence-service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormField, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SpinnerComponent } from '../spinner/spinner';

@Component({
  selector: 'app-add-absence',
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, SpinnerComponent],
  templateUrl: './add-absence.html',
  styleUrl: './add-absence.css',
})
export class AddAbsenceComponent {
  absenceService = inject(AbsenceService); 
  private route = inject(ActivatedRoute);
  private router = inject(Router); 
  absenceDefinitions = this.absenceService.cachedAbsenceDefinitions;
  feedback = signal<{type: 'success' | 'error' } | null>(null);

  dateFrom : string = ''; 
  dateTo : string = ''; 
  userId : string | null = ''; 
  selectedAbsenceId : string = ''; 
  timeFrom : string = ''; 
  timeTo : string = ''; 
  submitted = false;

  ngOnInit(){
    if(this.absenceDefinitions().length === 0){
      this.absenceService.getAbsenceDefinitions().subscribe();
    }

    this.route.paramMap.subscribe((obs) => {
      this.userId = obs.get('id');
    });
  }

  onSubmit(){
    if(this.dateFrom === this.dateTo && this.timeTo <= this.timeFrom){
      this.feedback.set({
        type: 'error'
      }); 
      return;
    }

    let formattedFrom = null; 
    let formattedTo = null; 

    if(this.dateFrom != "" && this.dateTo != ""){
      formattedFrom = new Date(this.dateFrom).toISOString();
      formattedTo = new Date(this.dateTo).toISOString();
    }
    else{
      formattedFrom= null;
      formattedTo = null; 
    }

    const newAbsence = {
      UserId : this.userId,
      AbsenceDefinitionId : this.selectedAbsenceId,
      Timestamp : new Date().toISOString(),
      PartialTimeFrom : `${formattedFrom?.split('T')[0]}T${this.timeFrom}:00`,
      PartialTimeTo : `${formattedTo?.split('T')[0]}T${this.timeTo}:00`
    }
    this.absenceService.addAbsence(newAbsence).subscribe({
      next: () => {
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
