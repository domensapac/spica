import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth-service';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './components/settings/settings';
import { Router } from 'express';
import { NavbarComponent } from './components/navbar/navbar';
import { UsersComponent } from './components/users/users';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('moj-projekt');
  
}
