import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veiculo } from '../models/veiculo.model';

@Injectable({
  providedIn: 'root',
})
export class VeiculoService {
  private apiUrl = '/api'; // Usa o proxy
  constructor(private http: HttpClient) {}

  listarVeiculos(filtros?: any): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(`${this.apiUrl}/veiculos`, { params: filtros });
  }
}
