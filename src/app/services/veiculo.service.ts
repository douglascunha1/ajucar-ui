import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veiculo } from '../models/veiculo.model';

@Injectable({
  providedIn: 'root',
})
export class VeiculoService {
  private apiUrl = '/api';
  constructor(private http: HttpClient) {}

  listarVeiculos(filtros?: any): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(`${this.apiUrl}/veiculos`, { params: filtros });
  }

  adicionarVeiculo(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.post<Veiculo>(`${this.apiUrl}/veiculos`, veiculo);
  }

  buscarVeiculoPorId(id: number): Observable<Veiculo> {
    return this.http.get<Veiculo>(`${this.apiUrl}/veiculos/${id}`);
  }

  atualizarVeiculo(
    id: number | undefined,
    veiculo: Veiculo
  ): Observable<Veiculo> {
    return this.http.put<Veiculo>(`${this.apiUrl}/veiculos/${id}`, veiculo);
  }

  excluirVeiculo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/veiculos/${id}`);
  }
}
