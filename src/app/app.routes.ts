import { Routes } from '@angular/router';
import { SettingsComponent } from './components/settings/settings';
import { UsersComponent } from './components/users/users';
import { AbsencesComponent } from './components/absences/absences';
import { SingleUserComponent } from './components/single-user/single-user';
import { UserLayoutComponent } from './components/user-layout/user-layout';
import { AddUser } from './components/add-user/add-user';
import { AbsenceLayout } from './components/absence-layout/absence-layout';
import { AddAbsenceComponent } from './components/add-absence/add-absence';

export const routes: Routes = [
  { path: '', redirectTo: 'settings', pathMatch: 'full' },
  { path: 'settings', component: SettingsComponent },    
  //{ path: 'users', component: UsersComponent },  
  {
  path: 'users',
  component: UserLayoutComponent,
  children: [
    { path: '', component: UsersComponent}, 
    { path: 'add', component: AddUser},
    { path: 'edit/:id', component: SingleUserComponent},
    { path: 'absence/add/:id', component: AddAbsenceComponent} 
  ]},
  {
  path: 'absences',
  component: AbsenceLayout,
  children: [
    { path: '', component: AbsencesComponent}, 
  ]}
];