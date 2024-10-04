import { Routes } from '@angular/router';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { LogInComponent } from './auth/pages/log-in/log-in.component';
import { HomeComponent } from './features/pages/home/home.component';

export const routes: Routes = [
    { path:'home', component:  HomeComponent},
    { path:'login', component: LogInComponent },
    { path:'signup', component: SignUpComponent },




    // Rutas para cualquier otro path (dejar de últimas)
    { path:'', redirectTo: 'home', pathMatch: 'full'},
    { path:'**', redirectTo: 'home', pathMatch: 'full'}
];
