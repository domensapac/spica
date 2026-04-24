import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { AbsenceService } from '../../services/absence-service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatFormField, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-absence',
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './add-absence.html',
  styleUrl: './add-absence.css',
})
export class AddAbsenceComponent {
  absenceService = inject(AbsenceService); 
  private route = inject(ActivatedRoute);
  absenceDefinitions = this.absenceService.cachedAbsenceDefinitions;

  dateFrom : string = ''; 
  dateTo : string = ''; 
  userId : string | null = ''; 
  selectedAbsenceId : string = ''; 

  ngOnInit(){
    if(this.absenceDefinitions().length === 0){
      this.absenceService.getAbsenceDefinitions().subscribe();
    }

    this.route.paramMap.subscribe((obs) => {
      this.userId = obs.get('id');
    });
  }

  onSubmit(){
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
      PartialTimeFrom : formattedFrom,
      PartialTimeTo : formattedTo
    }
    this.absenceService.addAbsence(newAbsence).subscribe(); 
  }
}
