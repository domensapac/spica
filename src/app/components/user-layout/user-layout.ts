import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb';

@Component({
  selector: 'app-user-layout-component',
  imports: [RouterModule, BreadcrumbComponent],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.css',
})
export class UserLayoutComponent {}
