import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { VeiculoService } from '../../services/veiculo.service';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatOption, MatSelect } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adicionar-veiculo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    NavbarComponent,
    MatSnackBarModule,
    MatSelect,
    MatOption,
  ],
  templateUrl: './adicionar-veiculo.component.html',
  styleUrls: ['./adicionar-veiculo.component.scss'],
})
export class AdicionarVeiculoComponent {
  veiculoForm: FormGroup;

  tiposVeiculo = [
    { id: 0, label: 'Carro' },
    { id: 1, label: 'Moto' }
  ];

  constructor(
    private fb: FormBuilder,
    private veiculoService: VeiculoService,
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
      tipoVeiculo: [0, Validators.required]
    });

    this.veiculoForm.get('tipoVeiculo')?.valueChanges.subscribe((value) => {
      this.atualizarCamposCondicionais(value);
    });
  }

  atualizarCamposCondicionais(tipoVeiculo: number): void {
    if (tipoVeiculo === 0) {
      this.veiculoForm.get('quantidadePortas')?.setValidators([Validators.required]);
      this.veiculoForm.get('tipoCombustivel')?.setValidators([Validators.required]);
      this.veiculoForm.get('cilindrada')?.clearValidators();
    } else if (tipoVeiculo === 1) {
      this.veiculoForm.get('cilindrada')?.setValidators([Validators.required]);
      this.veiculoForm.get('quantidadePortas')?.clearValidators();
      this.veiculoForm.get('tipoCombustivel')?.clearValidators();
    }

    this.veiculoForm.get('quantidadePortas')?.updateValueAndValidity();
    this.veiculoForm.get('tipoCombustivel')?.updateValueAndValidity();
    this.veiculoForm.get('cilindrada')?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.veiculoForm.valid) {
      const dadosVeiculo = {
        ...this.veiculoForm.value,
        tipoVeiculoId: this.veiculoForm.value.tipoVeiculo
      };

      this.veiculoService.adicionarVeiculo(dadosVeiculo).subscribe({
        next: () => {
          this.mostrarSucesso('Veículo adicionado com sucesso!');
          this.router.navigate(['/veiculos']);
        },
        error: () => {
          this.mostrarErro('Erro ao adicionar o veículo. Tente novamente.');
        },
      });
    } else {
      this.mostrarErro('Todos os campos obrigatórios devem ser preenchidos.');
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
}
