import { Component, inject, OnInit } from '@angular/core';
import { VeiculoService } from '../../services/veiculo.service';
import { Veiculo } from '../../models/veiculo.model';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  capitalizarPrimeiraLetra,
  formatarMoeda,
  limitarTexto,
} from '../../utils/functions.utils';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatTooltip } from '@angular/material/tooltip';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DetalharVeiculoComponent} from '../detalhar-veiculo/detalhar-veiculo.component';

@Component({
  selector: 'app-lista-veiculos',
  standalone: true,
  imports: [
    MatLabel,
    MatTableModule,
    RouterModule,
    MatButton,
    MatIconButton,
    MatIcon,
    NavbarComponent,
    MatTooltip,
    MatFormField,
    MatSelect,
    MatOption,
    MatInput,
    FormsModule,
  ],
  templateUrl: './lista-veiculos.component.html',
  styleUrls: ['./lista-veiculos.component.scss'],
})
export class ListaVeiculosComponent implements OnInit {
  displayedColumns: string[] = [
    'modelo',
    'fabricante',
    'ano',
    'preco',
    'cor',
    'quantidadePortas',
    'tipoCombustivel',
    'cilindrada',
    'acoes',
  ];
  dataSource: Veiculo[] = [];
  snackBar = inject(MatSnackBar);
  dialog = inject(MatDialog);
  filtroTipo: string = '';
  filtroCor: string = '';
  filtroModelo: string = '';
  filtroFabricante: string = '';
  filtroAno: number | null = null;

  openDialog(id: number) {
    this.dialog.open(DetalharVeiculoComponent, {
      width: '60vw',
      maxWidth: '60vw',
      data: { id },
    });
  }

  constructor(private veiculoService: VeiculoService) {}

  ngOnInit(): void {
    this.carregarVeiculos();
  }

  carregarVeiculos(): void {
    const filtros: any = {
      tipoVeiculo: this.filtroTipo,
      cor: this.filtroCor,
      modelo: this.filtroModelo,
      fabricante: this.filtroFabricante,
    };

    if (this.filtroAno !== null) {
      filtros.ano = this.filtroAno;
    }

    this.veiculoService.listarVeiculos(filtros).subscribe((veiculos) => {
      console.log(veiculos);
      this.dataSource = veiculos;
    });
  }

  aplicarFiltros(): void {
    this.carregarVeiculos();
  }

  excluirVeiculo(id: number): void {
    this.veiculoService.excluirVeiculo(id).subscribe({
      next: () => {
        this.carregarVeiculos();
        this.mostrarMensagem('Veículo excluído com sucesso!', 'sucesso');
      },
      error: () => {
        this.mostrarMensagem(
          'Erro ao excluir o veículo. Tente novamente.',
          'erro'
        );
      },
    });
  }

  mostrarMensagem(mensagem: string, tipo: 'sucesso' | 'erro'): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      panelClass: tipo === 'sucesso' ? ['sucesso-snackbar'] : ['erro-snackbar'],
    });
  }

  protected readonly formatarMoeda = formatarMoeda;
  protected readonly capitalizarPrimeiraLetra = capitalizarPrimeiraLetra;
  protected readonly limitarTexto = limitarTexto;
}
