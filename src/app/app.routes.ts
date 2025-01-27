import { Routes } from '@angular/router';
import { ListaVeiculosComponent } from './components/lista-veiculos/lista-veiculos.component';
import {AdicionarVeiculoComponent} from './components/adicionar-veiculo/adicionar-veiculo.component';

export const routes: Routes = [
  { path: '', redirectTo: '/veiculos', pathMatch: 'full' },
  { path: 'veiculos', component: ListaVeiculosComponent },
  { path: 'adicionar-veiculo', component: AdicionarVeiculoComponent }
];
