import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VeiculoService } from '../../services/veiculo.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NavbarComponent } from '../navbar/navbar.component';
import { capitalizarPrimeiraLetra } from '../../utils/functions.utils';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-editar-veiculo',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    NavbarComponent,
    MatSnackBarModule,
    NgIf,
  ],
  templateUrl: './editar-veiculo.component.html',
  styleUrls: ['./editar-veiculo.component.scss'],
})
export class EditarVeiculoComponent implements OnInit {
  veiculoForm: FormGroup;
  veiculoId?: number;

  constructor(
    private fb: FormBuilder,
    private veiculoService: VeiculoService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.veiculoForm = this.fb.group({
      modelo: ['', Validators.required],
      fabricante: ['', Validators.required],
      ano: ['', [Validators.required, Validators.min(1900), Validators.max(2100)]],
      preco: ['', [Validators.required, Validators.min(0)]],
      quantidadePortas: [''],
      tipoCombustivel: [''],
      cilindrada: [''],
      cor: [''],
      tipoVeiculo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.veiculoId = +this.route.snapshot.paramMap.get('id')!;
    this.veiculoService.buscarVeiculoPorId(this.veiculoId).subscribe((veiculo) => {
      this.veiculoForm.patchValue(veiculo);

      this.ajustarValidacoes(veiculo.tipoVeiculo);

      this.veiculoForm.get('tipoVeiculo')?.valueChanges.subscribe((tipoVeiculo) => {
        this.ajustarValidacoes(tipoVeiculo);
      });
    });
  }

  ajustarValidacoes(tipoVeiculo: string): void {
    if (tipoVeiculo === 'MOTO') {
      this.veiculoForm.get('quantidadePortas')?.clearValidators();
      this.veiculoForm.get('tipoCombustivel')?.clearValidators();
    } else {
      this.veiculoForm.get('quantidadePortas')?.setValidators(Validators.required);
      this.veiculoForm.get('tipoCombustivel')?.setValidators(Validators.required);
    }

    this.veiculoForm.get('quantidadePortas')?.updateValueAndValidity();
    this.veiculoForm.get('tipoCombustivel')?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.veiculoForm.valid) {
      this.veiculoService
        .atualizarVeiculo(this.veiculoId!, this.veiculoForm.value)
        .subscribe({
          next: () => {
            this.mostrarSucesso('Veículo atualizado com sucesso!');
            this.router.navigate(['/veiculos']);
          },
          error: () => {
            this.mostrarErro('Erro ao atualizar o veículo. Tente novamente.');
          },
        });
    }
  }

  mostrarSucesso(mensagem: string): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      panelClass: ['sucesso-snackbar'],
    });
  }

  mostrarErro(mensagem: string): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      panelClass: ['erro-snackbar'],
    });
  }

  protected readonly capitalizarPrimeiraLetra = capitalizarPrimeiraLetra;
}
