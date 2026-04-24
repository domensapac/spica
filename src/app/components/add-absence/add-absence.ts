import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user-service';
import { AbsenceService } from '../../services/absence-service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-absence',
  imports: [FormsModule],
  templateUrl: './add-absence.html',
  styleUrl: './add-absence.css',
})
export class AddAbsenceComponent {
  absenceService = inject(AbsenceService); 
  private route = inject(ActivatedRoute);

  dateFrom : string = ''; 
  dateTo : string = ''; 
  userId : string | null = ''; 

  ngOnInit(){
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
      AbsenceDefinitionId : "cf5d5560-ab2e-4070-14b6-08d9f11a0528",
      Timestamp : new Date().toISOString(),
      PartialTimeFrom : formattedFrom,
      PartialTimeTo : formattedTo
    }
    this.absenceService.addAbsence(newAbsence).subscribe(); 
  }
}
