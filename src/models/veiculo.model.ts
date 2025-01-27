export interface Veiculo {
  id?: number;
  modelo: string;
  fabricante: string;
  ano: number;
  preco: number;
  quantidadePortas?: number;
  tipoCombustivel?: string;
  cilindrada?: number;
  cor?: string;
  tipoVeiculo: string;
}
