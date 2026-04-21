import { Routes } from '@angular/router';
import { SettingsComponent } from './components/settings/settings';
import { UsersComponent } from './components/users/users';
import { AbsencesComponent } from './components/absences/absences';
import { SingleUserComponent } from './components/single-user/single-user';
import { UserLayoutComponent } from './components/user-layout/user-layout';
import { AddUser } from './components/add-user/add-user';

export const routes: Routes = [
  { path: '', redirectTo: 'settings', pathMatch: 'full' },
  { path: 'settings', component: SettingsComponent },    
  //{ path: 'users', component: UsersComponent },  
  { path: 'absences', component: AbsencesComponent },  
  //{ path: 'users/:id', component: SingleUserComponent },
  {
  path: 'users',
  component: UserLayoutComponent,
  children: [
    { path: '', component: UsersComponent}, 
    { path: 'add', component: AddUser},
    { path: 'edit/:id', component: SingleUserComponent} 
  ]
}
];