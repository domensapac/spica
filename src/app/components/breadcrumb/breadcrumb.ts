import { Component, inject, OnInit, signal } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterModule],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
})
export class BreadcrumbComponent{
  router = inject(Router);
  
  currentPath = signal(this.router.url); 

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentPath.set(this.router.url);
    });
  }
}
