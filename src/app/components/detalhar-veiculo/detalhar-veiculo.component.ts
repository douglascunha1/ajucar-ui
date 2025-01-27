import { Component, Inject, OnInit } from '@angular/core';
import { VeiculoService } from '../../services/veiculo.service';
import { Veiculo } from '../../models/veiculo.model';
import {
  MatCell,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow, MatRow,
  MatTable,
  MatTableDataSource, MatTableModule
} from '@angular/material/table';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { capitalizarPrimeiraLetra, formatarMoeda, limitarTexto } from '../../utils/functions.utils';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-detalhar-veiculo',
  templateUrl: './detalhar-veiculo.component.html',
  imports: [
    MatTableModule,
    MatDialogContent,
    MatDialogTitle,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatRow,
    MatTooltip
  ],
  styleUrls: ['./detalhar-veiculo.component.scss']
})
export class DetalharVeiculoComponent implements OnInit {
  veiculo?: Veiculo;
  dataSource: MatTableDataSource<Veiculo>;
  displayedColumns: string[] = ['modelo', 'fabricante', 'ano', 'preco', 'cor'];

  constructor(
    private veiculoService: VeiculoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dataSource = new MatTableDataSource<Veiculo>();
  }

  ngOnInit(): void {
    const id = this.data.id;
    this.veiculoService.buscarVeiculoPorId(id).subscribe(veiculo => {
      this.veiculo = veiculo;
      this.dataSource.data = [veiculo];

      if (veiculo.tipoVeiculo === 'CARRO') {
        this.displayedColumns = ['modelo', 'fabricante', 'ano', 'preco', 'cor', 'quantidadePortas', 'tipoCombustivel'];
      } else if (veiculo.tipoVeiculo === 'MOTO') {
        this.displayedColumns = ['modelo', 'fabricante', 'ano', 'preco', 'cor', 'cilindrada'];
      }
    });
  }

  protected readonly formatarMoeda = formatarMoeda;
  protected readonly capitalizarPrimeiraLetra = capitalizarPrimeiraLetra;
  protected readonly limitarTexto = limitarTexto;
}
