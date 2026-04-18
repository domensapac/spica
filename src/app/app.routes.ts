import { Routes } from '@angular/router';
import { SettingsComponent } from './components/settings/settings';
import { UserComponent } from './components/users/user';
import { AbsencesComponent } from './components/absences/absences';

export const routes: Routes = [
  { path: '', redirectTo: 'settings', pathMatch: 'full' },
  { path: 'settings', component: SettingsComponent },    
  { path: 'users', component: UserComponent },  
  { path: 'absences', component: AbsencesComponent },  

];