import { Routes } from '@angular/router';
import { ListaVeiculosComponent } from './components/lista-veiculos/lista-veiculos.component';

export const routes: Routes = [
  { path: '', redirectTo: '/veiculos', pathMatch: 'full' },
  { path: 'veiculos', component: ListaVeiculosComponent },
];
