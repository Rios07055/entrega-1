import { Routes } from '@angular/router';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { LogInComponent } from './auth/pages/log-in/log-in.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { PropertyComponent } from './features/home/pages/property/property.component';
import { CreatePropertyComponent } from './features/home/pages/create-property/create-property.component';
import { ProfileComponent } from './features/profile/pages/profile/profile.component';
import { loginGuard } from './guards/login.guard';
import { logoutGuard } from './guards/logout.guard';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LogInComponent, canActivate: [logoutGuard] },
    { path: 'signup', component: SignUpComponent, canActivate: [logoutGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [loginGuard] },
    { path: 'create-property', component: CreatePropertyComponent, canActivate: [loginGuard] },
    { path: 'property/:id', component: PropertyComponent },




    // Rutas para cualquier otro path (dejar de últimas)
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
