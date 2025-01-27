import { Routes } from '@angular/router';
import { ListaVeiculosComponent } from './components/lista-veiculos/lista-veiculos.component';
import {AdicionarVeiculoComponent} from './components/adicionar-veiculo/adicionar-veiculo.component';
import {DetalharVeiculoComponent} from './components/detalhar-veiculo/detalhar-veiculo.component';
import {EditarVeiculoComponent} from './components/editar-veiculo/editar-veiculo.component';

export const routes: Routes = [
  { path: '', redirectTo: '/veiculos', pathMatch: 'full' },
  { path: 'veiculos', component: ListaVeiculosComponent },
  { path: 'adicionar-veiculo', component: AdicionarVeiculoComponent },
  { path: 'editar-veiculo/:id', component: EditarVeiculoComponent },
  { path: 'detalhar-veiculo/:id', component: DetalharVeiculoComponent }
];
