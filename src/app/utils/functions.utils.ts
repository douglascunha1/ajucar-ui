export function formatarMoeda(valor: number): string {
  if (isNaN(valor)) {
    throw new Error('O valor fornecido não é um número válido.');
  }

  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function capitalizarPrimeiraLetra(texto: string): string {
  if (!texto) return texto;

  return texto
    .split(' ')
    .map((palavra) => {
      if (palavra.length > 0) {
        return palavra[0].toUpperCase() + palavra.slice(1).toLowerCase();
      }
      return palavra;
    })
    .join(' ');
}

export function limitarTexto(texto: string, limite: number): string {
  if (!texto) return texto;
  if (texto.length <= limite) return texto;

  return texto.slice(0, limite) + '...';
}
