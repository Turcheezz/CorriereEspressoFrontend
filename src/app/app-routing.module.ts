import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientiComponent } from './pages/clienti/clienti.component';
import { ClienteFormComponent } from './pages/clienti/cliente-form.component';
import { ConsegneComponent } from './pages/consegne/consegne.component';
import { ConsegnaFormComponent } from './pages/consegne/consegna-form.component';
import { TrackingComponent } from './pages/tracking/tracking.component';
import { StatisticheComponent } from './pages/statistiche/statistiche.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tracking', component: TrackingComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'clienti', component: ClientiComponent, canActivate: [authGuard] },
  { path: 'clienti/nuovo', component: ClienteFormComponent, canActivate: [authGuard] },
  { path: 'clienti/:id', component: ClienteFormComponent, canActivate: [authGuard] },
  { path: 'consegne', component: ConsegneComponent, canActivate: [authGuard] },
  { path: 'consegne/nuovo', component: ConsegnaFormComponent, canActivate: [authGuard] },
  { path: 'consegne/:id', component: ConsegnaFormComponent, canActivate: [authGuard] },
  { path: 'statistiche', component: StatisticheComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
